import React from 'react'
import Table from "react-bootstrap/Table";
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EditIcon from '@mui/icons-material/Edit';
import { deleteTask, getParticular } from '../../store/task/taskSlice';

const ShowTask = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.taskSlice)
    const taskData = selector.data
    const handleDelete = (id) => {
        dispatch(deleteTask(id))

    }
    const handleEdit = (id) => {
        dispatch(getParticular(id))

    }
    return (
        <div className="py-5 bg-light-red">
            <div className="container">
                <h2 className="text-uppercase text-center mb-4">Task</h2>
                <div className="shadow-lg bg-white rounded-4 p-4 text-center">
                    <div className="table-responsive">
                        <Table striped bordered hover className="text-start">
                            <thead>
                                <tr className="align-middle">
                                    <th>Sr No.</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {taskData.map((item, index) => {
                                    return (
                                        <tr key={index} className="align-middle">
                                            <td>{index + 1}</td>
                                            <td >{item.title}</td>
                                            <td >{item.description}</td>
                                            <td><img src={`data:image/png;base64,` + item.images} width="100%" height='100%' /></td>
                                            <td className='d-flex justify-content-center align-items-center'>
                                                <button className="btn btn-success mx-1" onClick={() => handleEdit(item._id)}><EditIcon /></button>
                                                <button className="btn btn-danger mx-1" onClick={() => handleDelete(item._id)}><DeleteIcon /></button>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowTask
