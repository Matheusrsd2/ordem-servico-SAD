var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var moment = require('moment');
var path = require('path');
var cookieParser = require('cookie-parser')
const app = express();
const session = require('express-session');
const Sequelize = require('sequelize');
const autorization = require('./services/auth-service');

const sequelize = new Sequelize('ordem_servico', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate().then(function(){
    console.log('conectado')
}).catch(function(err){
    console.log('erro'+err)
});

module.exports = sequelize; 

//cookie
app.use(cookieParser())

//Sessão
app.use(session({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true
}))


//body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//public
app.use(express.static(path.join(__dirname, 'public')))

//handlebars
app.set('views', path.join(__dirname, 'views'));
//app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.engine('handlebars', handlebars({
    defaultLayout: 'main', //Defina em sua view ou no meu caso no layout main.js
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY - HH:mm:ss')
        }
    }
}))
app.set('view engine', 'handlebars');


//ROTAS
//var produtoRoute = require("./src/routes/produto-routes");
var usuarioRoute = require("./routes/usuario-routes"); 
var clienteRoute = require("./routes/cliente-routes");
var dashboardRoute = require('./routes/dashboard-route');
var osRoute = require('./routes/os-routes');
var produtoRoute = require('./routes/produto-route');
//var buscaRoute = require('./routes/busca-route');
var funcRoute = require('./routes/funcionario-routes');
const indexRoute = require("./routes/index-routes");


//Vincular a aplicacao (app) com o motor de rotas
app.use('/produto', produtoRoute);
app.use('/usuario', usuarioRoute);
app.use('/dashboard', autorization.authorize, dashboardRoute);
app.use('/cliente', clienteRoute);
app.use('/os', osRoute);
//app.use('/buscar', buscaRoute);
app.use('/funcionario', funcRoute);
app.use('/', indexRoute);

app.get('/logout', function(req, res){
    res.clearCookie('x-access-token');
    res.redirect('/');
    console.log('token apagado');
 });

//Definindo a porta via arquivo de configuração
var port = process.env.port || 3000;

app.listen(port, () => {
    console.log('Server up and running!');

});