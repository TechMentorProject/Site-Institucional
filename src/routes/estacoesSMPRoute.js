var express = require("express");
var router = express.Router();

var estacoesSMPController = require("../controllers/estacoesSMPController");

router.get("/pegarAntenasPorEstado/:uf", function (req, res) {
    estacoesSMPController.pegarQtdAntenasPorEstado(req, res);
});

router.get("/pegarMaiorOperadoraPorEstado/:uf", function (req, res) {
    estacoesSMPController.pegarMaiorOperadoraPorEstado(req, res);
});

module.exports = router;