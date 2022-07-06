import React, { Component } from "react"
import axios from 'axios'

import Params from '../../main/Constantes'
import Main from '../templates/Main'




const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Mantenção de usuários'
}

const baseUrl = Params.baseUrl + '/users'
const initialState = {
    user: {  name: '', email: '', password: '' },
    list: []
}

const  recoveredUser =  JSON.parse(localStorage.getItem('user'))

export default class UserMnt extends Component {
    
    state = { ...initialState }

    componentWillMount() {
        axios.defaults.headers.get['user']= recoveredUser.email
        axios.defaults.headers.get['password']= recoveredUser.password
        axios.defaults.headers.get['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.get['Access-Control-Allow-Origin']='*'
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const params = new URLSearchParams();
        params.append('name', user.name);
        params.append('email', user.email);
        params.append('password', user.password);

        if (method ==='put') {
            axios.defaults.headers.put['user']= recoveredUser.email
            axios.defaults.headers.put['password']= recoveredUser.password
            axios.defaults.headers.put['Content-Type']='x-www-form-urlencoded'
            axios.defaults.headers.put['Access-Control-Allow-Origin']='*'
            params.append('id', user.id);
        }else {
            axios.defaults.headers.post['user']= recoveredUser.email
            axios.defaults.headers.post['password']= recoveredUser.password
            axios.defaults.headers.post['Content-Type']='x-www-form-urlencoded'
            axios.defaults.headers.post['Access-Control-Allow-Origin']='*'
        }

        axios[method](baseUrl, params)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                console.log('usuario state', initialState.user)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => parseInt(u.id) !== parseInt(user.id))
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control"
                                name="password"
                                value={this.state.user.password}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a senha..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.defaults.headers.delete['user']= recoveredUser.email
        axios.defaults.headers.delete['password']= recoveredUser.password
        axios.defaults.headers.delete['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.delete['Access-Control-Allow-Origin']='*'
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
        const list = this.getUpdatedList(user, false)
         this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}