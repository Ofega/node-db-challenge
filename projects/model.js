const db = require('../data/db-config.js');


const createProject = (project) => {
    return db('projects').insert(project);
}

const getAllProjects = () => {
    return db('projects')
    .then(projects => {
        projects.map(project => {
            project.completed = project.completed === 1 ? true : false;
        })

        return projects
    })
}

module.exports = {
    createProject,
    getAllProjects
}