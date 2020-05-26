require('dotenv/config');
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

exports.login = async (data) => {
    const usuario = await Usuario.findOne({
        where: {
            email: data.email }
        });
  
    if (!usuario) {
      return null;
    }
  
    if (!usuario.validateHash(data.senha)) {
      return null;
    }
    console.log(process.env.SECRET);
    
    return {
      usuario: {
        id: usuario.id,
        email: usuario.email,
      },
      token: jwt.sign({ id: usuario.id }, process.env.SECRET, { expiresIn: 120 }),
    };
  };