const Cliente = require('../models/cliente.js');
const sequelize = ('../app');

exports.post = async(data) =>{
    const c = new Cliente(data);
    await c.save();
}