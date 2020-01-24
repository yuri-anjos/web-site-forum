const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'forumyuri'
})

connection.connect((err)=>{
    if(err){
        throw('ERRO AO CONECTAO AO BANCO')
    }
    console.log('CONEXAO COM O BANCO INICIADA')
})

module.exports = connection