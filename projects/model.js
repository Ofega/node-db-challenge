const db = require('../data/db-config.js');


const createProject = (project) => {
    return db('projects').insert(project);
}

const getAllProjects = () => {
    return db('projects')
    .then(projects => {
        projects.map(project => {
            project.completed = project.completed ? true : false;
        })

        return projects
    })
}

const getAProject = (id) => {
    return db('projects').where({ id: id })
        .then(projects => {
            return db('tasks').where({ project_id: id})
                .then((tasks) => {
                    return db('resources')
                        .then((resources) => {
                            return {
                                id: projects[0].id,
                                name: projects[0].name,
                                description: projects[0].description,
                                completed: projects[0].completed ? true : false,
                                tasks: tasks, 
                                resources: resources
                            }
                        })
                })
        })
}

module.exports = {
    createProject,
    getAllProjects,
    getAProject
}