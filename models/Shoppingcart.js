const mongoose = require("mongoose");
/*

const Product = require("../models/Product");
const User = require("../models/User");

*/
const { Schema } = mongoose;
const shoppingCarSchema = new mongoose.Schema({
    user: { type: Schema.ObjectId, ref: "User" },
    status: ["PENDING","PAID" ] ,
    listProduct: [ { 
           product:{ type: Schema.ObjectId, ref: "Product" },
           salePrice:{ type: Number},
           quantity:{ type: Number,required: [true, "quantity is required"],},
           subTotal:{type:Number}
    }],
 
});

const Shoppingcart = mongoose.model("Shoppingcar", shoppingCarSchema);
module.exports = Shoppingcart;

