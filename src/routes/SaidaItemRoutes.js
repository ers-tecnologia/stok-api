const express = require("express");
const router = express.Router();
const SaidaItemService = require("../services/SaidaItemService");
const { Op } = require("sequelize");

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

router.get("/", async (req, res) => {
  try {
    const result = await SaidaItemService.findSaidaItems();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar itens de saída.", error });
  }
});

router.get("/produtoId/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SaidaItemService.findSaidaItemByProdutoId(id);
    if (!result) {
      res.status(404).json({ message: `Produto com id ${id} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar estoque.", error });
  }
});

router.get("/descricao/:descricao", async (req, res) => {
  const { descricao } = req.params;
  try {
    const result = await SaidaItemService.findSaidaItemByDescricao(descricao);
    if (!result) {
      res.status(404).json({ message: `Estoque com id ${descricao} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erro ao buscar estoque.", error });
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