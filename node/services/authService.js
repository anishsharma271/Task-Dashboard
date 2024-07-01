const ApiError = require("../utitlity/middleware/apiError");
const AuthValidation = require("../validation/auth")
const userModal = require("../modal/userModal")
const AuthHelper = require("../utitlity/functions/authHelper");


class AuthServices {

    async registration(data) {
        const isValid = AuthValidation.registration(data)
        if (!isValid) throw ApiError.badRequest("validation error")
        const alreadyExist = await userModal.findOne({ email: data.email })
        if (alreadyExist) throw ApiError.alreadyExists('User found , Email already exists!')
        const salt = await AuthHelper.generateSalt();
        const hashedPassword = await AuthHelper.generateHashing(
            data.password,
            salt,
        );
        let user = new userModal({
            name: data.name,
            age: data.age,
            email: data.email,
            password: hashedPassword,
        });

        const savedUser = await user.save();
        return savedUser;


    }

    async login(data) {
        const isValid = AuthValidation.login(data)
        if (!isValid) throw ApiError.badRequest("validation error")
        const userData = await userModal.findOne({ email: data.email })
        if (!userData) throw ApiError.notFound('user not found , kindly signUp')
        const varification = await AuthHelper.verifyPassword(
            data.password,
            userData.password,
        );
        if (!varification) throw ApiError.badRequest('Invalid password!');
        const token = await AuthHelper.generateToken(userData);
        return { token };

    }
}

module.exports = new AuthServices();