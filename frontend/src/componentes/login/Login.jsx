import React, {useState, useContext} from "react"

import { AuthContext } from '../../main/Auth'

// import './Login.css'

const LoginPage = props => {
    const {authenticated, login} = useContext (AuthContext)
    
    const [email, setEmail ] = useState("")
    const [password, setPassword ] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div className="main d-flex justify-content-center">
            <div className="container ">
                <div className="row d-flex justify-content-center">
                    <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 child">
                        <h3 className="text-center mt-5">Login</h3>
                        <div>
                            <p id="mensagem" className="text-danger text-center"></p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Usuário</label>
                                <input type="text" className="form-control" id="email" 
                                  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Senha</label>
                                <input type="password" className="form-control" id="password" 
                                value={password} onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <button type="submit" id="btnLogin" className="btn btn-secondary btn-block center" >Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
