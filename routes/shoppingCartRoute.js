const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");
const authController = require("../controllers/authController");
const shoppingCartRouter = express.Router();
//routes
shoppingCartRouter
  .route("/")
  .all(authController.protect) 
  .post(shoppingCartController.addProductShoppingCart);
 
  shoppingCartRouter
  .route("/:id")
  .all(authController.protect).delete(shoppingCartController.deleteProductByIdFromShoppingCart);

module.exports = shoppingCartRouter;