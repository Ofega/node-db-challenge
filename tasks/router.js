const express = require('express');
const db = require('./model');
const projectsModel = require('../projects/model');

const router = express.Router();

router.get('/', (req, res) => {
    db.getAllTasks()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(() => {
            res.status(500).json({ message: 'Failed to get tasks' });
        })
})

router.post('/', validateProjectId, (req, res) => {
    db.createTask({ 
        description: req.body.description, 
        notes: req.body.notes, 
        completed: req.body.completed || 0 ,
        project_id: req.body.projectId
    })
    .then(id => {
        res.json(`A new task with an id of ${id} was created`);
    })
    .catch(() => {
        res.status(500).json({ message: 'Failed to create task' });
    })
})

function validateProjectId(req, res, next) {
    if(!req.body.projectId) {
        res.json(`Please add the projectId for this task`);
    } else {
        projectsModel.getAProject(req.body.projectId)
            .then(projects => {
                if(projects.length !== 0) {
                    next();
                } else {
                    res.json(`There is no project with this ID`);
                }
            })
    }
}

module.exports = router;

  
