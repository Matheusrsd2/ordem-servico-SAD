'use strict'

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const path = require('path')
let Sequelize = require('sequelize')

//Criando a conexão com o banco de dados de acordo com a configuração do config.json
let sequelize = new Sequelize(config.database, config.username, config.password, config)

/*sequelize.authenticate().then(function(){
    console.log('conectado')
}).catch(function(err){
    console.log('erro'+err)
});*/

module.exports = sequelize