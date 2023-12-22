const Saldo = require("../models/saldo");

class SaldoService {
  async createSaldo(saldo) {
    try {
      const newSaldo = await Saldo.create(saldo);
      return newSaldo;
    } catch (error) {
      throw new Error(`Erro ao criar saldo: ${error.message}`);
    }
  }

  async findSaldos() {
    try {
      const saldos = await Saldo.findAll({ order: [["updatedAt", "DESC"]] });
      return saldos;
    } catch (error) {
      throw new Error(`Erro ao buscar saldos: ${error.message}`);
    }
  }

  async findSaldoById(id) {
    try {
      const saldo = await Saldo.findByPk(id);
      return saldo;
    } catch (error) {
      throw new Error(`Erro ao buscar saldo por ID: ${error.message}`);
    }
  }

  async updateSaldo(id, saldo) {
    try {
      const [updatedRowsCount, updatedRows] = await Saldo.update(saldo, {
        where: {
          id: id,
        },
        returning: true,
      });
      if (updatedRowsCount === 0) {
        throw new Error("Saldo não encontrado");
      }
      return updatedRows[0];
    } catch (error) {
      throw new Error(`Erro ao atualizar saldo: ${error.message}`);
    }
  }

  async deleteSaldo(id) {
    try {
      const saldo = await Saldo.findByPk(id);
      if (!saldo) {
        throw new Error("Saldo não encontrado");
      }

      await Saldo.destroy({
        where: {
          id: id,
        },
      });

      return saldo;
    } catch (error) {
      throw new Error(`Erro ao excluir saldo: ${error.message}`);
    }
  }

  async findLastSaldosByEstoqueId(estoqueId) {
    try {
      const query = `
        SELECT s1.*
        FROM saldos s1
        LEFT JOIN saldos s2
        ON s1.produtoId = s2.produtoId
        AND s1.updatedAt < s2.updatedAt
        WHERE s2.id IS NULL
        AND s1.estoqueId = :estoqueId
      `;

      const result = await Saldo.sequelize.query(query, {
        replacements: { estoqueId },
        type: Sequelize.QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      throw new Error(
        `Erro ao buscar últimos saldos por estoque ID: ${error.message}`
      );
    }
  }
  async findSaldosByFilters(estoqueId, produtoId) {
    try {
      const whereClause = {};
      if (estoqueId) {
        whereClause.estoqueId = estoqueId;
      }
      if (produtoId) {
        whereClause.produtoId = produtoId;
      }

      const result = await Saldo.findAll({
        where: whereClause,
        order: [["updatedAt", "DESC"]],
      });

      return result;
    } catch (error) {
      throw new Error(`Erro ao buscar saldos por filtros: ${error.message}`);
    }
  }
}

module.exports = new SaldoService();
