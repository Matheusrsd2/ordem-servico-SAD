const Produto = require('../models/produto');
const repository = require('../repositories/produto-repository.js');

exports.post  = async(req, res) => {
    try{
        await repository.post({
            nome: req.body.nome,
            fabricante: req.body.fabricante,
            modelo: req.body.modelo,
        });
        res.satus(201).end({
            message:"produto cadastrado com sucesso"
        })
    }catch (error)
    {
        res.status(500).send({
            message: "erro ao cadastrar produto",
            erro: error
        })
    }
};

exports.getAll = function(req, res)
{
    Produto.findAll().then((produto) => {
        res.render('produto/listar-produto',
        {produto:produto})
    })
}

exports.delete = (req,res) =>
{
     Produto.destroy ({
         where: {id: req.params.id}
     }).then(function(){
         res.redirect("/produto/listar-produto")
     })
}