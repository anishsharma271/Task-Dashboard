import React, { lazy } from 'react'
const Header = lazy(() => import("../components/header/header"))
const AllRoutes = lazy(() => import("../routes/allRoutes"))

const Layout = () => {
    return (
        <>
            <Header />
            <AllRoutes />
        </>
    )
}

export default Layout
