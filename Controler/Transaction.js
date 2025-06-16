// ****************************************************
// **** IMPORTATION DES MODULES NECESSAIRES ****

const db = require("../db.config");

// **** IMPORTATION DES MODULES NECESSAIRES ****
const Transaction = db.Transaction;
const Client = db.Client;

// **** CREATION D'UN ROUTER ****

// **** DEFINITION DES ROUTES ****

exports.getAllTransactions = async (req, res) => {
  // La récupération de tout les transaction
  try {
    const transactions = await Transaction.findAll();
    res.json({ data: transactions });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTransactionById = async (req, res) => {
  let transactionId = parseInt(req.params.id);

  // Vérification de l'id
  if (!transactionId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // La récupération de un transaction
    const transaction = await Transaction.findOne({
      where: { id: transactionId },
      include: Client,
    });

    if (transaction === null) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Utilisateur trouvé
    return res.json({ data: transaction });
  } catch (err) {
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addTransaction = async (req, res) => {
  const { montant, type_transaction, id_client, id_agent } = req.body;

  // Validation des données reçues
  if (!montant || !type_transaction || !id_client || !id_agent) {
    return res.status(400).json({ message: "Missing Parameters" });
  }

  try {
    //     // Vérifier si l'utilisateur existe déjà dans la base de données
    //     const existingCompte = await Transaction.findOne({
    //       where: { numero_compte: numero_compte },
    //       raw: true,
    //     });

    //     if (existingCompte !== null) {
    //       return res.status(409).json({
    //         message: `C'est numero de transaction ${numero_compte} existe deja `,
    //       });
    //     }

    // Création du transaction

    const newTransaction = await Transaction.create({
      id_client,
      type_transaction,
      montant,
      statut: "validée",
      id_agent,
      description: "",
    });

    return res
      .status(201)
      .json({ message: "Transaction Created", data: newTransaction });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateTransaction = async (req, res) => {
  let transactionId = parseInt(req.params.id);

  if (!transactionId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Recherche de la transaction
    const transaction = await Transaction.findOne({
      where: { id: transactionId },
      raw: true,
    });

    if (transaction === null) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Mise à jour de la transaction
    // Vérification des champs à mettre à jour
    await Transaction.update(req.body, {
      where: { id: transactionId },
      raw: true,
    });

    return res.json({ message: "Transaction Updated" });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteTransactionById = async (req, res) => {
  let transactionId = parseInt(req.params.id);

  if (!transactionId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Suppression du transaction
    await Transaction.destroy({ where: { id: transactionId }, force: true });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};
