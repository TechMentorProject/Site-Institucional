var express = require("express");
var router = express.Router();

var populacaoController = require("../controllers/populacaoController");

router.get("/pegarAumentoPopulacionalPercentual/:ano/:estado", function (req, res) {
    populacaoController.pegarAumentoPopulacionalPercentual(req, res);
});

module.exports = router;