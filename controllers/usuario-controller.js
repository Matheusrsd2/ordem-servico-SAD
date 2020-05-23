const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.post = function (req,res) {
    var erros = [];
    Usuario.findOne({email: req.body.email}).then((usuario) =>{
        if (usuario){
            erros.push({texto: "Email ja cadastrado, tente novamente"})
        }
        if (erros.length > 0){
            res.render('usuario/cadastrar-usuario', {erros: erros})
        }
        else{
            const u = new Usuario({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            })
            bcrypt.genSalt(10, (erro,salt) => {
                bcrypt.hash(u.senha, salt, (erro, hash) => {
                    if (erro){
                        console.log('erro' +erro)
                        res.redirect('/usuario/cadastrar')
                    }
                    u.senha = hash;
                    u.save().then(() => {
                        res.redirect('/dashboard');        
                    }).catch((err) => {
                        console.log('erro ao salvar' +err)
                    })
                })
            })
        }
    })
};