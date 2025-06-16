/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

/*******************************/
/*** Définition du modèle Agent */
module.exports = (sequelize) => {
  const Agent = sequelize.define(
    "Agent",
    {
      id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING(100),
        defaultValue: "",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Ici une validation de données
        },
      },
      password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i, // Ici une contrainte
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("caissier", "gestionnaire", "administrateur"),
        defaultValue: "caissier",
      },
      statut: {
        type: DataTypes.ENUM("actif", "inactif"),
        defaultValue: "actif",
      },
    },
    { tableName: "agents", timestamps: true, paranoid: true }
  ); // Ici pour faire du softDelete

  Agent.beforeCreate(async (agent, options) => {
    let hash = await bcrypt.hash(
      agent.password,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    agent.password = hash;
  });

  Agent.checkPassword = async (password, originel) => {
    return await bcrypt.compare(password, originel);
  };

  return Agent;
};

/****************************************/
/*** Ancienne Synchronisation du modèle */
//Agent.sync()
//Agent.sync({force: true})
//Agent.sync({alter: true})
