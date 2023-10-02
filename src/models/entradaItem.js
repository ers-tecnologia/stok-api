const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const EntradaItem = sequelize.define(
  "EntradaItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    dataEntrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estoqueOrigem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioResponsavelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

module.exports = EntradaItem;