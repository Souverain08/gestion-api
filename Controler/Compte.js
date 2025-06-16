// ****************************************************
// **** IMPORTATION DES MODULES NECESSAIRES ****

const db = require("../db.config");

// **** IMPORTATION DES MODULES NECESSAIRES ****
const Compte = db.Compte;
const Client = db.Client;

// **** CREATION D'UN ROUTER ****

// **** DEFINITION DES ROUTES ****

exports.getAllComptes = async (req, res) => {
  // La récupération de tout les compte
  try {
    const comptes = await Compte.findAll();
    res.json({ data: comptes });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCompteById = async (req, res) => {
  let compteId = parseInt(req.params.id);

  // Vérification de l'id
  if (!compteId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // La récupération de un compte
    const compte = await Compte.findOne({
      where: { id: compteId },
      include: Client,
    });

    if (compte === null) {
      return res.status(404).json({ message: "Compte not found" });
    }

    // Utilisateur trouvé
    return res.json({ data: compte });
  } catch (err) {
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addCompte = async (req, res) => {
  const { numero_compte, type_compte, solde_actuel, statut, id_client } =
    req.body;

  // Validation des données reçues
  if (
    !numero_compte ||
    !type_compte ||
    !solde_actuel ||
    !statut ||
    !id_client
  ) {
    return res.status(400).json({ message: "Missing Parameters" });
  }

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingCompte = await Compte.findOne({
      where: { numero_compte: numero_compte },
      raw: true,
    });

    if (existingCompte !== null) {
      return res.status(409).json({
        message: `C'est numero de compte ${numero_compte} existe deja `,
      });
    }

    // Création de l'utilisateur
    const newComte = await Compte.create({
      numero_compte,
      type_compte,
      solde_actuel,
      statut,
      id_client,
    });

    return res.status(201).json({ message: "Compte Created", data: newComte });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateCompte = async (req, res) => {
  let compteId = parseInt(req.params.id);

  if (!compteId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Recherche de l'utilisateur
    const compte = await Compte.findOne({ where: { id: compteId }, raw: true });

    if (compte === null) {
      return res.status(404).json({ message: "Compte not found" });
    }

    // Mise à jour de l'utilisateur
    await Compte.update(req.body, { where: { id: compteId }, raw: true });

    return res.json({ message: "Compte Updated" });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.untrashCompte = async (req, res) => {
  let compteId = parseInt(req.params.id);

  if (!compteId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Restaurer le compte
    await Compte.restore({ where: { id: compteId } });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.trashCompte = async (req, res) => {
  let compteId = parseInt(req.params.id);

  if (!compteId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Suppression du compte
    await Compte.destroy({ where: { id: compteId } });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteCompteById = async (req, res) => {
  let compteId = parseInt(req.params.id);

  if (!compteId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Suppression du compte
    await Compte.destroy({ where: { id: compteId }, force: true });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};
