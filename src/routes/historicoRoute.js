var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");

router.get("/validarAcesso/:dataAtual/:cpf", function (req, res) {
    historicoController.validarAcesso(req, res);
});

router.get("/verificarAcessos/:dataAtual/:dias/:cnpj", function (req, res) {
    historicoController.verificarAcessos(req, res);
});

router.get("/pegarFuncionariosSemAcesso/:dataAtual/:dias/:cnpj", function (req, res) {
    historicoController.pegarFuncionariosSemAcesso(req, res);
});

module.exports = router;