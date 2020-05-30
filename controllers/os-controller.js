const OS = require('../models/ordem-servico');
const repository = require("../repositories/os-repository");
const token = require('../controllers/usuario-controller')

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
            valor_despesa_max: req.body.despesaMax
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
    OS.findOne({ where: { id: req.body.id} })
    .then(function(os){
        os.valor_despesa_final = req.body.despesaFinal
        os.status = 'CONCLUÍDO'
        os.save()
        .then(function(){
            res.redirect("/dashboard")
        })
    })
}