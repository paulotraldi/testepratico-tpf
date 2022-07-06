const port = 3003

const express = require ('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const auth = require ('./auth')
const db = require("./db")
const app = express ()

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

app.use(cors())
app.use(bodyParser.urlencoded({extended: true }))
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Terms de uso da api
app.get('/terms',(req, res)=>{
  res.json({message:"Termos de uso"})
})

// Login
app.get('/login',(req, res)=>{
   auth.valLogin(req.header('user'), req.header('password'))
   .then(resp => {
      res.send(resp)
   })
   .catch (() => res.send({erro: true, message:'Não foi possível  efetuar o login.'}) )
  
 })

// Crud Users
app.get('/users',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {

         db.getUsers() 
         .then(resp => {
               res.send(resp)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

  
      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })


 
 app.get('/users/:id',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {

         db.getUser(req.params.id) 
         .then(resp => {
               res.send(resp)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

  
      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })


 app.post('/users',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {
         
         db.insertUsers(req.body) 
         .then(resp => {
            const ret = {id: resp[0].insertId, ...req.body}
            res.send(ret)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })

 app.put('/users',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {
         db.updateUsers(req.body) 
         .then(resp => {
            if (resp[0].affectedRows >0){
               res.send(req.body)
            }else {
               const ret = {erro: true, message: 'Não foi possível atualizar o usuário.',  user:{...req.body}}
               res.send(ret)
            }
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

  
      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })

 
 app.delete('/users/:id',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {
      if (resp) {
         db.delUser(req.params.id) 
         .then(resp => {
            if (resp[0].affectedRows >0){
               const ret = {erro: false, message: 'Usuário excluído com sucesso.'}
               res.send(ret)
            }else {
               const ret = {erro: true, message: 'Não foi possível excluir o usuário.'}
               res.send(ret)
            }
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })


 // Crud Courses
app.get('/courses',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {

         db.getCourses() 
         .then(resp => {
               res.send(resp)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

  
      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })


 app.get('/courses/:id',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {

         db.getCourse(req.params.id) 
         .then(resp => {
               res.send(resp)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

  
      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })


 app.post('/courses',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {
         
         db.insertCourses(req.body) 
         .then(resp => {
            const ret = {id: resp[0].insertId, ...req.body}
            res.send(ret)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })


 app.put('/courses',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {
         db.updateCourses(req.body) 
         .then(resp => {
            if (resp[0].affectedRows >0){
               res.send(req.body)
            }else {
               const ret = {erro: true, message: 'Não foi possível atualizar o curso.',  user:{...req.body}}
               res.send(ret)
            }
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })

 
 app.delete('/courses/:id',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {
      if (resp) {
         db.delCourse(req.params.id) 
         .then(resp => {
            if (resp[0].affectedRows >0){
               const ret = {erro: false, message: 'Cusrso excluído com sucesso.'}
               res.send(ret)
            }else {
               const ret = {erro: true, message: 'Não foi possível excluir o curso.'}
               res.send(ret)
            }
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })



 // Crud UsersCourses
app.get('/userscourses',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {

         db.getUserCourses() 
         .then(resp => {
               res.send(resp)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

  
      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })



 app.post('/userscourses',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {

      if (resp) {
         
         db.insertUserCourses(req.body) 
         .then(resp => {
            const ret = {id: resp[0].insertId, ...req.body}
            res.send(ret)
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })


 app.delete('/userscourses/:id',(req, res)=>{
   auth.isAuth( req.header('user'), req.header('password')) 
   .then(resp => {
      if (resp) {
         db.delUserCourse(req.params.id) 
         .then(resp => {
            if (resp[0].affectedRows >0){
               const ret = {erro: false, message: 'Cusrso excluído com sucesso.'}
               res.send(ret)
            }else {
               const ret = {erro: true, message: 'Não foi possível excluir o curso.'}
               res.send(ret)
            }
         })
         .catch (() => res.send({erro: true, message:'Não foi possível processar sua solicitação.'}) )

      } else{
         res.send({erro: true, message:'Usuário não autenticado'})
      }
   })
   .catch (() => res.send({erro: true, message:'Não foi possível validar o usuário.'}) )
  
 })

 
//  app.get('/user',(req, res, next)=>{
//    auth.isAuth( req.header('user'), req.header('password')) 
//    .then(resp => {

//       if (resp) {

//          res.send({id:'1', email:'phtraldi@gmail.com.br', nome:'Paulo Henrique Traldi'})
//       } else{
//          res.send({erro: 'Erro', message:'Usuário não autenticado'})
//       }
//    })
//    .catch (() => res.send({erro: 'Erro', message:'Usuário não autenticado'}) )
  
//  })

 app.listen (port, () => {
    console.log(`Servidor rodando na porta ${port}`)
 })