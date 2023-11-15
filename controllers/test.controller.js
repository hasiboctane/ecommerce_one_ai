const TestModel = require("../models/test.model");

const TestController = {
    getAll: (req, res) => {
        TestModel.find({}).then(docs => {
            res.status(200).send(docs)
        })
    },
    add: (req, res) => {
        const data = req.body;
        TestModel.create(data).then(docs => {
            res.status(200).send(docs)
        })
    }
}
module.exports = TestController;