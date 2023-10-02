const express = require("express");
const router = express.Router();
const { UsuarioService } = require("../services/LoginUserService");


router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await UsuarioService.autenticarUsuario(email, senha);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao autenticar usuário.", error });
  }
});





module.exports = router;