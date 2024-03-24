import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function Layout({ children }) {
    return (
        <div style={{minHeight:'100vh',position:'relative',display:'flex',flexDirection:'column',flex:1,justifyContent:'space-between'}}>
            <Navigation />
            <div style={{flex:1}}>{children}</div>
            <Footer />
        </div>
    )
}
