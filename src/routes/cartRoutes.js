const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/cart", cartController.index);
router.post("/cart/add", cartController.add);
// router.get("/cart/remove/:id", cartController.remove);


router.post("/cart/ajax/increase/:id", cartController.ajaxIncrease);
router.post("/cart/ajax/decrease/:id", cartController.ajaxDecrease);
router.delete("/cart/ajax/remove/:id", cartController.ajaxRemove);

module.exports = router;
