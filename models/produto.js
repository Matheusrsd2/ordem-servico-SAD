const Sequelize = require('sequelize');
const sequelize = require('../utils/modelLoader');

const Produto = sequelize.define('produto',
{
    nome: 
    {
        type: Sequelize.STRING,
    },
    fabricante:
    {
        type:Sequelize.STRING,
    },
    modelo:
    {
        type: Sequelize.STRING,
    }

},
{
    timestamps: false,
})

Produto.sync();

module.exports = Produto;