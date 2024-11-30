var express = require("express");
var router = express.Router();

var censoIBGEController = require("../controllers/censoIBGEController");

router.get("/pegarDensidadePorCidade/:cidade/:estado", function (req, res) {
    censoIBGEController.pegarDensidadePorCidade(req, res);
});

module.exports = router;