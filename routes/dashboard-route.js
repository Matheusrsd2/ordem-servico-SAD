const OS = require('../models/ordem-servico');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    OS.findAll().then((os) => {
        res.render('dashboard', {os:os} )
    })
})

module.exports = router;