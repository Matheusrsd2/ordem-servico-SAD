const Usuario = require('../models/usuario');
const repository = require('../repositories/usuario-repository');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
//const authService = require('../services/auth-service');
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

exports.post = (req, res, next) => {
    var erros = [];
    Usuario.findOne({
        where: {
            email: req.body.email}
        }).then((usuario) =>{
        if (usuario){
            erros.push({texto: "Email ja cadastrado, tente novamente com outro email"})
        }
        if (erros.length > 0){
            res.render('usuario/cadastrar-usuario', {erros: erros})
        }
        else{
            try {
                var user = new Usuario();
                user.nome = req.body.nome,
                user.email = req.body.email,
                user.senha = md5(req.body.senha + global.SALT_KEY)
                user.save();
                res.redirect('/')
            } catch (e) {
                res.status(500).send({
                    message: 'Falha ao processar sua requisição',
                    erro: e
                });
            }
        }
    })
};

exports.authenticate = async(req, res, next) => {
    try {
        const user = await repository.authenticate({
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        });

        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }
        const id = user.id;
        var token = jwt.sign({id}, process.env.SECRET, {expiresIn: '1d'}); //5 min
        res.redirect('/dashboard')
        /*res.status(201).send({
            token: token,
            data: {
                id: user.id,
                email: user.email,
                nome: user.nome
            }
        });*/
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            erro: e
        });
    }
}

/*exports.post = function (req,res) {
    var erros = [];
    Usuario.findOne({
        where: {
            email: req.body.email}
        }).then((usuario) =>{
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
}; */



