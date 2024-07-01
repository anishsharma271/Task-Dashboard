const ApiError = require('./apiError');

class Response {
    static success(res, message, data) {
        return res.status(200).json({ success: true, message, data });
    }

    static error(res, error) {

        if (error instanceof ApiError) {
            return res.status(error.status).json({ success: false, message: error.message });
        } else {
            console.error('Unhandled error:', error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}

module.exports = Response;

