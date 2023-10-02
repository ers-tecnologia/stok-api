const Produto = require("../models/produto");

class ProdutoService {
  async createProduto(produto) {
    try {
      const newProduto = await Produto.create(produto);
      return newProduto;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findProdutos() {
    try {
      const produtos = await Produto.findAll();
      return produtos;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findProdutoById(id) {
    try {
      const produto = await Produto.findByPk(id);
      return produto;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduto(id, produto) {
    try {
      const [updatedRowsCount, updatedRows] = await Produto.update(produto, {
        where: {
          id: id,
        },
        returning: true,
      });
      if (updatedRowsCount === 0) {
        throw new Error("Produto não encontrado");
      }
      return updatedRows[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduto(id) {
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        throw new Error("Produto não encontrado");
      }

      await Produto.destroy({
        where: {
          id: id,
        },
      });

      return produto;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new ProdutoService();