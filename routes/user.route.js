const express = require('express');
const UserController = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getById);
userRouter.post('/add', UserController.add);

module.exports = userRouter;