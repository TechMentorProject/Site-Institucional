var express = require("express");
var router = express.Router();

var notificacaoController = require("../controllers/notificacaoController");

router.get("/pegarUltimas/:fkCnpj", function (req, res) {
    notificacaoController.pegarUltimas(req, res);
});

module.exports = router;