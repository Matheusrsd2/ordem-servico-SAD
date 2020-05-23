const express = require('express');
const router  = express.Router();
const clienteController = require('../controllers/cliente-controller');

router.get('/', (req,res) => {
    res.render('cliente/cadastro-cliente')
})

router.get('/listar', clienteController.getAll);

router.post('/cadastrar', clienteController.post);

router.get('/deletar/:id',  clienteController.delete);

module.exports = router;