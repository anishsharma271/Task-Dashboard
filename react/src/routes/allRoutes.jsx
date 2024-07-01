import React, { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
const Login = lazy(() => import("../components/auth/login"))
const Signup = lazy(() => import("../components/auth/signUp"))
const RouteGuard = lazy(() => import('../utility/routeGuard/routeGuard'))
const Home = lazy(() => import("../components/dashboard/home"))
const AllRoutes = () => {
    const token = localStorage.getItem("token")
    return (


        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signUp' element={<Signup />} />
            <Route path='/home' element={<RouteGuard Components={Home} />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}

export default AllRoutes
