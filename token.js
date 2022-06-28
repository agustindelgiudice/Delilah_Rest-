//Libreria para levantar tokens
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const firma = process.env.JWT_KEY;
console.log(jwt)

module.exports = {
    jwt,
    firma
}
