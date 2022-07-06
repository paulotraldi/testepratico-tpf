const Params = require('./config')

async function connect(){
    
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
        host     : Params.cfgBb.host,
        user     : Params.cfgBb.user,
        password : Params.cfgBb.password,
        database : Params.cfgBb.database
      })
    
    global.connection = connection
    return connection
}

async function validaUser(user, password){
    const conn = await connect()
    const [rows] = await conn.query(`SELECT id, email, name, password FROM users WHERE email = '${user}' and password = '${password}'`)
    return rows
}

// Crud Users
async function getUser(id){
    const conn = await connect()
    const [rows] = await conn.query(`SELECT * FROM users WHERE id = '${id}'`)
    return rows
}

async function getUsers(){
    const conn = await connect()
    const [rows] = await conn.query(`SELECT * FROM users `)
    return rows
}


async function insertUsers(user){
    const conn = await connect()
    const sql = 'INSERT INTO users (name, email, password) VALUES (?,?,?);';
    const values = [user.name, user.email, user.password];
    return await conn.query(sql, values);
}

async function updateUsers(user){
    const conn = await connect()
    const sql = 'update users set name=?, email=?, password=? where id=?;';
    const values = [user.name, user.email, user.password, user.id];
    return await conn.query(sql, values);
}


async function delUser(id){
    const conn = await connect()
    const sql = 'delete from users where id=?;';
    return await conn.query(sql, [id]);
}

// Crud Coures

async function getCourse(id){
    const conn = await connect()
    const [rows] = await conn.query(`SELECT * FROM courses WHERE id = '${id}'`)
    return rows
}

async function getCourses(){
    const conn = await connect()
    const [rows] = await conn.query(`SELECT * FROM courses `)
    return rows
}


async function insertCourses(course){
    const conn = await connect()
    const sql = 'INSERT INTO courses (description) VALUES (?);';
    const values = [course.description];
    return await conn.query(sql, values);
}

async function updateCourses(course){
    const conn = await connect()
    const sql = 'update courses set description=? where id=?;';
    const values = [course.description, course.id];
    return await conn.query(sql, values);
}

async function delCourse(id){
    const conn = await connect()
    const sql = 'delete from courses where id=?;';
        return await conn.query(sql, [id]);
}


// Crud Users Coures

async function getUserCourses(){
    const conn = await connect()
    const [rows] = await conn.query(`SELECT uc.id id_usercourse, id_user, c.id idcoursem, c.description  FROM users_coursers uc join users u on uc.id_user  = u.id join courses c on uc.id_course  = c.id `)
    return rows
}


async function insertUserCourses(usercouser){
    const conn = await connect()
    const sql = 'INSERT INTO users_coursers (id_user, id_course) VALUES (?, ?);';
    const values = [usercouser.iduser, usercouser.idcourse];
    return await conn.query(sql, values);
}

async function delUserCourse(id){
    const conn = await connect()
    const sql = 'delete from users_coursers where id=?;';
        return await conn.query(sql, [id]);
}

module.exports = { validaUser, getUser, getUsers, insertUsers, updateUsers, delUser,  getCourse, getCourses, insertCourses, updateCourses, delCourse, getUserCourses, insertUserCourses, delUserCourse }