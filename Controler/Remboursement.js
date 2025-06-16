// ****************************************************
// **** IMPORTATION DES MODULES NECESSAIRES ****

const db = require("../db.config");

// **** IMPORTATION DES MODULES NECESSAIRES ****
const Pret = db.Pret;
const Remboursement = db.Remboursement;

// **** CREATION D'UN ROUTER ****

// **** DEFINITION DES ROUTES ****

exports.getAllRemboursements = async (req, res) => {
  // La récupération de tout les remboursements
  try {
    const remboursements = await Remboursement.findAll();
    res.json({ data: remboursements });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getRemboursementById = async (req, res) => {
  let remboursementId = parseInt(req.params.id);

  // Vérification de l'id
  if (!remboursementId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // La récupération de un remboursement
    const remboursement = await Remboursement.findOne({
      where: { id: remboursementId },
      include: Pret,
    });

    if (remboursement === null) {
      return res.status(404).json({ message: "Remboursement not found" });
    }

    // Remboursement trouvé
    return res.json({ data: remboursement });
  } catch (err) {
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addRemboursement = async (req, res) => {
  const {
    id_pret,
    montant_paye,
    date_paiement,
    numero_echeance,
    id_transaction,
    statut,
  } = req.body;

  // Validation des données reçues
  if (
    !id_pret ||
    !montant_paye ||
    !date_paiement ||
    !numero_echeance ||
    !id_transaction ||
    !statut
  ) {
    return res.status(400).json({ message: "Missing Parameters" });
  }

  try {
    //     // Vérifier si l'utilisateur existe déjà dans la base de données
    //     const existingCompte = await Remboursement.findOne({
    //       where: { numero_compte: numero_compte },
    //       raw: true,
    //     });

    //     if (existingCompte !== null) {
    //       return res.status(409).json({
    //         message: `C'est numero de remboursement ${numero_compte} existe deja `,
    //       });
    //     }

    // Création du remboursement
    const newRemboursement = await Remboursement.create({
      id_pret,
      montant_paye,
      date_paiement,
      numero_echeance,
      id_transaction,
      statut,
    });

    return res
      .status(201)
      .json({ message: "Remboursement Created", data: newRemboursement });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.updateRemboursement = async (req, res) => {
  let remboursementId = parseInt(req.params.id);

  if (!remboursementId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Recherche de la remboursement
    const remboursement = await Remboursement.findOne({
      where: { id: remboursementId },
      raw: true,
    });

    if (remboursement === null) {
      return res.status(404).json({ message: "Remboursement not found" });
    }

    // Mise à jour de la remboursement
    // Vérification des champs à mettre à jour
    await Remboursement.update(req.body, {
      where: { id: remboursementId },
      raw: true,
    });

    return res.json({ message: "Remboursement Updated" });
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteRemboursementById = async (req, res) => {
  let remboursementId = parseInt(req.params.id);

  if (!remboursementId) {
    return res.status(400).json({ message: "Missing Parameter" });
  }

  try {
    // Suppression du remboursement
    await Remboursement.destroy({
      where: { id: remboursementId },
      force: true,
    });

    return res.status(204).json({});
  } catch (err) {
    // Gestion des erreurs de base de données ou autres
    res.status(500).json({ message: "Database Error", error: err });
  }
};
