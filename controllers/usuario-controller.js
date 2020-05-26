const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const repository = require('../repositories/usuario-repository');
//const sequelize = require('../utils/modelLoader');
//const sequelize = require('../app')

exports.post = function (req,res) {
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
};

exports.login = async (req, res) => {
    try {
      const data = await repository.login(req.body);
  
      if (data) {
        return res
          .status(201)
          .json({
            message: "Login realizado com sucesso!",
            user: data.usuario,
            token: data.token,
          });
      }
  
      return res.status(401).json({ message: "Email e/ou senha inválidos!" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao realizar login!", error });
    }
  };