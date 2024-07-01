const AuthServices = require("../services/authService")
const ApiError = require("../utitlity/middleware/apiError");
const Response = require("../utitlity/middleware/response");

const signUp = async (req, res) => {
    try {
        const result = await AuthServices.registration(req.body);
        return Response.success(res, `User Register successfully`);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}

const signIn = async (req, res) => {
    try {
        const result = await AuthServices.login(req.body);
        return Response.success(res, `User login successfully`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}


module.exports = { signUp, signIn }