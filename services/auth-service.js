const cookieParser = require("cookie-parser");
var jwt = require('jsonwebtoken');
require("dotenv-safe").config();

exports.authorize = function(req, res, next){
    //1 passo - busco o token
    const token = req.cookies['x-access-token'];
    if (!token){
        res.redirect('/');
        //res.status(401).json({auth: false, message: 'Acesso Restrito.'});
    } else {
        jwt.verify(token, process.env.SECRET, function (error, decode){
            if (error){
                res.redirect('/');
                //res.status(401).json({auth: false, message: 'Token Inválido.'});
            } else {
                next();
            }
        });
    }
}