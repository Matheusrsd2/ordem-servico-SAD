const Cliente = require('../models/cliente.js');

exports.post = async(data) =>{
    const c = new Cliente(data);
    await c.save();
}