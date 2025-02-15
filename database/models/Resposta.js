const sequelize = require('sequelize')
const connection = require('../database')

const Resposta = connection.define('resposta', {
    descricao: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

Resposta.sync({force: false})

module.exports = Resposta