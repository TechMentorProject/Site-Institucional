var ambiente_processo = 'producao';
// var ambiente_processo = 'desenvolvimento';

// Se .:desenvolvimento:. você está se conectando ao banco local.
// Se .:producao:. você está se conectando ao banco remoto.
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;
var app = express();

var indexRouter = require("./src/routes/indexRoute");
var usuarioRouter = require("./src/routes/usuarioRoute");
var estacoesSMPRouter = require("./src/routes/estacoesSMPRoute");
var projecaoRouter = require("./src/routes/projecaoRoute");
var municipioRouter = require("./src/routes/municipioRoute");
var notificacaoRouter = require("./src/routes/notificacaoRoute");
var historicoRouter = require("./src/routes/historicoRoute");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/estacoesSMP", estacoesSMPRouter);
app.use("/projecao", projecaoRouter);
app.use("/municipio", municipioRouter);
app.use("/notificacao", notificacaoRouter);
app.use("/historico", historicoRouter);


app.listen(PORTA_APP, function () {
    console.log(`
    ######## ########  ######  ##     ##       ##     ## ######## ##    ## ########  #######  ######## 
       ##    ##       ##    ## ##     ##       ###   ### ##       ###   ##    ##    ##     ## ##     ##
       ##    ##       ##       ##     ##       #### #### ##       ####  ##    ##    ##     ## ##     ##
       ##    ######   ##       #########       ## ### ## ######   ## ## ##    ##    ##     ## ######## 
       ##    ##       ##       ##     ##       ##     ## ##       ##  ####    ##    ##     ## ##   ##  
       ##    ##       ##    ## ##     ##       ##     ## ##       ##   ###    ##    ##     ## ##    ## 
       ##    ########  ######  ##     ##       ##     ## ######## ##    ##    ##     #######  ##     ##                                                                                            
    Aplicação rodando em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. no caminho .: http://${HOST_APP}:${PORTA_APP} :. 
    `);
});
