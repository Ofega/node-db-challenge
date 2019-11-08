const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const projectsRouter = require('../projects/router');

const server = express();


const middleware = [helmet(), cors(), express.json()]
server.use(middleware);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.json("Welcome to the server");
})

module.exports = server;