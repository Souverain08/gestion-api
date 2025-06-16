const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Compte = sequelize.define(
    "Compte",
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
      numero_compte: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_compte: {
        type: DataTypes.ENUM("épargne", "courant", "crédit"),
        allowNull: false,
      },
      solde_actuel: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.0,
      },
      statut: {
        type: DataTypes.ENUM("actif", "bloqué", "fermé"),
        defaultValue: "actif",
      },
    },
    {
      tableName: "comptes",
      timestamps: true,
    }
  );

  return Compte;
};
