var express = require("express");
var router = express.Router();

var municipioController = require("../controllers/municipioController");

router.get("/pegarCoberturaPercentualPorEstado/:ano/:estado", function (req, res) {
    municipioController.pegarCoberturaPercentualPorEstado(req, res);
});

router.get("/pegarMenoresCoberturas/:estado/:tecnologia/:operadora", function (req, res) {
    municipioController.pegarMenoresCoberturas(req, res);
});

module.exports = router;