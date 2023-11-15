const express = require('express');
const SeedController = require('../controllers/seed.controller');
const seedRouter = express.Router();
seedRouter.use('/users', SeedController);





module.exports = seedRouter;