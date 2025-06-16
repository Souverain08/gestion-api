// ****************************************************
// **** IMPORTATION DES MODULES NECESSAIRES ****

const db = require("../db.config");

// **** IMPORTATION DES MODULES NECESSAIRES ****
const Client = db.Client;
const Transaction = db.Transaction;

// **** CREATION D'UN ROUTER ****

// **** DEFINITION DES ROUTES ****

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json({ data: clients });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getClientById = async (req, res) => {
  let clientId = parseInt(req.params.id);

  // Vérification de l'id
  if (!clientId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // La récupération de l'utilisateur
    const client = await Client.findOne({
      where: { id: clientId },
      include: {
        model: Transaction,
        attributes: ["type_transaction", "montant", "id_client", "updatedAt"],
      },
    });

    if (client === null) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Utilisateur trouvé
    return res.json({ data: client });
  } catch (err) {
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addClient = async (req, res) => {
  try {
    const { nom, prenom, email, adress, telephone, numero_piece_identite } =
      req.body;

    // Validation des données reçues
    if (
      !nom &&
      !prenom &&
      !email &&
      !adress &&
      !telephone &&
      !numero_piece_identite
    ) {
      return res.status(400).json({ message: "Missing Parameters" });
    }

    // Vérifier si l'utilisateur existe déjà dans la base de données

    const existingClient = await Client.findOne({
      where: { email: email },

      raw: true,
    });

    if (existingClient !== null) {
      return res
        .status(409)
        .json({ message: `L'email du client ${email} existe deja ` });
    }

    // Création de l'utilisateur
    const newClient = await Client.create({
      nom,
      prenom,
      email,
      adresse: adress,
      telephone,
      numero_piece_identite,
    });

    // console.log(newClient);

    return res.status(201).json({ message: "User Created", data: newClient });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    console.log(err);
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateClient = async (req, res) => {
  let clientId = parseInt(req.params.id);

  if (!clientId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Recherche de l'utilisateur
    const client = await Client.findOne({ where: { id: clientId }, raw: true });

    if (client === null) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(req.body);
    // Mise à jour de l'utilisateur
    await Client.update(req.body, { where: { id: clientId }, raw: true });

    console.log(req.body);

    return res.json({ message: "User Updated", dataUpdate: client });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.untrashClient = async (req, res) => {
  let clientId = parseInt(req.params.id);

  if (!clientId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Restaurer le client
    await Client.restore({ where: { id: clientId } });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.trashClient = async (req, res) => {
  let clientId = parseInt(req.params.id);

  if (!clientId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Suppression du client
    await Client.destroy({ where: { id: clientId } });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteClientById = async (req, res) => {
  let clientId = parseInt(req.params.id);

  if (!clientId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Suppression du client
    await Client.destroy({ where: { id: clientId }, force: true });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};
