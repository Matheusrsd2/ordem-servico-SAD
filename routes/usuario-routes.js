const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario-controller');


router.get('/cadastrar', (req,res) => {
    res.render('usuario/cadastrar-usuario')
})

router.post('/cadastrar/novo', usuarioController.post)

router.get('/', (req, res) => {
    res.render('usuario/login')
})


module.exports = router;
