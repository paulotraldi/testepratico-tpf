import React, { useContext } from 'react'
import { AuthContext } from '../../main/Auth'

import Main from '../templates/Main'

const  LogoffPage = props => {
    const { logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <Main icon="sign-out"  title ="Sair do sistema" subtitle ="Teste prático." >
            <div>Deseja realmente sair?</div>
            <button  className="btn btn-secondary mt-3" onClick={handleLogout} >Sair</button>
        </Main>
    )
}

export default LogoffPage

    
