const db = require('../data/db-config.js');


const createTask = (task) => {
    return db('tasks').insert(task);
}

const getAllTasks = () => {
    return db('tasks')
    .then(tasks => {
        const newTasks = tasks.map(task => {
            return {
                id: task.id,
                description: task.description,
                notes: task.notes,
                completed: task.completed ? true : false,
            }
        })

        return newTasks
    })
}

module.exports = {
    createTask,
    getAllTasks
}