const DevolucaoItem = require("../models/devolucaoItem");

class DevolucaoItemService {
  async createDevolucaoItem(devolucaoItem) {
    try {
      const newDevolucaoItem = await DevolucaoItem.create(devolucaoItem);
      return newDevolucaoItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findDevolucaoItems() {
    try {
      const devolucaoItems = await DevolucaoItem.findAll();
      return devolucaoItems;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findDevolucaoItemById(id) {
    try {
      const devolucaoItem = await DevolucaoItem.findByPk(id);
      return devolucaoItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateDevolucaoItem(id, devolucaoItem) {
    try {
      const [updatedRowsCount, updatedRows] = await DevolucaoItem.update(devolucaoItem, {
        where: {
          id: id,
        },
        returning: true,
      });
      if (updatedRowsCount === 0) {
        throw new Error("Item de devolução não encontrado");
      }
      return updatedRows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteDevolucaoItem(id) {
    try {
      const devolucaoItem = await DevolucaoItem.findByPk(id);
      if (!devolucaoItem) {
        throw new Error("Item de devolução não encontrado");
      }

      await DevolucaoItem.destroy({
        where: {
          id: id,
        },
      });

      return devolucaoItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new DevolucaoItemService();