const DemoModel = require("../models/demo.model");

const DemoController = {
    getAll: (req, res) => {
        DemoModel.find({}).then(docs => {
            res.status(200).send(docs)
        })
    },
    add: (req, res) => {
        const data = req.body;
        DemoModel.create(data).then(docs => {
            res.status(200).send(docs)
        })
    }
}
module.exports = DemoController;