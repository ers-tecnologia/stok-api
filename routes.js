const express = require("express");
const router = express.Router();
const RegisterUserRoutes = require("./src/routes/RegisterUserRoutes")
const LoginUserRoutes = require("./src/routes/LoginUserRoutes")
const EstoqueService = require("./src/routes/EstoqueRoutes")
const CategoriaRoutes = require("./src/routes/CategoriaRoutes")
const SolicitanteRoutes = require("./src/routes/SolicitanteRoutes")
const ProdutoRoutes = require("./src/routes/ProdutoRoutes")
const EntradaItemRoutes = require("./src/routes/EntradaItemRoutes")
const DevolucaoItemRoutes = require("./src/routes/DevolucaoItemRoutes")


router.use("/usuario",  RegisterUserRoutes);
router.use("/login", LoginUserRoutes);
router.use("/estoque", EstoqueService);
router.use("/categoria", CategoriaRoutes);
router.use("/solicitante", SolicitanteRoutes);
router.use("/produto", ProdutoRoutes);
router.use("/entrada-item", EntradaItemRoutes);
router.use("/devolucao-item", DevolucaoItemRoutes);


module.exports = router;