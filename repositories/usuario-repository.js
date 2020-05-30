require('dotenv-safe').config();
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


exports.create = async(data) => {
  var user = new Usuario(data);
  await user.save();
}

exports.authenticate = async(data) => {
  const res = await Usuario.findOne({where: {
    email: data.email,
    senha: data.senha
  }})
  return res

}