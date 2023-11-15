const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DemoSchema = new Schema({
    name: String,
    age: Number

});

const DemoModel = mongoose.model('Demo', DemoSchema);
module.exports = DemoModel;