const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_client: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type_transaction: {
        type: DataTypes.ENUM("dépôt", "retrait", "transfert", "remboursement"),
        allowNull: false,
      },
      montant: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_agent: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      statut: {
        type: DataTypes.ENUM("validée", "en attente", "annulée"),
        defaultValue: "en attente",
      },
    },
    {
      tableName: "transactions",
      timestamps: true,
    }
  );

  return Transaction;
};
