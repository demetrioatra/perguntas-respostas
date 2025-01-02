// Express
const express = require('express')
const app = express()
// Body Parser
const bodyParser = require('body-parser')
// Sequelize
const connection = require('./database/database')
// Tabelas
const Pergunta = require('./database/models/Pergunta')
const Resposta = require('./database/models/Resposta')

//---------------------------------------------------------

// Banco
connection.authenticate()
.then(() => {
    console.log('Conexão iniciada!')
})
.catch((err) => {
    console.log('Não foi possível conectar... Erro: ' + err)
})
// Configurando EJS
app.set('view engine', 'ejs')
// Configurando arquivos estáticos
app.use(express.static('public'))
// Configurando Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Rotas
app.get('/', (req, res) => {

    // Procura todos no banco de dados
    Pergunta.findAll({raw: true, order: [
        ['id', 'desc']
    ]}).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', (req, res) => {

    res.render('perguntar')
})

app.post('/perguntar', (req, res) => {

    var titulo = req.body.titulo
    var descricao = req.body.descricao
    
    // Salva no banco de dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.get('/pergunta/:id', (req, res) => {

    var id = req.params.id

    // Procura um no banco de dados
    Pergunta.findOne({
        where: {id: id}
        
    }).then(pergunta => {
        if (pergunta != undefined) {

            // Procura todos no banco de dados
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [['id', 'desc']]
            }).then(respostas => {
                res.render('responder', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })


        } else res.redirect('/')
    })
})

app.post('/responder', (req, res) => {

    var descricao = req.body.descricao
    var perguntaId = req.body.perguntaId

    // Salva no banco de dados
    Resposta.create({
        descricao: descricao,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
} )

//---------------------------------------------------------

app.listen(8080, () => {
    console.log('Servidor iniciado!')
})