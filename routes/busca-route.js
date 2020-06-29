const express = require('express');
const router  = express.Router();
const OS = require('../models/ordem-servico');
const sequelize = require('../utils/modelLoader');
const Op = sequelize.Sequelize.Op;

router.get('/', (req,res)=>{
    const busca = req.query.busca;
    const result = [];
    if (!busca){
        res.render('ordem-servico/no-busca')
    }
    else{
        OS.findAll({
            where: {
                cliente: { [Op.like]: busca }
            }
        })
        .then(os => {
            //var result = OS.count();
            //res.send({os, result})
            res.render('ordem-servico/busca-os', {
                os: os, result:result
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
})

module.exports = router;