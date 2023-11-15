const data = require("../lib/data");
const User = require("../models/user.model");

const SeedController = async (req, res, next) => {
    try {
        await User.deleteMany({});
        await User.insertMany(data.users);
        res.status(200).send({ message: 'Users seeded successfully' });
    } catch (error) {
        next(error);
    }
}
module.exports = SeedController;