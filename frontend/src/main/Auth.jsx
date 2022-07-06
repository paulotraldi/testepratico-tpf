import React, { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import Params from './Constantes'

export const AuthContext = createContext ()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const recoveredUser = localStorage.getItem('user')
        if (recoveredUser){
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false);
    }, [])

    const login = (email, password)=> {
        axios.defaults.headers.get['user']= email
        axios.defaults.headers.get['password']= password
        axios.defaults.headers.get['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.get['Access-Control-Allow-Origin']='*'
        axios(Params.baseUrl + '/login')
        .then(resp => {
            const loggedUser = resp.data[0]
            localStorage.setItem('user',JSON.stringify(loggedUser))
            setUser(loggedUser)
            navigate("/")
        } )
     }

    const logout = ()=> { 
       localStorage.removeItem('user')
       setUser(null)
       navigate("/login")
    }

    return(
        <AuthContext.Provider 
            value={{authenticated: !!user, user, loading, login, logout}}>
                {children}
        </AuthContext.Provider>
    )
}