const express = require("express");
const router = express.Router();
const {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartItemController");

router.route("/").post(createCartItem).get(getAllCartItems);
router
  .route("/:id")
  .get(getCartItemById)
  .put(updateCartItem)
  .delete(deleteCartItem);

module.exports = router;
