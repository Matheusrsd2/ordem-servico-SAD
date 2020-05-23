const OS = require('../models/ordem-servico');
const repository = require("../repositories/os-repository");

exports.post = async(req, res) => {
    var erros = [];
    if (!req.body.cliente){
        erros.push({texto: "Nome Invalido"})
    }
    if (!req.body.produto){
        erros.push({texto: "Produto Invalido"})
    }
    if (erros.length > 0){
        res.render('ordem-servico/cadastro-os', {erros: erros})
    }
    try {
        await repository.post({
            cliente: req.body.cliente,
            produto: req.body.produto,
            obs: req.body.obs,
        });
        res.redirect('/dashboard')
    } catch (error) {
        console.log("error" + error);
    }
}

exports.delete = (req, res) =>
{
    OS.destroy ({
        where: {id: req.params.id}
    }).then(function(){
        res.redirect("/dashboard")
    })
}

exports.update = (req, res) => {
    OS.update({
        status: 'CONCLUÍDO' },
        { where: { id: req.params.id }
    }).then(function(){
        res.redirect("/dashboard")
    })
}