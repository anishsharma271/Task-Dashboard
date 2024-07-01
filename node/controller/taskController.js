const TaskServices = require("../services/taskService")
const ApiError = require("../utitlity/middleware/apiError");
const Response = require("../utitlity/middleware/response");

const createTask = async (req, res) => {
    try {
        const result = await TaskServices.create(req);
        return Response.success(res, `Task Created successfully`);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}
const getTask = async (req, res) => {
    try {
        const result = await TaskServices.get();
        return Response.success(res, `Task reterieved successfully`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}
const deleteTask = async (req, res) => {
    try {
        const result = await TaskServices.delete(req);
        return Response.success(res, `Task deleted successfully`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}
const updateTask = async (req, res) => {
    try {
        const result = await TaskServices.update(req);
        return Response.success(res, `Task updated successfully`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}
const getParticularTask = async (req, res) => {
    try {
        const result = await TaskServices.getOne(req);
        return Response.success(res, `task get successfully`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        return Response.error(res, ApiError.internal(err));
    }
}




module.exports = { createTask, getTask, deleteTask, updateTask, getParticularTask }