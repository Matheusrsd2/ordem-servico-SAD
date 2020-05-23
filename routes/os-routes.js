const express = require('express');
const router = express.Router();
const osController = require('../controllers/os-controller');
const OS = require('../models/ordem-servico')
const Cliente = require('../models/cliente')
const sequelize = require('../app');

router.get('/', (req, res) => {
    res.render('ordem-servico/cadastro-os')
})

router.post('/cadastrar', osController.post);

router.get('/deletar/:id', osController.delete);

router.post('/update/:id', osController.update);

/*router.get('/gerencial', (req,res) => {
    res.render('ordem-servico/gerencial')
})*/
router.get('/dashboard', (req,res) => {
    OS.count().then(function(osCount){
        Cliente.count().then(function(cliCount){
            OS.count({
                where: {
                    status: 'EM ANDAMENTO'
                }  
            }).then(function(osStatus){
                OS.count({
                    group: ['produto'],
                    limit: 1
                })
                .then(function (prod) {
                    res.render('ordem-servico/gerencial', {
                        osCount: osCount, 
                        cliCount: cliCount, 
                        osStatus: osStatus, 
                        prod: prod
                    })
                })
            })
        })
    })
})



router.get('/gerencial/produto'), (req,res) => {
    OS.aggregate({
        $group:{
            _id:{$produto},
            total: {$sum: 1}, 
        }
    }).res.send({
        prod: _id,
        total: total
    })
}

module.exports = router;