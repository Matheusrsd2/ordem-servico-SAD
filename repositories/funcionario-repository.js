const Funcionario = require('../models/funcionario.js');

exports.post = async(data) =>{
    const func = new Funcionario(data);
    await func.save();
}