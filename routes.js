const express = require("express");
const router = express.Router();
const RegisterUserRoutes = require("./src/routes/RegisterUserRoutes");
const LoginUserRoutes = require("./src/routes/LoginUserRoutes");
const EstoqueRoutes = require("./src/routes/EstoqueRoutes");
const CategoriaRoutes = require("./src/routes/CategoriaRoutes");
const SolicitanteRoutes = require("./src/routes/SolicitanteRoutes");
const ProdutoRoutes = require("./src/routes/ProdutoRoutes");
const EntradaItemRoutes = require("./src/routes/EntradaItemRoutes");
const DevolucaoItemRoutes = require("./src/routes/DevolucaoItemRoutes");
const SaidaItemRoutes = require("./src/routes/SaidaItemRoutes");
const SubestoqueRoutes = require("./src/routes/SubestoqueRoutes");
const SaldoRoutes = require("./src/routes/SaldoRoutes");

router.use("/usuario", RegisterUserRoutes);
router.use("/login", LoginUserRoutes);
router.use("/estoque", EstoqueRoutes);
router.use("/categoria", CategoriaRoutes);
router.use("/solicitante", SolicitanteRoutes);
router.use("/produto", ProdutoRoutes);
router.use("/entrada-item", EntradaItemRoutes);
router.use("/devolucao-item", DevolucaoItemRoutes);
router.use("/saida-item", SaidaItemRoutes);
router.use("/sub-estoque", SubestoqueRoutes);
router.use("/saldo", SaldoRoutes);

module.exports = router;
