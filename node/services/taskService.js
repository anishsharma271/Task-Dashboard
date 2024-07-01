const taskModal = require("../modal/taskModal")
const ApiError = require("../utitlity/middleware/apiError")
const TaskValidation = require("../validation/task")
const fs = require('fs');
class TaskService {

    async create(req) {

        const { title, description } = req.body
        const isValid = TaskValidation.create(req)
        if (!isValid) throw ApiError.badRequest("validation error")
        const task = new taskModal({
            title: title,
            description: description,
            file: req.file.filename
        })
        const saved = await task.save()
        return saved


    }
    async get() {
        const data = await taskModal.find()
        if (!data) throw ApiError.notFound("data not found")
        data.forEach((el) => {
            const img = fs.readFileSync(`uploads/${el.file}`, 'base64');
            el._doc['images'] = img;
            delete el._doc['file']
        })

        return data

    }
    async update(req) {
        const { title, description } = req.body;
        console.log("req", req.body);
        const isValid = TaskValidation.create(req);
        if (!isValid) {
            throw ApiError.badRequest("Validation error");
        }
        const task = {
            title: title,
            description: description,
        };
        if (req.file) {
            task.file = req.file.filename;
        }
        const updatedTask = await taskModal.findByIdAndUpdate(req.params.id, task, { new: true });
        if (!updatedTask) {
            throw ApiError.notFound("Task not found");
        }
        return updatedTask;
    }
    async delete(req) {
        const del = await taskModal.findByIdAndDelete(req.params.id)
        if (!del) throw ApiError.notFound("data not found")
        return del

    }
    async getOne(req) {

        const data = await taskModal.findById(req.params.id, { __v: 0 });
        if (!data) throw ApiError.notFound("data not found")
        const img = fs.readFileSync(`uploads/${data.file}`, 'base64');
        data._doc['images'] = img;
        delete data._doc['file']
        return data

    }

}

module.exports = new TaskService()