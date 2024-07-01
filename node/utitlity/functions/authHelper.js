const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApiError = require('../middleware/apiError');

class AuthHelper {
    async getSecretKey() {
        return process.env.ACCESS_TOKEN_SECRET;
    }

    async generateSalt() {
        const salt = await bcrypt.genSalt();
        return salt;
    }

    async generateHashing(password, salt) {
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    async verifyToken(token) {
        const secret = await this.getSecretKey();
        if (!secret) {
            throw new Error('ACCESS_TOKEN_SECRET environment variable is not defined.');
        }

        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, { algorithms: ['HS256'] }, (err, user) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        reject(ApiError.unauthorized("Token has expired"));
                    } else {
                        reject(ApiError.unauthorized('Invalid token'));
                    }
                } else {
                    resolve(user);
                }
            });
        });
    }

    async verifyPassword(newPassword, existingPassword) {
        const isMatch = await bcrypt.compare(newPassword, existingPassword);
        return isMatch;
    }

    async generateToken(user) {
        const secret = await this.getSecretKey();
        if (!secret) {
            throw new Error('ACCESS_TOKEN_SECRET environment variable is not defined.');
        }
        const token = jwt.sign({ id: user._id }, secret, {
            algorithm: 'HS256',
            expiresIn: '2d',
        });
        return token;
    }
}

module.exports = new AuthHelper();
