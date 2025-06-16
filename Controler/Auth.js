/***********************************/
/*** Import des module nécessaires */

const DB = require("../db.config");
const Agent = DB.Agent;
const jwt = require("jsonwebtoken");

/**********************************/

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validation des données reçues
  if (!email || !password) {
    return res.status(400).json({ message: "Bad email or password" });
  }

  try {
    // Vérification si l'utilisateur existe
    let agent = await Agent.findOne({ where: { email: email }, raw: true });
    if (agent === null) {
      return res
        .status(401)
        .json({ message: "This account does not exists !" });
    }

    // Vérification du mot de passe
    //let test = await bcrypt.compare(password, user.password)
    let test = await Agent.checkPassword(password, agent.password);
    if (!test) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Génération du token et envoi
    const token = jwt.sign(
      {
        id: agent.id,
        nom: agent.nom,
        prenom: agent.prenom,
        email: agent.email,
        telephone: agent.telephone,
        role: agent.role,
        statut: agent.statut,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING }
    );

    return res.json({ access_token: token });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Login process failed", error: err });
  }
};
