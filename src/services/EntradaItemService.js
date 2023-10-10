const EntradaItem = require("../models/entradaItem");
const Estoque = require("../models/estoque");
const Produto = require("../models/produto");

class EntradaItemService {
  async createEntradaItem(entradaItem) {
    try {
      if (isNaN(entradaItem.produtoId)) {
        const produto = await Produto.findOne({ where: { descricao: entradaItem.produtoId } });
        if (!produto) {
          throw new Error(`Produto com descrição ${entradaItem.produtoId} não encontrado.`);
        }
        entradaItem.produtoId = produto.id;
      }
      const newSaidaItem = await EntradaItem.create(entradaItem);
      return newSaidaItem;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findEntradaItems() {
    try {
      const entradaItems = await EntradaItem.findAll({
        include: [
          { model: Estoque, as: "estoque" },
        ],
      });
      return entradaItems;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findEntradaItemById(id) {
    try {
      const entradaItem = await EntradaItem.findByPk(id, {
        include: [
          { model: Estoque, as: "estoque" },
        ],
      });
      return entradaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateEntradaItem(id, entradaItem) {
    try {
      const [updatedRowsCount, updatedRows] = await EntradaItem.update(
        entradaItem,
        {
          where: {
            id: id,
          },
          returning: true,
        }
      );
      if (updatedRowsCount === 0) {
        throw new Error("Entrada de Item não encontrada");
      }
      return updatedRows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteEntradaItem(id) {
    try {
      const entradaItem = await EntradaItem.findByPk(id);
      if (!entradaItem) {
        throw new Error("Entrada de Item não encontrada");
      }

      await EntradaItem.destroy({
        where: {
          id: id,
        },
      });

      return entradaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new EntradaItemService();
