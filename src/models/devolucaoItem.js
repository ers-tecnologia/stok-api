const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Solicitante = require("./solicitante");

const DevolucaoItem = sequelize.define(
  "DevolucaoItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    produtoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataEntrada: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estoqueDestinoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

DevolucaoItem.belongsTo(Solicitante, {
  foreignKey: "solicitanteId",
  as: "solicitante",
});

module.exports = DevolucaoItem;
