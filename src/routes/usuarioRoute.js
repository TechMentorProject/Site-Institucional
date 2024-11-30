const express = require("express");
const router = express.Router();
const upload = require('../config/configUpload');

const usuarioController = require("../controllers/usuarioController");

router.get("", (req, res) => {
    res.render("configuracoes")
});



router.post("/autenticarUsuario", upload.single('foto'), function (req, res) {
    usuarioController.autenticarUsuario(req, res);
});

router.post("/autenticarEmpresa", function (req, res) {
    usuarioController.autenticarEmpresa(req, res);
});

router.post("/pegarCargo", function (req, res) {
    usuarioController.pegarCargo(req, res);
});

router.post("/pegarFuncionariosPorEmpresa", function (req, res) {
    usuarioController.pegarFuncionariosPorEmpresa(req, res);
});







router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
});

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
});

router.post("/cadastrarCargo", function (req, res) {
    usuarioController.cadastrarCargo(req, res);
});







router.put("/atualizarUsuario", upload.single('foto'), function (req, res) {
    usuarioController.atualizarUsuario(req, res);
});

router.put("/atualizarEmpresa", function (req, res) {
    usuarioController.atualizarEmpresa(req, res);
});

router.put("/atualizarSenhaEmpresa", function (req, res) {
    usuarioController.atualizarSenhaEmpresa(req, res);
});

router.put("/atualizarCargo", function (req, res) {
    usuarioController.atualizarCargo(req, res);
});






router.delete("/removerUsuario", upload.single('foto'), function (req, res) {
    usuarioController.removerUsuario(req, res);
});

router.delete("/inativarEmpresa", function (req, res) {
    usuarioController.inativarEmpresa(req, res);
});

router.put("/removerImagemEmpresa", function (req, res) {
    usuarioController.removerImagemEmpresa(req, res);
});

router.delete("/removerCargo", upload.single('foto'), function (req, res) {
    usuarioController.removerCargo(req, res);
});



router.post("/alterarFoto/:idUsuario", upload.single('foto'), (req, res) => {
    usuarioController.salvarFoto(req, res);
});

module.exports = router;