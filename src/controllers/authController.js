const db = require("../config/db");
const bcrypt = require("bcrypt");

const authController = {};

authController.authPage = (req, res) => {
  const mode = req.query.mode === "register" ? "register" : "login";
  res.render("auth", { mode });
};


// loginForm
authController.loginForm = (req, res) => {
  res.render("login");
};

// login/giris
authController.login = async (req, res) => {
  const { email, password } = req.body;
  const redirectTo = req.session.returnTo || "/products";


  if (!email || !password) {
    return res.send("Email ve şifre zorunlu");
  }

  const [[user]] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (!user) {
    return res.send("Kullanıcı bulunamadı");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.send("Şifre yanlış");
  }

  req.session.user = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  res.redirect("/products");
};

// registerForm 
authController.registerForm = (req, res) => {
  res.render("register");
};

// register
authController.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send("Email ve şifre zorunlu");
  }

  const hash = await bcrypt.hash(password, 10);

  await db.execute(
    "INSERT INTO users (email, password, role) VALUES (?, ?, 'user')",
    [email, hash]
  );

  res.redirect("/login");
};

// LOGOUT/CIKIS
authController.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = authController;
