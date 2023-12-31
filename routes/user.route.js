const express = require('express');
const UserController = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getById);
userRouter.post('/register', UserController.registerUser);
userRouter.put('/:id', UserController.updateById);
userRouter.delete('/:id', UserController.deleteById);

module.exports = userRouter;