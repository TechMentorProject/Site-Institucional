var express = require("express");
var router = express.Router();

var projecaoController = require("../controllers/projecaoController");

router.get("/pegarAumentoPopulacionalPercentual/:estado", function (req, res) {
    projecaoController.pegarAumentoPopulacionalPercentual(req, res);
});

module.exports = router;