'use strict'

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const path = require('path')
let Sequelize = require('sequelize')
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $not: Op.not
}

//Criando a conexão com o banco de dados de acordo com a configuração do config.json
let sequelize = new Sequelize(config.database, config.username, config.password, config, { operatorsAliases })

sequelize.authenticate().then(function(){
    console.log('conectado')
}).catch(function(err){
    console.log('erro'+err)
});

module.exports = sequelize