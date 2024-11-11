var express = require("express");
var router = express.Router();

var municipioController = require("../controllers/municipioController");

router.get("/pegarCoberturaPercentualPorEstado/:ano/:uf", function (req, res) {
    municipioController.pegarCoberturaPercentualPorEstado(req, res);
});

router.get("/pegarAreaCoberturaPorCidade/:cidade", function (req, res) {
    municipioController.pegarAreaCoberturaPorCidade(req, res);
});

module.exports = router;