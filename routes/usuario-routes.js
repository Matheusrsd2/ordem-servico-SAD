const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');
const sequelize = require('../app')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs');


router.get('/cadastrar', (req,res) => {
    res.render('usuario/cadastrar-usuario')
})

router.post('/cadastrar/novo', usuarioController.post)

router.post('/login', usuarioController.authenticate) 

module.exports = router;
