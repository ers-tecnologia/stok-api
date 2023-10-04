const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Usuario = require("./usuario");
const Estoque = require("./estoque");
const Solicitante = require("./solicitante");

const SaidaItem = sequelize.define(
  "SaidaItem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gerarRecibo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    tipoSaida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

SaidaItem.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
SaidaItem.belongsTo(Estoque, { foreignKey: 'estoqueId', as: 'estoque' });
SaidaItem.belongsTo(Solicitante, { foreignKey: 'solicitanteId', as: 'solicitante' });

module.exports = SaidaItem;