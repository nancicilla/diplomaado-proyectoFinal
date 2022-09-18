const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");
const authController = require("../controllers/authController");
const payShoppingCartRouter = express.Router();
//routes
payShoppingCartRouter
  .route("/")
  .all(authController.protect).

  post(shoppingCartController.payShoppingCart)
  
 

module.exports = payShoppingCartRouter;