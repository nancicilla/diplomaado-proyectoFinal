
const Shoppingcart = require("../models/Shoppingcart");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/Product");
const User = require("../models/User");
exports.addProductShoppingCart = catchAsync(async (req, res) => {
 
  const foundCartPending = await Shoppingcart.findOne({status:"PENDING"});
  let foundProduct=await Product.findById(req.body.product);
  if (foundProduct){
    console.log(foundProduct);
    let price= foundProduct.price;
    let rate=foundProduct.discountRate;
    if(isNaN(rate))
    {
      rate=0
    }
    salePrice=price-(price*rate)/100;//quantity
    let total=req.body.quantity*salePrice;
    req.body.salePrice=salePrice;
    req.body.subTotal=total;
    
    let newProduct='';
    if (foundCartPending) {
      foundCartPending.listProduct.push(req.body);
      foundCartPending.save();
      newProduct=foundCartPending.listProduct;

    } else {
      newProduct = await Shoppingcart.create({
          user:req.user._id.valueOf()+"",
          status:"PENDING",
          listProduct:req.body
      }
          
          );
      
    }
    res.status(200).json({
      status: "Success",
      message:"Product add to shopping cart",
      data: {
        productList: newProduct,
      },
    });
  }else{
    res.status(404).json({
      status: "Not found",
      message:"Product not exist",
      
    });
  } 
});
exports.deleteProductByIdFromShoppingCart = catchAsync(async(req, res) => {
  
  const foundCartPending = await Shoppingcart.findOne({status:"PENDING",user:req.user._id.valueOf()});
   if(foundCartPending){
    console.log(foundCartPending.listProduct);
    const foundProduct = foundCartPending.listProduct.find((p) => p.product == req.params.id);
   
      if (foundProduct) {
        
          foundCartPending.listProduct.pull(foundProduct);
         await foundCartPending.save();
       
       
        res.status(200).json({
            status: "Success",
            message: "Product deleted",
        });
          
      } else {
       
        res.status(404).json({
            status: "Not Found",
            message:"Product Not found"
        });
      }
  //});




      
   }else{
   res.status(404).json({
    status: "Not Found",
    message:"Not exist Shopping Cart in status Pending"
});
}
  
 
});

exports.payShoppingCart = catchAsync(async (req, res) => {
 
  const foundCartPending = await Shoppingcart.findOne({status:"PENDING"});

  if (foundCartPending && foundCartPending.listProduct.length>0) {
    foundCartPending.status="PAID";
    foundCartPending.save();
    
   
    let totalPay= foundCartPending.listProduct.reduce((x,y)=>x+(y.salePrice*y.quantity),0);
    
    res.status(200).json({
      status: "Success",
      message:"Total to pay "+totalPay+" Bs."
  });

  } else {
    res.status(401).json({
      status: "Fail",
      message:"Not exist Product in  Shopping Cart  "
  });
    
  }

 
});
