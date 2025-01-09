const sequelize = require('sequelize')
const connection = new sequelize('sistema-perguntas-respostas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

module.exports = connection