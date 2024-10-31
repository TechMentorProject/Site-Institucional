var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/autenticarUsuario", function (req, res) {
    usuarioController.autenticarUsuario(req, res);
});

router.post("/autenticarEmpresa", function (req, res) {
    usuarioController.autenticarEmpresa(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

module.exports = router;