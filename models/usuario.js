const Sequelize = require('sequelize');
//const sequelize = require('../utils/modelLoader');
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
  },
  {
    timestamps: false,
})

  //Usuario.sync();

Usuario.ValidPassword = function (senha){
  return bcrypt.compareSync(senha, this.senha);
};

module.exports = Usuario;

