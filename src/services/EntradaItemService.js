const EntradaItem = require("../models/entradaItem");

class EntradaItemService {
  async createEntradaItem(entradaItem) {
    try {
      const newEntradaItem = await EntradaItem.create(entradaItem);
      return newEntradaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findEntradaItems() {
    try {
      const entradaItems = await EntradaItem.findAll();
      return entradaItems;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findEntradaItemById(id) {
    try {
      const entradaItem = await EntradaItem.findByPk(id);
      return entradaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateEntradaItem(id, entradaItem) {
    try {
      const [updatedRowsCount, updatedRows] = await EntradaItem.update(entradaItem, {
        where: {
          id: id,
        },
        returning: true,
      });
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