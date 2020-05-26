const Sequelize = require('sequelize');
const sequelize = require('../utils/modelLoader');

const Funcionario = sequelize.define('funcionario', {
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
    status:{
        type:Sequelize.STRING,
        defaultValue: 'ATIVO',
    },
    dataNasc:{
        type:Sequelize.DATE
    },
 
  },
  {
    timestamps: false,
  })

 //Funcionario.sync();

  module.exports = Funcionario;