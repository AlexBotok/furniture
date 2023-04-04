const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./Users');
require('dotenv').config();
const JWT_SECRET = process.env.jwt;


const verifyUserLogin = async (email, password) => {
    try {
        const user = await User.findOne({
            email
        }).lean()
        if (!user) {
            return {
                status: 'error',
                error: 'user not found'
            }
        }
        if (await bcrypt.compare(password, user.password)) {
            token = jwt.sign({
                id: user._id,
                username: user.email,
                type: 'user'
            }, JWT_SECRET, {
                expiresIn: '2h'
            })
            return {
                status: 'ok',
                data: token
            }
        }
        return {
            status: 'error',
            error: 'invalid password'
        }
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            error: 'timed out'
        }
    }
}

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        if (verify.type === 'user') {
            return true;
        } else {
            return false
        };
    } catch (error) {
        console.log(JSON.stringify(error), "error");
        return false;
    }
}

module.exports = {
    verifyToken,
    verifyUserLogin
};