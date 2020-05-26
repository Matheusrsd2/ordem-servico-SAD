const express = require('express');
const router  = express.Router();
const funcionarioController = require('../controllers/funcionario-controller');

router.get('/', (req,res) => {
    res.render('funcionario/cadastro-funcionario')
})

router.get('/listar', funcionarioController.getAll);

router.post('/cadastrar/novo', funcionarioController.post);

router.get('/deletar/:id',  funcionarioController.delete);

module.exports = router;