const express = require('express');
const db = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    db.getAllProjects()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects' });
        })
})

router.get('/:id', (req, res) => {
    db.getAProject(req.params.id)
        .then(project => {
            res.json(project);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get projects' });
        })
})

router.post('/', (req, res) => {
    db.createProject({ 
        name: req.body.name, 
        description: req.body.description, 
        completed: req.body.completed || 0 
    })
    .then(id => {
        res.json(`A new project with an id of ${id} was created`);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create project' });
    })
})

module.exports = router;

  
