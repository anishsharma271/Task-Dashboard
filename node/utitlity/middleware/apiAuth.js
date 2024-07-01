const AuthHelper = require("../functions/authHelper");
const ApiError = require("./apiError");
const Response = require("./response");

const apiAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token?.split(' ')[1];
    if (!token || token === "") return Response.error(res, ApiError.badRequest("token is required"));
    try {
        const verifyToken = await AuthHelper.verifyToken(tokenWithoutBearer);
        if (!verifyToken)
            return Response.error(res, ApiError.notAuthorized("Admin not authorized"));
        req['userId'] = verifyToken.id;
        return next();
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

module.exports = apiAuth;