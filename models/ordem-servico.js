const Sequelize = require('sequelize');
const sequelize = require('../app');

const OS = sequelize.define('ordem_servico', {
    // Model attributes are defined here
    cliente: {
      type: Sequelize.STRING,
      allowNull: true
    },
    tecnico: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    produto:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.STRING,
        defaultValue: 'EM ANDAMENTO',
    }

  })

  //OS.sync();

  module.exports = OS;