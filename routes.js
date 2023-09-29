const express = require("express");
const router = express.Router();
const RegisterUserRoutes = require("./src/routes/RegisterUserRoutes")


router.use("/registrar-usuario",  RegisterUserRoutes);


module.exports = router;