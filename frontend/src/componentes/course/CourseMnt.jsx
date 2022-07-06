import React, {Component} from "react"
import axios from 'axios'

import Params from '../../main/Constantes'
import Main from '../templates/Main'

const headerProps = {
    icon: 'list-alt',
    title: 'Cursos',
    subtitle: 'Manutenção de cursos'
}


const baseUrl = Params.baseUrl + '/courses'
const initialState = {
    course: { description: '' },
    list: []
}

const  recoveredUser =  JSON.parse(localStorage.getItem('user'))

export default class CourseMnt extends Component {
    
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
        this.setState({ course: initialState.course })
    }

    save() {
        const course = this.state.course
        const method = course.id ? 'put' : 'post'
        const params = new URLSearchParams();
        params.append('description', course.description);

        if (method ==='put') {
            axios.defaults.headers.put['user']= recoveredUser.email
            axios.defaults.headers.put['password']= recoveredUser.password
            axios.defaults.headers.put['Content-Type']='x-www-form-urlencoded'
            axios.defaults.headers.put['Access-Control-Allow-Origin']='*'
            params.append('id', course.id);
        }else {
            axios.defaults.headers.post['user']= recoveredUser.email
            axios.defaults.headers.post['password']= recoveredUser.password
            axios.defaults.headers.post['Content-Type']='x-www-form-urlencoded'
            axios.defaults.headers.post['Access-Control-Allow-Origin']='*'
        }

        axios[method](baseUrl, params)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ course: initialState.course, list })
            })
    }

    getUpdatedList(course, add = true) {
        const list = this.state.list.filter(c => parseInt(c.id) !== parseInt(course.id))
        if(add) list.unshift(course)
        return list
    }

    updateField(event) {
        const course = { ...this.state.course }
        course[event.target.name] = event.target.value
        this.setState({ course })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Curso</label>
                            <input type="text" className="form-control"
                                name="description"
                                value={this.state.course.description}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o cusro..." />
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

    load(course) {
        this.setState({ course })
    }

    remove(course) {
        axios.defaults.headers.delete['user']= recoveredUser.email
        axios.defaults.headers.delete['password']= recoveredUser.password
        axios.defaults.headers.delete['Content-Type']='x-www-form-urlencoded'
        axios.defaults.headers.delete['Access-Control-Allow-Origin']='*'
        axios.delete(`${baseUrl}/${course.id}`).then(resp => {
            const list = this.getUpdatedList(course, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Curso</th>
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
        return this.state.list.map(course => {
            return (
                <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.description}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(course)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(course)}>
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

