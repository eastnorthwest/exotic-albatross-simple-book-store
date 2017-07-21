const express = require('express');
const routes = express.Router();

routes.get('/list', (req, res) => {
    res.send("List the books!");    
});

module.exports = routes;