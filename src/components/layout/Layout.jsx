import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify"

const Layout = () => {
    return (
        <>
            <Header />
            <main className='main'>
                <Outlet />
            </main>
            <Footer />
            <ToastContainer />
        </>
    )
}

export default Layout