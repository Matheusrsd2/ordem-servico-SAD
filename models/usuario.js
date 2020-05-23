const Sequelize = require('sequelize');
const sequelize = require('../app');

const Usuario = sequelize.define('usuario', {
    nome: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    senha:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
    },
  })

  //Usuario.sync();

  module.exports = Usuario;