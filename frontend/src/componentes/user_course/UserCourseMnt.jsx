import React, { Component } from "react"
import axios from 'axios'

import Params from '../../main/Constantes'
import Main from '../templates/Main'


const headerProps = {
    icon: '-id-card-o',
    title: 'Cursos dos Usuários',
    subtitle: 'Mantenção de cursos dos usuários'
}

const baseUrl = Params.baseUrl + '/userscourses'
const baseUrlUser = Params.baseUrl + '/users'
const baseUrlCousers = Params.baseUrl + '/courses'

const initialState = {
    usercourse: {  iduser: -1, idcourse: -1 },
    list: [],
    listUsers: [],
    userselect: -1,
    listCourses: [],
    courseselect: -1
}

const  recoveredUser =  JSON.parse(localStorage.getItem('user'))

export default class UserCourseMnt extends Component {
    
    state = { ...initialState }

    componentWillMount() {
        this.getListUserCourser()
        this.getUsers ()
        this.getListCourser()
    }

    getListUserCourser(){
        axios.defaults.headers.get['user']= recoveredUser.email
        axios.defaults.headers.get['password']= recoveredUser.password
        axios.defaults.headers.get['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.get['Access-Control-Allow-Origin']='*'
        axios(baseUrl).then(resp => {
            this.setState( state=> ({...state, list: resp.data} ))
        })
    }

    getListCourser(){
        axios.defaults.headers.get['user']= recoveredUser.email
        axios.defaults.headers.get['password']= recoveredUser.password
        axios.defaults.headers.get['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.get['Access-Control-Allow-Origin']='*'
        axios(baseUrlCousers).then(resp => {
            this.setState( state=> ({...state, listCourses: [state.userselect , ...resp.data]} ))
            
        })
    }


    clear() {
        this.setState(state=> ({...state , courseselect: initialState.courseselect} ))
            
    }

    save() {
        const usercourse = this.state.usercourse
        const params = new URLSearchParams();
        params.append('iduser', this.state.userselect);
        params.append('idcourse', this.state.courseselect);
        axios.defaults.headers.post['user']= recoveredUser.email
        axios.defaults.headers.post['password']= recoveredUser.password
        axios.defaults.headers.post['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.post['Access-Control-Allow-Origin']='*'
        
        axios['post'](baseUrl, params)
            .then(resp => {
                this.getListUserCourser()
            })
    }

    getUpdatedList(usercourse, add = true) {
        const list = this.state.list.filter(uc => parseInt(uc.id_usercourse) !== parseInt(uc.id_usercourse))
        if(add) list.unshift(usercourse)
        return list
    }

    updateField(event) {
        const usercourse = { ...this.state.usercourse }
        usercourse[event.target.name] = event.target.value
        this.setState(state=>( {  ...state, usercourse }))
    }

    getUsers (){
        axios.defaults.headers.get['user']= recoveredUser.email
        axios.defaults.headers.get['password']= recoveredUser.password
        axios.defaults.headers.get['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.get['Access-Control-Allow-Origin']='*'
        axios(baseUrlUser).then(resp => {
            const listUsers = resp.data
            this.setState(state=>( {  ...state, listUsers:[state.userselect ,...listUsers] }))
        })
    }

    renderItSelUsers() {
        return (
            this.state.listUsers.map(user => {
                return(
                <option value={user.id}>{user.name}</option>)
            })
 
        )
    }
    
    renderSelUsers() {
        return (
            <>
            <label className="form-label">Usuário (Selecione o usuário para exibir seus cursos.)</label>
            <select className="form-control" name="selUser" id="selUser" onChange={e => 
                     {this.setState(state=> ({...state, userselect: e.target.value }))}}>
                 {this.renderItSelUsers()}
            </select>
            </>
         )
    }

    renderItSelCourses() {
        return (
            this.state.listCourses.map(course => {
                return(
                <option value={course.id}>{course.description}</option>)
            })
 
        )
    }
    

    renderSelCourses() {
        return (
            <>
                <hr />
                <p>Para adicionar um curso, selecione o curso e clique em salvar.</p>
                <label className="form-label">Curso </label>
                <select className="form-control" name="selCourse" id="selCourse" value={this.state.courseselect} onChange={e => 
                        {this.setState(state=> ({...state, courseselect: e.target.value }))}}>
                    {this.renderItSelCourses()}
                </select>

            </>
         )
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                        {this.renderSelCourses()}
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" disabled={this.state.courseselect ===-1}
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

    load(usercourse) {
        this.setState({ ...this.state, usercourse })
    }

    remove(usercourse) {
        axios.defaults.headers.delete['user']= recoveredUser.email
        axios.defaults.headers.delete['password']= recoveredUser.password
        axios.defaults.headers.delete['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.delete['Access-Control-Allow-Origin']='*'
        axios.delete(`${baseUrl}/${usercourse.id_usercourse}`)
            .then(resp => {
                this.getListUserCourser()
        })
    }

    renderTable(iduser) {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                         <th>Id Curso user</th>
                         <th>Id user</th>
                         <th>Id Curso </th>
                         <th>Curso</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows(iduser)}
                </tbody>
            </table>
        )
    }

    renderRows(iduser) {
        return this.state.list.filter(usercourse=>usercourse.id_user == iduser).map(usercourse => {
            return (
                <tr key={usercourse.id_usercourse}>
                    <td>{usercourse.id_usercourse}</td>
                    <td>{usercourse.id_user}</td>
                    <td>{usercourse.idcoursem}</td>
                    <td>{usercourse.description}</td>
                    <td>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(usercourse)}>
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
                {this.renderSelUsers()}
                {this.renderForm()}
                {this.renderTable(this.state.userselect)}
            </Main>
        )
    }
}