const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.userRegister = (req, res) => {
  let newUser = new User(req.body);

  newUser.save((error, user) => {
    console.log(req.body)
    if (error) {
      res.status(500);
      console.log(error);
      res.json({ message: "Erreur serveur." });
    } else {
      res.status(201);
      res.json({ message: `Utilisateur crée :${user.email}` });
    }
  });
};

exports.userLogin = (req, res) => {
  // Find user

  User.findOne({ email: req.body.email }, (error, user) => {
    if (error || user == null) {
      res.status(500);
      console.log(error);
      res.json({ message: "Utilisateur inconnu" });
    } else {
      // User found
      if (user.email == req.body.email && user.password == req.body.password) {
        let userData = {
          id: user._kd,
          email: user.email,
          role: "admin",
        };
        jwt.sign(
          userData,
          process.env.JWT_KEY,
          { expiresIn: "30DAYS" },
          (error, token) => {
            if (error) {
              res.status(500), console.log("err1255 " + error);
              res.json({ message: "impossilbe de générer le token" });
            } else {
              res.status(200);
              res.json({ token });
            }
          }
        );
      } else {
        res.status(401);
        console.log(error);
        res.json({ message: "EMail ou Mot de passe incorrect" });
      }
    }
  });
};
