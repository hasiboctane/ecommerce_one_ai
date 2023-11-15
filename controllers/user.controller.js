const createError = require('http-errors');
const User = require("../models/user.model");
const { successResponse } = require('./response.controller');

const UserController = {
    getAll: async (req, res, next) => {
        try {
            const search = req.query.search || "";
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const searchRegEx = new RegExp('.*' + search + '.*', 'i');
            const filter = {
                isAdmin: { $ne: true },
                $or: [
                    { name: searchRegEx },
                    { email: searchRegEx },
                    { phone: searchRegEx }
                ]
            };
            const options = {
                password: 0
            }
            const users = await User.find(filter, options).limit(limit).skip((page - 1) * limit);
            const count = await User.find(filter).countDocuments();
            if (!users) throw createError(404, "Users Not Found");
            successResponse(res, {
                statusCode: 200,
                message: "Users were Returned Successfully",
                payload: {
                    users,
                    pagination: {
                        totalPage: Math.ceil(count / limit),
                        currentPage: page,
                        previousPage: page - 1 > 0 ? page - 1 : null,
                        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
                    }
                }
            })

        } catch (error) {
            next(error);
        }
    },
    add: (req, res, next) => {
        res.send('Add user')
    }
}
module.exports = UserController;