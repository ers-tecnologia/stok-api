const express = require("express");
const router = express.Router();
const SaldoService = require("../services/SaldoService");

router.post("/", async (req, res) => {
  const saldo = req.body;
  try {
    const result = await SaldoService.createSaldo(saldo);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar saldo.", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const { estoqueId, produtoId } = req.query;

    if (estoqueId || produtoId) {
      const result = await SaldoService.findSaldosByFilters(
        estoqueId,
        produtoId
      );
      res.json(result);
    } else {
      const result = await SaldoService.findSaldos();
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar saldos.", error });
  }
});

router.get("/api/saldo", async (req, res) => {
  try {
    const { estoqueId } = req.query;

    if (estoqueId) {
      const result = await SaldoService.findLastSaldosByEstoqueId(estoqueId);
      res.json(result);
    } else {
      res
        .status(400)
        .json({ message: "O parâmetro 'estoqueId' é obrigatório." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar saldos agrupados.", error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SaldoService.findSaldoById(id);
    if (!result) {
      res.status(404).json({ message: `saldo com id ${id} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar saldo.", error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const saldo = req.body;
  try {
    const result = await SaldoService.updateSaldo(id, saldo);
    if (!result) {
      res.status(404).json({ message: `saldo com id ${id} não encontrado.` });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar saldo.", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SaldoService.deleteSaldo(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "saldo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir saldo" });
  }
});

module.exports = router;
