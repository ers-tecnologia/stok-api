const express = require("express");
const router = express.Router();
const DevolucaoItemService = require("../services/DevolucaoItemService");

router.post("/devolucao-item", async (req, res) => {
  const devolucaoItem = req.body;
  try {
    const result = await DevolucaoItemService.createDevolucaoItem(devolucaoItem);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar devolucao de item.", error });
  }
});

router.get("/devolucao-item", async (req, res) => {
  try {
    const result = await DevolucaoItemService.findDevolucaoItems();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar devolucaos de itens.", error });
  }
});

router.get("/devolucao-item/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await DevolucaoItemService.findDevolucaoItemById(id);
    if (!result) {
      res.status(404).json({ message: `devolucao de item com id ${id} não encontrada.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar devolucao de item.", error });
  }
});

router.put("/devolucao-item/:id", async (req, res) => {
  const { id } = req.params;
  const devolucaoItem = req.body;
  try {
    const result = await DevolucaoItemService.updateDevolucaoItem(id, devolucaoItem);
    if (!result) {
      res.status(404).json({ message: `devolucao de item com id ${id} não encontrada.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar devolucao de item.", error });
  }
});

router.delete("/devolucao-item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DevolucaoItemService.deleteDevolucaoItem(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "devolucao de item não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir devolucao de item" });
  }
});

module.exports = router;