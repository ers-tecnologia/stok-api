const express = require("express");
const router = express.Router();
const SaidaItemService = require("../services/SaidaItemService");

router.post("/", async (req, res) => {
  const estoque = req.body;
  try {
    const result = await SaidaItemService.createSaidaItem(estoque);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar estoque.", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await SaidaItemService.findSaidaItems();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar estoques.", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SaidaItemService.findSaidaItemById(id);
    if (!result) {
      res.status(404).json({ message: `Estoque com id ${id} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar estoque.", error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const estoque = req.body;
  try {
    const result = await SaidaItemService.updateSaidaItem(id, estoque);
    if (!result) {
      res.status(404).json({ message: `Estoque com id ${id} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar estoque.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SaidaItemService.deleteSaidaItem(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Estoque não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir estoque" });
  }
});

module.exports = router;