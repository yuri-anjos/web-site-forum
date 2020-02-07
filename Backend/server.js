const express=require('express')
const app=express()
const db=require('./connection.js')
const path=require('path')

const porta = 3000 

const publicDirectory = path.join(__dirname, '../frontend/public/')
const viewsPath= path.join(__dirname, '../frontend/views/')
app.use(express.static(publicDirectory))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")
    res.setHeader("Access-Control-Allow-Credentials", true);
    next()
})

//===================================================================================

app.get("", (req, res)=>{
    res.sendFile(viewsPath+'index.html')
})

app.get("/sobre", (req, res)=>{
    res.sendFile(viewsPath+'sobre.html')
})

app.get("/topico", (req, res)=>{
    res.sendFile(viewsPath+'topico.html')
})

app.get("/usuario", (req, res)=>{
    res.sendFile(viewsPath+'usuario.html')
})

app.get("/editarUsuario", (req, res)=>{
    res.sendFile(viewsPath+'editarUsuario.html')
})

app.get("/cadastro", (req, res)=>{
    res.sendFile(viewsPath+'cadastro.html')
})

app.get("/login", (req, res)=>{
    res.sendFile(viewsPath+'login.html')
})

//===================================================================================
// LOGIN E CADASTRO DE USUARIO

app.post("/banco/login",  (req, res)=>{//buscar id de usuario pelo email e senha
    let query=`select id from usuario where email='${req.body.email}' and senha='${req.body.senha}'`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows[0])
        res.end()
    })
})

app.post("/banco/insertUser", (req, res)=>{//inserir usuario(cadastro)
    let usuario=req.body
    let query=`insert into usuario (email, senha, nome) values ('${usuario.email}', '${usuario.senha}', '${usuario.nome}')`
    db.query(query, (err, result)=>{
        if(err){throw(err)}
        res.send(result)
        res.end()
    })
})

//===================================================================================
// PAGINA INICIAL 

app.get("/banco/getAllTags",  (req, res)=>{//buscar todas as tags
    let query=`select * from tag order by id`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows)
        res.end()
    })
})

app.get("/banco/getAllTopics",  (req, res)=>{//buscar todos os topicos
    let query=`select topico.*, usuario.nome, tag.tech from topico inner join usuario on topico.id_usuario=usuario.id inner join tag on tag.id=topico.id_tag order by topico.criacao desc`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows)
        res.end()
    })
})

app.post("/banco/insertTopic", (req, res)=>{//inserir topico
    let topico=req.body
    let query=`insert into topico (titulo, descricao, criacao, finalizado, id_usuario, id_tag) values ('${topico.titulo}', '${topico.descricao}', now(), false, '${topico.id_usuario}', '${topico.id_tag}')`
    db.query(query, (err)=>{
        if(err){throw(err)}
        res.end()
    })
})

//===================================================================================
// TOPICO

app.post("/banco/getTopic",  (req, res)=>{//buscar o topico de id=x
    let query=`select topico.*, usuario.nome, tag.tech from topico inner join usuario on topico.id_usuario=usuario.id inner join tag on tag.id=topico.id_tag where topico.id='${req.body.id}'`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows[0])
        res.end()
    })
})

app.post("/banco/getAllComents",  (req, res)=>{//todos os comentarios de um topico
    let query=`select comentario.*, usuario.nome from comentario inner join topico on topico.id=comentario.id_topico inner join usuario on usuario.id=comentario.id_usuario where topico.id='${req.body.id}';`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows)
        res.end()
    })
})

//===================================================================================
// USUARIO

app.post("/banco/getUser",  (req, res)=>{
    let query=`select * from usuario where id='${req.body.id}'`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows[0])
        res.end()
    })
})

app.post("/banco/getSkills", (req, res)=>{
    let query=`select tag_usuario.id, tag.tech, tag_usuario.nivel from tag_usuario inner join tag on tag.id=tag_usuario.id_tag where tag_usuario.id_usuario='${req.body.id}'`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows)
        res.end()
    })
})

app.post("/banco/getTopicsFromUser", (req, res)=>{
    let query=`select topico.*, tag.tech from topico inner join tag on topico.id_tag=tag.id where id_usuario='${req.body.id}'`
    db.query(query, (err, rows)=>{
        if(err){throw(err)}
        res.send(rows)
        res.end()
    })
})

app.post("/banco/insertTagUser", (req, res)=>{//inserir tag_usuario
    let tagUsuario=req.body
    let query=`insert into tag_usuario (id_usuario, id_tag, nivel) values ('${tagUsuario.idusuario}', '${tagUsuario.novaTag.id}', '${tagUsuario.novaTag.nivel}')`
    db.query(query, (err)=>{
        if(err){throw(err)}
        res.end()
    })
})

app.post("/banco/removeTagUser", (req, res)=>{//remover tag_usuario
    let id=req.body.id
    let query=`DELETE FROM tag_usuario WHERE id=${id}`
    db.query(query, (err)=>{
        if(err){throw(err)}
        res.end()
    })
})

//===================================================================================

app.get("/*", (req, res)=>{
    res.sendFile(viewsPath+'error.html')
})

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`))