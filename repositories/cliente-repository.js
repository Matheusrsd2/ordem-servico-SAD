const Funcionario = require('../models/funcionario.js');

exports.post = async(data) =>{
    const f = new Funcionario(data);
    await f.save();
}