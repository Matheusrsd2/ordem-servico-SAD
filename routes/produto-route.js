const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produto-controller');

router.get('/', (req, res) => 
{
    res.render('produto/cadastrar-produto')
})

router.get('/listar', produtoController.getAll);

router.post('/cadastrar', produtoController.post);

router.get('/deletar/:id',produtoController.delete);

module.exports = router;