const express = require("express");
const cors = require("cors");

/*** Import de la connexion à la DB */
let DB = require("./db.config");

/*** Initialisation de l'API */
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders:
      "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/********************************/
/*** Import des module de routage */
const clientRouter = require("./routers/client");
const compteRouter = require("./routers/compte");
const transactionRouter = require("./routers/transaction");
const pretRouter = require("./routers/pret");
const remboursementRouter = require("./routers/remboursement");
const agentRouter = require("./routers/agent");
const authRouter = require("./routers/auth");
/********************************/
/*** Mise en place du routage */

app.use("/clients", clientRouter);
app.use("/comptes", compteRouter);
app.use("/transactions", transactionRouter);
app.use("/prets", pretRouter);
app.use("/remboursements", remboursementRouter);
app.use("/agents", agentRouter);
app.use("/auth", authRouter);

/********************************/
/*** Start serveur avec test DB */

DB.sequelize
  .authenticate()
  .then(() =>
    console.log("CONNEXION A LA BASE DE DONNEES REUSSIE AVEC SUCCES !")
  )
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `LES SERVERE CE LANCE SUR LE PORT ${process.env.SERVER_PORT} !`
      );
    });
  })
  .catch((err) => console.log("Database Error", err));
