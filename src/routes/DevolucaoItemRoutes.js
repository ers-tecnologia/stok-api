const express = require("express");
const router = express.Router();
const DevolucaoItemService = require("../services/DevolucaoItemService");

router.post("/", async (req, res) => {
  const devolucao = req.body;
  try {
    const result = await DevolucaoItemService.createDevolucaoItem(devolucao);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar devolução.", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await DevolucaoItemService.findDevolucaoItems();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar devoluções.", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await DevolucaoItemService.findDevolucaoItemById(id);
    if (!result) {
      res.status(404).json({ message: `devolução com id ${id} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar devolução.", error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const devolucao = req.body;
  try {
    const result = await DevolucaoItemService.updateDevolucaoItem(id, devolucao);
    if (!result) {
      res.status(404).json({ message: `devolução com id ${id} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar devolução.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DevolucaoItemService.deleteDevolucaoItem(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "devolução não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir devolução" });
  }
});

module.exports = router;