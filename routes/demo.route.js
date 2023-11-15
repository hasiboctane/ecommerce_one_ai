const express = require('express');
const DemoController = require('../controllers/demo.controller');
const demoRouter = express.Router();

demoRouter.get('/', DemoController.getAll)
demoRouter.post('/add', DemoController.add)

module.exports = demoRouter

