const Funcionario = require('../models/funcionario');
const repository = require("../repositories/funcionario-repository");

exports.post = async(req, res) => {
    try {
        await repository.post({
            nome: req.body.nome,
            endereco: req.body.endereco,
            cpf: req.body.cpf,
            dataNasc: req.body.dataNasc,
            dataAdmissao: req.body.dataAdmissao,
        });
        res.redirect('/funcionario/listar');
    } catch (error) {
        res.status(500).send({
            message: "Falha ao cadastrar Funcionario",
            erro: error
        });
    }
};

exports.getAll = function (req,res) {
    Funcionario.findAll().then((func) => {
        res.render('funcionario/listar-funcionario', {func:func} )
    })
}

exports.delete = (req, res) =>
{
    Funcionario.destroy ({
        where: {id: req.params.id}
    }).then(function(){
        res.redirect("/funcionario/listar")
    })
}