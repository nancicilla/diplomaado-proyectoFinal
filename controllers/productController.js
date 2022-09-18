const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
exports.updateProduct = (req, res) => {
  Product.findByIdAndUpdate(req.body._id, req.body, { new: true },
      function(err, response) {
          // Handle any possible database errors
          if (err) {
              res.status(404).json({
                  status: "not found",
              });
          } else {
              res.status(200).json({
                  status: "success",
                  message: "product updated"
              });
          }

      });


};
exports.deleteProductById = (req, res) => {

  Product.findByIdAndDelete(req.params.id, function(err, document) {
      if (err) {
          console.log(err)
          res.status(404).json({
              status: "not found",
          });
      } else {
          console.log("Product deleted : ", document);
          res.status(200).json({
              status: "success",
              message: "Product deleted"
          });
      }
  });
};
