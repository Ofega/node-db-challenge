const express = require('express');
const db = require('./model');

const router = express.Router();

router.get('/', (req, res) => {
    db.getAllResources()
        .then(resources => {
            res.json(resources);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get resources' });
        })
})

router.post('/', (req, res) => {
    db.createResource({ 
        name: req.body.name, 
        description: req.body.description, 
    })
    .then(id => {
        res.json(`A new resource with an id of ${id} was created`);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create resource' });
    })
})

module.exports = router;

  
