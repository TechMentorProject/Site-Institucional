var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

router.get("/pegarUltimasFuncionario/:fkCnpj", function (req, res) {
    notificacaoController.pegarUltimasFuncionario(req, res);
});

router.get("/pegarUltimas/:fkCnpj", function (req, res) {
    notificacaoController.pegarUltimas(req, res);
});

router.post("/adicionarParaEmpresa", function (req, res) {
    notificacaoController.adicionarParaEmpresa(req, res);
});

module.exports = router;