const db = require('../data/db-config.js');


const createResource = (resource) => {
    return db('resources').insert(resource);
}

const getAllResources = () => {
    return db('resources')
}

module.exports = {
    createResource,
    getAllResources
}