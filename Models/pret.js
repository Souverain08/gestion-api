const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Pret = sequelize.define(
    "Pret",
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
      montant_pret: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      taux_interet: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      duree_mois: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date_demande: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      date_approbation: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_decaissement: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      montant_total_a_rembourser: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      statut: {
        type: DataTypes.ENUM("en cours", "terminé", "refusé"),
        defaultValue: "en cours",
      },
    },
    {
      tableName: "prets",
      timestamps: true,
    }
  );

  return Pret;
};
