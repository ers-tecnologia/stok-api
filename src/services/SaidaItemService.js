const SaidaItem = require("../models/saidaItem");

class SaidaItemService {
  constructor() {}

  async createSaidaItem(saidaItem) {
    try {
      const newSaidaItem = await SaidaItem.create(saidaItem);
      return newSaidaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findSaidaItems() {
    try {
      const saidaItems = await SaidaItem.findAll();
      return saidaItems;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findSaidaItemById(id) {
    try {
      const saidaItem = await SaidaItem.findByPk(id);
      return saidaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateSaidaItem(id, saidaItem) {
    try {
      const [updatedRowsCount, updatedRows] = await SaidaItem.update(saidaItem, {
        where: {
          id: id,
        },
        returning: true,
      });
      if (updatedRowsCount === 0) {
        throw new Error("Item de saída não encontrado");
      }
      return updatedRows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteSaidaItem(id) {
    try {
      const saidaItem = await SaidaItem.findByPk(id);
      if (!saidaItem) {
        throw new Error("Item de saída não encontrado");
      }

      await SaidaItem.destroy({
        where: {
          id: id,
        },
      });

      return saidaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new SaidaItemService();