const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Remboursement = sequelize.define(
    "Remboursement",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_pret: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      montant_paye: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      date_paiement: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      numero_echeance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      statut: {
        type: DataTypes.ENUM("à temps", "en retard"),
        defaultValue: "à temps",
      },
      id_transaction: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "remboursements",
      timestamps: true,
    }
  );

  return Remboursement;
};
