const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Produto = sequelize.define(
  "Produto",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    patrimonio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estoqueMinimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estoqueMaximo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fotoProduto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { freezeTableName: true }
);

module.exports = Produto;

