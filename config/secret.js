const dotenv = require('dotenv');
dotenv.config();

const secret = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    defaultImagePath: process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.png',
}
module.exports = secret;