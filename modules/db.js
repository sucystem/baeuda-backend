const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host : "baeuda.cmzdcoaqigiy.ap-northeast-2.rds.amazonaws.com",
    port : 3306,
    user : "yourproj",
    password : "2020slvmfhwprxm2",
    database : "baeuda",

    connectionLimit: 100,
    connectTimeout: 600000
})

module.exports = connection;