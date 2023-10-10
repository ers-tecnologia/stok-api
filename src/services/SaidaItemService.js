const SaidaItem = require("../models/saidaItem");
const Usuario = require("../models/usuario");
const Estoque = require("../models/estoque");
const Solicitante = require("../models/solicitante");
const Produto = require("../models/produto");

class SaidaItemService {
  constructor() {}

  async createSaidaItem(saidaItem) {
    try {
      if (isNaN(saidaItem.produtoId)) {
        const produto = await Produto.findOne({ where: { descricao: saidaItem.produtoId } });
        if (!produto) {
          throw new Error(`Produto com descrição ${saidaItem.produtoId} não encontrado.`);
        }
        saidaItem.produtoId = produto.id;
      }
      const newSaidaItem = await SaidaItem.create(saidaItem);
      return newSaidaItem;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findSaidaItems() {
    try {
      const saidaItems = await SaidaItem.findAll({
        include: [
          { model: Produto, as: "produto" },
          { model: Usuario, as: "usuario" },
          { model: Estoque, as: "estoque" },
          { model: Solicitante, as: "solicitante" },
        ],
      });
      return saidaItems;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async findSaidaItemById(id) {
    try {
      const saidaItem = await SaidaItem.findByPk(id, {
        include: [
          { model: Produto, as: "produto" },
          { model: Usuario, as: "usuario" },
          { model: Estoque, as: "estoque" },
          { model: Solicitante, as: "solicitante" },
        ],
      });
      return saidaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findSaidaItemByProdutoId(id) {
    try {
      const saidaItem = await SaidaItem.findOne( {
        include: [
          { model: Produto, as: "produto",  where: { id: id } },
          { model: Usuario, as: "usuario" },
          { model: Estoque, as: "estoque" },
          { model: Solicitante, as: "solicitante" },
        ],
      });
      return saidaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  async findSaidaItemByDescricao(descricao) {
    try {
      const saidaItem = await SaidaItem.findOne({
        include: [
          { 
            model: Produto, 
            as: "produto", 
            attributes: ['descricao'],
            where: { descricao: descricao }
          },
          { model: Usuario, as: "usuario" },
          { model: Estoque, as: "estoque" },
          { model: Solicitante, as: "solicitante" },
        ],
      });
      return saidaItem;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateSaidaItem(id, saidaItem) {
    try {
      const [updatedRowsCount, updatedRows] = await SaidaItem.update(
        saidaItem,
        {
          where: {
            id: id,
          },
          returning: true,
        }
      );
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
