import './Logo.css'
import logo from '../../assets/image/logo.png'
import React from 'react'



export default props =>
<aside className="logo">
    <a href="/" className='logo'>
        <img src={logo} alt="Logo da empresa" />
    </a>
</aside>