import React, { useEffect, useState } from 'react'
import { taskValidation } from '../../validation/authValidation';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Toastify } from "../../utility/toastify/toastContainer";
import { useNavigate } from "react-router-dom";
import { createTask, updateTask } from '../../store/task/taskSlice';


const defaultValues = {
    title: "",
    description: "",
    file: "",


};

const schema = taskValidation

const CreateTask = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fileData, setFiledata] = useState('')
    const selector = useSelector((state) => state.taskSlice)
    const getOne = selector.getOne
    useEffect(() => {
        if (getOne) {
            setValue("title", getOne.title)
            setValue("description", getOne.description)
            setFiledata(null)
        }
    }, [getOne])
    const {
        control,
        reset,
        setValue,
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log("hjb", data);
        if (fileData === '') setFiledata(null)
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('file', fileData)
        if (getOne) {
            console.log("jhhx", { data: formData, id: getOne._id })
            dispatch(updateTask({ data: formData, id: getOne._id }))
        } else {

            dispatch(createTask(formData))
        }
        reset();
    };
    const handleImage = (e) => {
        const file = e.target.files[0];
        setFiledata(file);

    };

    return (
        <div className="container  rounded  border border-dark">
            <h3 className='text-center'>Create Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row py-4">
                    <div className="form-row mb-3 col-md-12">

                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    placeholder="Enter title"
                                />
                            )}
                        />

                    </div>

                    <div className="form-row mb-3 col-md-12">

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    placeholder="Enter description"
                                />
                            )}
                        />

                    </div>

                    <div className="form-row mb-3 col-md-12">

                        <input
                            type="file"
                            {...register(`file.file`)}
                            className={`form-control mb-3 ${((errors.file || fileData === null)) ? "is-invalid" : ""
                                }`}
                            onChange={(e) => handleImage(e)}

                        />
                        {(errors.file || errors?.file?.file) && (
                            <div className="invalid-feedback">
                                {errors.file?.message || errors?.file?.file?.message}
                            </div>
                        )}
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-primary w-100">
                            {getOne ? "Update" : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateTask
