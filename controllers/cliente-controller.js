const Cliente = require('../models/cliente');
const repository = require("../repositories/cliente-repository");

exports.post = async(req, res) => {
    try {
        await repository.post({
            nome: req.body.nome,
            endereco: req.body.endereco,
            cpf: req.body.cpf,
            cidade: req.body.cidade,
            estado: req.body.estado,
            dataNasc: req.body.dataNasc,
        });
        res.redirect('/cliente/listar');
    } catch (error) {
        res.status(500).send({
            message: "Falha ao cadastrar cliente",
            erro: error
        });
    }
};

exports.getAll = function (req,res) {
    Cliente.findAll().then((cliente) => {
        res.render('cliente/listar-cliente', {cliente:cliente} )
    })
}

exports.delete = (req, res) =>
{
    Cliente.destroy ({
        where: {id: req.params.id}
    }).then(function(){
        res.redirect("/cliente/listar")
    })
}
    