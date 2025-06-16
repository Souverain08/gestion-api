const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adresse: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telephone: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      statut: {
        type: DataTypes.ENUM("actif", "inactif"),
        defaultValue: "actif",
      },
      numero_piece_identite: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      solde: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    {
      tableName: "clients",
      timestamps: true,
      // Empêcher la création d'index automatiques dupliqués
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["telephone"],
        },
      ],
    }
  );

  // Client.associate = (models) => {
  //   // Un client peut avoir plusieurs comptes
  //   Client.hasMany(models.Compte, {
  //     foreignKey: "id_client",
  //     as: "comptes",
  //   });
  // };

  return Client;
};

// Client.sync({ alter: true })
//   .then(() => {
//     console.log("Table User Created");
//   })
//   .catch((error) => {
//     console.log("Table User Error", error);
//   });

/*** Synchronisation du mode */
//  Client.sync();
// module.exports = Client;
