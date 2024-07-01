const ApiError = require("../utitlity/middleware/apiError")
class AuthValidation {

    registration(data) {
        if (!data.name) throw ApiError.badRequest("name is required");
        if (!data.age) throw ApiError.badRequest("age is required");
        if (data.age < 18) throw ApiError.badRequest("age must be 18 or above");
        if (!data.email) throw ApiError.badRequest("email is required");
        if (!data.password) throw ApiError.badRequest("password is required");
        return true;
    }

    login(data) {
        if (!data.email) throw ApiError.badRequest("email is required");
        if (!data.password) throw ApiError.badRequest("password is required");
        return true;
    }


}

module.exports = new AuthValidation()