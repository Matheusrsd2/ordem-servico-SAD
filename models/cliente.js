const Sequelize = require('sequelize');
const sequelize = require('../utils/modelLoader');
//const sequelize = require('../app');

const Cliente = sequelize.define('cliente', {
    nome: {
      type: Sequelize.STRING,
      allowNull: true
    },
    cpf: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    endereco:{
        type:Sequelize.STRING
    },
    cidade:{
        type:Sequelize.STRING
    },
    estado:{
        type:Sequelize.STRING
    },
    dataNasc:{
        type:Sequelize.DATE
    },
    status:{
        type:Sequelize.STRING,
        defaultValue: 'ATIVO',
    },
  })

 //Cliente.sync();

  module.exports = Cliente;