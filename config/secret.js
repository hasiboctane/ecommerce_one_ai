const dotenv = require('dotenv');
dotenv.config();

const secret = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URL,
    defaultImagePath: process.env.DEFAULT_IMAGE_PATH || 'public/images/users/default.png',
    jwtActivationKey: process.env.JWT_ACTIVATION_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJc3N1ZXIgKGlzcykiOiJVc2VyIiwiUm9sZSI6IkFETUlOIn0.2gWHmDG1LIIuMfeXgc_1jTvofizwJO_e37ulhryI_dE"
}
module.exports = secret;