import React from 'react'
import Header from './Header'
import Footer from './Footer'

import { Helmet } from "react-helmet";
import Navbar from './Navbar';



const Layout = ({ children , title , description , keywords , auther }) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={auther} />

                <title>{title}</title>
            </Helmet>
            <Navbar/>
            {/* <Header /> */}
            <main style={{ minHeight: "92vh" }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
