const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    }
  });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  if (foundUser) {
    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
exports.updateUser = (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");
  User.findByIdAndUpdate(req.body._id, req.body, { new: true },
      function(err, response) {
          // Handle any possible database errors
          if (err) {
              res.status(404).json({
                  status: "not found",
              });
          } else {
              res.status(200).json({
                  status: "success",
                  message: "user updated"
              });
          }

      });


};
exports.deleteUserById = (req, res) => {

  User.findByIdAndDelete(req.params.id, function(err, document) {
      if (err) {
          console.log(err)
          res.status(404).json({
              status: "not found",
          });
      } else {
          
          res.status(200).json({
              status: "success",
              message: "user deleted"
          });
      }
  });
};
