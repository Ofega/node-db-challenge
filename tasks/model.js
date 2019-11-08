const db = require('../data/db-config.js');


const createTask = (task) => {
    return db('tasks').insert(task);
}

const getAllTasks = () => {
    return Promise.all([db('tasks'), db('projects')])
    .then(res => {
        const newTasks = res[0].map(task => {
            const taskProjects = res[1].filter(item => item.id === task.project_id)

            return {
                id: task.id,
                description: task.description,
                notes: task.notes,
                completed: task.completed ? true : false,
                projectName: taskProjects[0].name,
                projectDescription: taskProjects[0].description,
            }
        })

        return newTasks
    })
}

module.exports = {
    createTask,
    getAllTasks
}