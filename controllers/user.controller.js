const createError = require('http-errors');
const User = require("../models/user.model");
const { successResponse, errorResponse } = require('./response.controller');
const mongoose = require('mongoose');
const { findItemById } = require('../services/findItem');
const fs = require('fs');
const deleteImage = require('../helpers/deleteImage');
const { createJSONWebToken } = require('../helpers/jsonwebtoken');
const { jwtActivationKey } = require('../config/secret');

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
            if (!users) { throw createError(404, "Users Not Found") };
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
    getById: async (req, res, next) => {
        try {
            const id = req.params.id;
            const options = { password: 0 };
            const user = await findItemById(User, id, options);
            successResponse(res, {
                statusCode: 200,
                message: `User with id: ${id} was returned successfully`,
                payload: {
                    user
                }
            })

        } catch (error) {
            next(error);
        }
    },
    updateById: (req, res, next) => {
        res.send('Update user');

    },
    deleteById: async (req, res, next) => {
        const id = req.params.id;
        const options = { password: 0 };
        const user = await findItemById(User, id, options);
        // Delete image from folder
        const imagePath = user.image;
        deleteImage(imagePath);
        // Delete user
        await User.deleteOne({ _id: id, isAdmin: false });
        return successResponse(res, {
            statusCode: 200,
            message: `User with id: ${id} was deleted`
        })
    },
    registerUser: async (req, res, next) => {
        try {
            const { name, email, password, phone, address } = req.body;
            const userExist = await User.exists({ email });
            if (userExist) {
                throw createError(409, "User already exists Please Sign in");
            }
            const token = createJSONWebToken({ name, email, password, phone, address }, jwtActivationKey, '10m');

            successResponse(res, {
                statusCode: 201,
                message: "User was created successfully",
                payload: {
                    token
                }
            })
        } catch (error) {
            next(error);
        }
    }
}
module.exports = UserController;