require('dotenv').config();

const { MONGODB_URI } = process.env;
const { CORS_URL } = process.env;

module.exports = {
    MONGODB_URI,
    CORS_URL
}