/***********************************/
/*** Import des module nécessaires */

const DB = require("../db.config");
const Agent = DB.Agent;
const jwt = require("jsonwebtoken");

/**********************************/
/*** Routage de la ressource Agent */

exports.getAllAgents = (req, res) => {
  Agent.findAll()
    .then((agents) => res.json({ data: agents }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.getAgentById = async (req, res) => {
  let agentId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!agentId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    // Récupération de l'Agent et vérification
    let agent = await Agent.findOne({
      where: { id: agentId },
      attributes: [
        "id",
        "prenom",
        "email",
        "nom",
        "telephone",
        "role",
        "statut",
      ],
    });
    if (agent === null) {
      return res.status(404).json({ message: "This agent does not exist !" });
    }

    return res.json({ data: agent });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addAgent = async (req, res) => {
  const { nom, prenom, email, password, telephone } = req.body;

  // Validation des données reçues
  if (!nom || !prenom || !email || !password || !telephone) {
    return res.status(400).json({ message: "Missing Data comment " });
  }

  try {
    // Vérification si l'Agent existe déjà
    const agent = await Agent.findOne({ where: { email: email }, raw: true });
    if (agent !== null) {
      return res
        .status(409)
        .json({ message: `The agent ${nom} already exists !` });
    }

    // Hashage du mot de passe utilisateur
    // let hash = await bcrypt.hash(
    //   password,
    //   parseInt(process.env.BCRYPT_SALT_ROUND)
    // );
    // req.body.password = hash;

    // Création de l'agent
    let agentC = await Agent.create({
      nom,
      prenom,
      email,
      password,
      telephone,
    });

    // Génération du token et envoi
    const token = jwt.sign(
      {
        id: agentC.id,
        nom: agentC.nom,
        prenom: agentC.prenom,
        email: agentC.email,
        telephone: agentC.telephone,
        role: agentC.role,
        statut: agentC.statut,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING }
    );

    return res.json({
      message: "Agent Created",
      data: agentC,
      access_token: token,
    });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Hash Process Error", error: err });
  }
};

exports.updateAgent = async (req, res) => {
  let agentId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!agentId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  try {
    // Recherche de l'Agent et vérification
    let agent = await Agent.findOne({ where: { id: agentId }, raw: true });
    if (agent === null) {
      return res.status(404).json({ message: "This agent does not exist !" });
    }

    // Mise à jour de l'Agent
    await Agent.update(req.body, { where: { id: agentId } });
    return res.json({ message: "Agent Updated" });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.deleteAgentById = (req, res) => {
  let agentId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!agentId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  // Suppression de l'utilisateur
  Agent.destroy({ where: { id: agentId }, force: true })
    .then(() => res.status(204).json({}))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};
