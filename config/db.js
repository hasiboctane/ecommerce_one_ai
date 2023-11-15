const mongoose = require('mongoose');
const { databaseURL } = require('./secret');
async function connectDB() {
    try {
        await mongoose.connect(databaseURL);
        console.log('Database Connected successfully!!!');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;