import React, { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTask } from '../../store/task/taskSlice'
const CreateTask = lazy(() => import('./createTask'))
const ShowTask = lazy(() => import('./showTask'))
import "./style.css"


const Home = () => {
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.taskSlice)
    const taskData = selector.data

    useEffect(() => {
        dispatch(getTask())
    }, [])
    return (

        <div className="container d-flex justify-content-center align-items-center py-5">
            <div className="row py-5">{
                taskData.length ?
                    <>
                        <div className="col-sm-6 col-lg-6 col-md-6"><CreateTask /></div>
                        <div className="col-sm-6 col-lg-6 col-md-6"> <ShowTask /></div>
                    </> :
                    <div className="col-md-12 py-4"><CreateTask /></div>

            }

            </div>
        </div>



    )
}

export default Home
