const { express, Router } = require('express');
const TestController = require('../controllers/test.controller');
const testRouter = Router();
testRouter.get('/', TestController.getAll)
testRouter.post('/add', TestController.add)

module.exports = testRouter;