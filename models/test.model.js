const { mongoose, Schema, model } = require('mongoose');
const TestSchema = new Schema({
    name: String,
    age: Number,
    weight: Number
});
const TestModel = model('Test', TestSchema);
module.exports = TestModel;