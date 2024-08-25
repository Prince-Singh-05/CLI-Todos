const fs = require("fs");
const { Command } = require("commander");

const program = new Command();
const file = './todo.json';

program
    .name('Todo-cli')
    .description('CLI to add, remove and mark a todo task')
    .version('1.0.0');

program.command('add')
    .description('Adds a new task to the todo.json file')
    .argument('<string>', 'task to add')
    .action(function addTask(task) {

        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(`error while reading file: ${err}`);
            }

            let myTodo = JSON.parse(data);
            let tasks = [...myTodo];

            let newTodo = {
                id: myTodo.length + 1,
                task: task,
                state: 'pending'
            }

            tasks.push(newTodo);
            let newData = JSON.stringify(tasks, null, 4);

            fs.writeFile(file, newData, (err) => {
                if (err) {
                    console.log(`error while writing file: ${err}`);
                } else {
                    console.log('Task Added');
                }
            })

        });
    })

program.command('delete')
    .description('Delete a Task from the todo.json file')
    .argument('<id>', 'id of the task to delete')
    .action((id) => {

        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(`error while reading file: ${err}`);
            }

            const myTodo = JSON.parse(data);
            let tasks = [...myTodo];

            tasks.splice(id - 1, 1);

            let updatedTasks = [...tasks];
            for (let i = 0; i < updatedTasks.length; i++) {
                updatedTasks[i].id = i + 1;
            }

            let newData = JSON.stringify(updatedTasks, null, 4);

            fs.writeFile(file, newData, (err) => {
                if (err) {
                    console.log(`error while writing file: ${err}`);
                }
                console.log(`Task deleted`)
            })
        })
    })

program.command('show-todos')
    .description('Shows the tasks added in todo.json file')
    .action(() => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) return console.log('error reading file :', err);

            let myTodo = JSON.parse(data);
            let tasks = [...myTodo];

            tasks.forEach((task) => {
                console.log(task);
            })

        })
    })

program.command('update-task')
    .description('Update a task with given id')
    .argument('<id>', 'id of the task to be updated')
    .argument('<newTask>', 'new task to update')
    .action((id, newTask) => {

        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(`error while reading file: ${err}`);
            }

            const myTodo = JSON.parse(data);
            let tasks = [...myTodo];

            let currValue = tasks[id-1];
            currValue.task = newTask;
            
            let updatedTasks = [...tasks];

            let newData = JSON.stringify(updatedTasks, null, 4);

            fs.writeFile(file, newData, (err) => {
                if (err) {
                    console.log(`error while writing file: ${err}`);
                }
                console.log(`Task updated`)
            })
        })
    })

program.command('update-state')
    .description('Update a task state with given id')
    .argument('<id>', 'id of the task to be updated')
    .argument('<taskState>', 'task state to update - [pending, complete]')
    .action((id, taskState) => {

        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(`error while reading file: ${err}`);
            }

            const myTodo = JSON.parse(data);
            let tasks = [...myTodo];

            let currValue = tasks[id-1];
            currValue.state = taskState;
            
            let updatedTasks = [...tasks];

            let newData = JSON.stringify(updatedTasks, null, 4);

            fs.writeFile(file, newData, (err) => {
                if (err) {
                    console.log(`error while writing file: ${err}`);
                }
                console.log(`Task updated`)
            })
        })
    })

program.command('clear-todos')
    .description('clear the todo list')
    .action(() => {

        let clearedList = JSON.stringify([], null, 4);
        fs.writeFile(file, clearedList, (err) => {
            if(err) {
                console.log(`error while writing file: ${err.message}`);
            }

            console.log("List cleared")
        })
    })

program.parse();

// console.log(process.argv)
