const express = require('express');
const demoRouter = require('./demo.route');
const testRouter = require('./test.route');
const seedRouter = require('./seed.route');
const userRouter = require('./user.route');
const router = express.Router();

router.use('/demo', demoRouter);
router.use('/test', testRouter);
router.use('/seed', seedRouter);
router.use('/users', userRouter);

module.exports = router;
