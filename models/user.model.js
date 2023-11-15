const { mongoose, Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../config/secret');
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        min: [3, 'Name can not be less than 3 characters'],
        max: [100, 'Name can not be more than 100 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
                // return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: [6, 'Password can not be less than 6 characters'],
        set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10))
    },
    image: {
        type: String,
        default: defaultImagePath
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
});
const User = model('User', UserSchema);
module.exports = User;