const Sequelize = require('sequelize');
const sequelize = require('../utils/modelLoader');

const OS = sequelize.define('ordem_servico', {
  // Model attributes are defined here
  cliente: {
    type: Sequelize.STRING,
    allowNull: true
  },
  tecnico: {
    type: Sequelize.STRING
  },
  produto:{
    type:Sequelize.STRING
  },
  status:{
    type:Sequelize.STRING,
    defaultValue: 'EM ANDAMENTO',
  },
  obs:{
    type:Sequelize.STRING,
  },
  valor_despesa_max:{
    type:Sequelize.DOUBLE,
  },
  valor_despesa_final:{
    type:Sequelize.DOUBLE,
  },
  created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  },
  updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
},
{
  timestamps: false,
})

//OS.sync();

module.exports = OS;