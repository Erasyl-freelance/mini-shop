const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/auth", authController.authPage);
router.get("/login", authController.loginForm);
router.post("/login", authController.login);

router.get("/register", authController.registerForm);
router.post("/register", authController.register);

router.get("/admin/login", (req, res) => {
    req.session.isAdmin = true;
    req.flash("success", "Admin modu açıldı");
    res.redirect("/products");
});


router.get("/admin/logout", (req, res) => {
    req.session.isAdmin = false;
    req.flash("success", "Admin modu kapandı");
    res.redirect("/products");
});



router.get("/logout", authController.logout);

module.exports = router;
