const express = require('express');
const router = express.Router();
const osController = require('../controllers/os-controller');
const OS = require('../models/ordem-servico')
const Cliente = require('../models/cliente')
const sequelize = require('../utils/modelLoader');
const Funcionario = require('../models/funcionario')
const Produto = require('../models/produto')
//const sequelize = require('../app');

router.get('/', (req, res) => {
    Funcionario.findAll().then(function(func){
        Produto.findAll().then(function(prod){
            res.render('ordem-servico/cadastro-os', {func: func, prod: prod})
        })
    })
})

router.post('/cadastrar', osController.post);

router.get('/deletar/:id', osController.delete);

router.post('/update', osController.update);

router.get('/detalhes/:id', (req,res) => {
    OS.findOne({ 
        where: { 
            id: req.params.id 
        } 
    })
    .then(function (os){
        res.//send({
        //ordemservico: os
        render('ordem-servico/detalhes', {os:os})
    })
})

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
                    const sql= sequelize.query
                    ('SELECT SUM(valor_despesa_max) soma1, SUM(valor_despesa_final)soma2 FROM ordem_servicos', {
                        model: OS,
                        mapToModel: false // pass true here if you have any mapped fields
                    }).then(function(despesa){
                        const sql2 = sequelize.query
                        ('SELECT SUM(valor_despesa_max) - SUM(valor_despesa_final) as saldo FROM ordem_servicos', {
                            model: OS,
                            mapToModel: false // pass true here if you have any mapped fields
                        })
                        .then(function(resumoDespesa){
                            OS.count({
                            group: ['funcionario'],
                            limit: 1
                        })
                            .then(function(func){
                                /*res.send({
                                    func: func 
                                })*/
                                res.render('ordem-servico/gerencial',
                                {osCount:osCount,
                                cliCount: cliCount,
                                osStatus: osStatus,  
                                prod: prod,
                                despesa: despesa,
                                resumoDespesa: resumoDespesa,
                                func: func 
                                })
                            })
                        })    
                    })
                })
            })
        })
    })
})

router.get('/concluir/all', (req,res) => {
    OS.update(
        {
            status:  'CONCLUIDO'
        },
        { // Clause
            where: 
            {
                status: 'EM ANDAMENTO'
            }
        }
    ).then(function(){
        res.redirect('/os/dashboard')
    })
        
})

router.get('/teste', (req,res) => {
   const sql= sequelize.query
    ('select sum(valor_despesa_max) - sum(valor_despesa_final) as saldo from ordem_servicos;', {
        model: OS,
        mapToModel: false // pass true here if you have any mapped fields
    })
    .then((despesaa) => {
        res.send({
            result: despesaa
        })
    })
})
    

module.exports = router;