var express = require("express");
var router = express.Router();

var estacoesSMPController = require("../controllers/estacoesSMPController");

router.get("/pegarAntenasPorEstado/:estado", function (req, res) {
    estacoesSMPController.pegarQtdAntenasPorEstado(req, res);
});

router.get("/pegarMaiorOperadoraPorEstado/:estado", function (req, res) {
    estacoesSMPController.pegarMaiorOperadoraPorEstado(req, res);
});

router.get("/pegarDensidadePorCidade/:cidade/:estado", function (req, res) {
    estacoesSMPController.pegarDensidadePorCidade(req, res);
});

router.get("/pegarDomiciliosCobertosPorCidade/:cidade/:estado", function (req, res) {
    estacoesSMPController.pegarDomiciliosCobertosPorCidade(req, res);
});

router.get("/pegarPopulacaoPorCidade/:cidade/:estado", function (req, res) {
    estacoesSMPController.pegarPopulacaoPorCidade(req, res);
});

module.exports = router;