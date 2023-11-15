const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const { port } = require("./config/secret");
const connectDB = require('./config/db');
const router = require('./routes/api.route');
const { errorResponse } = require('./controllers/response.controller');
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', router);




// client error handling
app.use((req, res, next) => {
    next(createError(404, 'Not Found'));
})

// server error handling
app.use((err, req, res, next) => {
    errorResponse(res, {
        statusCode: err.status,
        message: err.message
    })
    // return res.status(err.status || 500).send({
    //     success: false,
    //     message: err.message
    // })
});

// Connect to MongoDB and start server
app.listen(port, async () => {
    console.log(`Server is running on: http://localhost:${port}`);
    await connectDB();
})


