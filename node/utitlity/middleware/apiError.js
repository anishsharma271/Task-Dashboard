class ApiError extends Error {
    constructor(code, status, message) {
        super(message);
        this.code = code;
        this.status = status;
    }

    static badRequest(message) {
        return new ApiError('BAD_REQUEST', 400, message || 'Bad request');
    }

    static unauthorized(message) {
        return new ApiError('UNAUTHORIZED', 401, message || 'Unauthorized');
    }

    static alreadyExists(message) {
        return new ApiError('ALREADY_EXISTS', 409, message || 'Already exists');
    }

    static notFound(message) {
        return new ApiError('NOT_FOUND', 404, message || 'Not found');
    }

    static internal(message) {
        return new ApiError('INTERNAL_SERVER_ERROR', 500, message || 'Internal server error');
    }
}

module.exports = ApiError;
