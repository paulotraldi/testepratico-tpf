const db = require("./db")

function valLogin (user, password) {
    return new Promise ((resolve, reject)=>{
        db.validaUser(user, password)
        .then (resp=> resolve(resp))
    })

}


function isAuth (user, password) {
    return new Promise ((resolve, reject)=>{
        db.validaUser(user, password)
        .then (resp=> resolve(resp.length > 0 ))
    })
}


module.exports = { isAuth, valLogin }