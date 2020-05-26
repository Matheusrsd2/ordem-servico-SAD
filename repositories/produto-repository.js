const Produto = require('../models/produto.js');

exports.post = async (data) =>
{
    const p = new Produto(data);
    await p.save();
}