import './Nav.css'
import React from 'react'

export default props => 
<aside className="menu-area">
    <nav className="menu">
        <a href="#/">
            <i className="fa fa-home">  Home</i>
        </a>  
        <a href="#/users">
            <i className="fa fa-users">  Usuários</i>
        </a>
        <a href="#/courses">
            <i className="fa fa-list-alt">  Cursos</i>
        </a>  
        <a href="#/userscourses">
            <i className="fa fa-id-card-o"> Usuários Cursos</i>
        </a>  
         <a href="#/logoff">
            <i className="fa fa-sign-out">  Logoff</i>
        </a>    
    </nav>
</aside>