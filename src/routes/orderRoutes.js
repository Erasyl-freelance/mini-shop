const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const requireLogin = require("../middleware/requireLogin");

// siparis yaptigini kontrol etmesi icin rota
router.post("/checkout", requireLogin, orderController.checkout);
router.get("/success", requireLogin, orderController.success);

// siparis tarihi icin rota
router.get("/orders", requireLogin,orderController.index);
router.get("/orders/:id", requireLogin, orderController.show);

module.exports = router;
