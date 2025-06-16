// ****************************************************
// **** IMPORTATION DES MODULES NECESSAIRES ****

const db = require("../db.config");

// **** IMPORTATION DES MODULES NECESSAIRES ****
const Pret = db.Pret;
const Client = db.Client;

// **** CREATION D'UN ROUTER ****

// **** DEFINITION DES ROUTES ****

exports.getAllPrets = async (req, res) => {
  // La récupération de tout les pret
  try {
    const prets = await Pret.findAll();
    res.json({ data: prets });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getPretById = async (req, res) => {
  let pretId = parseInt(req.params.id);

  // Vérification de l'id
  if (!pretId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // La récupération de un pret
    const pret = await Pret.findOne({
      where: { id: pretId },
      include: Client,
    });

    if (pret === null) {
      return res.status(404).json({ message: "Pret not found" });
    }

    // Utilisateur trouvé
    return res.json({ data: pret });
  } catch (err) {
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addPret = async (req, res) => {
  const {
    id_client,
    montant_pret,
    taux_interet,
    statut,
    duree_mois,
    date_demande,
    date_approbation,
    date_decaissement,
    montant_total_a_rembourser,
  } = req.body;

  // Validation des données reçues
  if (
    !id_client ||
    !montant_pret ||
    !taux_interet ||
    !statut ||
    !duree_mois ||
    !date_demande ||
    !date_approbation ||
    !date_decaissement ||
    !montant_total_a_rembourser
  ) {
    return res.status(400).json({ message: "Missing Parameters" });
  }

  try {
    //     // Vérifier si l'utilisateur existe déjà dans la base de données
    //     const existingCompte = await Pret.findOne({
    //       where: { numero_compte: numero_compte },
    //       raw: true,
    //     });

    //     if (existingCompte !== null) {
    //       return res.status(409).json({
    //         message: `C'est numero de pret ${numero_compte} existe deja `,
    //       });
    //     }

    // Création du pret
    const newPret = await Pret.create({
      id_client,
      montant_pret,
      taux_interet,
      statut,
      duree_mois,
      date_demande,
      date_approbation,
      date_decaissement,
      montant_total_a_rembourser,
    });

    return res.status(201).json({ message: "Pret Created", data: newPret });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updatePret = async (req, res) => {
  let pretId = parseInt(req.params.id);

  if (!pretId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Recherche de la pret
    const pret = await Pret.findOne({
      where: { id: pretId },
      raw: true,
    });

    if (pret === null) {
      return res.status(404).json({ message: "Pret not found" });
    }

    // Mise à jour de la pret
    // Vérification des champs à mettre à jour
    await Pret.update(req.body, {
      where: { id: pretId },
      raw: true,
    });

    return res.json({ message: "Pret Updated" });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deletePretById = async (req, res) => {
  let pretId = parseInt(req.params.id);

  if (!pretId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Suppression du pret
    await Pret.destroy({ where: { id: pretId }, force: true });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};
