/*** Import des modules nécessaires */
const { Sequelize } = require("sequelize");

/*** Connexion à la base de données */
let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);
/*** Mise en place des relations */
const db = {};

db.sequelize = sequelize;
db.Client = require("./Models/client")(sequelize);
db.Compte = require("./Models/compte")(sequelize);
db.Transaction = require("./Models/transaction")(sequelize);
db.Pret = require("./Models/pret")(sequelize);
db.Remboursement = require("./Models/Remboursement")(sequelize);
db.Agent = require("./Models/agent")(sequelize);

// *************LES RELATION************************************************
// *********RELATION ENTRE CLIENT ET COMPTE*********************************

// === Client → Compte
db.Client.hasMany(db.Compte, { foreignKey: "id_client" });
db.Compte.belongsTo(db.Client, { foreignKey: "id_client" });

//db.Client.hasMany(db.Transaction, { foreignKey: "id_client" });
// db.Compte.belongsTo(db.Client, { foreignKey: "id_client" });
//db.Transaction.belongsTo(db.Client, { foreignKey: "id_client" });

// *********RELATION ENTRE COMPTE ET TRANSACTION****************************

// === Compte → Transaction
db.Compte.hasMany(db.Transaction, { foreignKey: "id_compte" });
db.Transaction.belongsTo(db.Compte, { foreignKey: "id_compte" });

// === Client → Transaction (facultatif mais pratique)
db.Client.hasMany(db.Transaction, { foreignKey: "id_client" });
db.Transaction.belongsTo(db.Client, { foreignKey: "id_client" });


// *********RELATION ENTRE CLINT ET PRET************************************
db.Client.hasMany(db.Pret, { foreignKey: "id_client" });
db.Pret.belongsTo(db.Client, { foreignKey: "id_client" });
// *********RELATION ENTRE PRET ET REMBOURSEMENT ***************************
db.Pret.hasMany(db.Remboursement, { foreignKey: "id_pret" });
db.Remboursement.belongsTo(db.Pret, { foreignKey: "id_pret" });
// *********RELATION ENTRE TRANSACTION ET REMBOURSEMENT *********************
db.Transaction.hasOne(db.Remboursement, { foreignKey: "id_transaction" });
db.Remboursement.belongsTo(db.Transaction, { foreignKey: "id_transaction" });
// *********RELATION ENTRE TRANSACTION ET AGENT ******************************
db.Transaction.belongsTo(db.Agent, { foreignKey: "id_agent" });
db.Agent.hasMany(db.Transaction, { foreignKey: "id_agent" });
// ***************************************************************************
// /*** synchronisation des modeles */
// sequelize.sync((err) => {
//   console.log("Database Error", err);
// });

db.sequelize.sync({ alter: true });

// db.sequelize = sequelize;

module.exports = db;
