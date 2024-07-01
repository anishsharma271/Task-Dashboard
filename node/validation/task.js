const ApiError = require("../utitlity/middleware/apiError")
class TaskValidation {

    create(req) {
        if (!req.body.title) throw ApiError.badRequest("title is required");
        if (!req.body.description) throw ApiError.badRequest("description is required");
        if (!req.file.fieldname) throw ApiError.badRequest("file is required");

        return true;
    }




}

module.exports = new TaskValidation()