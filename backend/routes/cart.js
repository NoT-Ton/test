const expressFunction = require("express");
const router = expressFunction.Router();
const mongoose = require("mongoose");
const authorization = require("../config/authoriza")
var Schema = require("mongoose").Schema;

const cartSchema = Schema(
  {
    customerid: String,
    productid: String,
    quantity: Number,
    price: Number,
  },
  {
    conllection: "carts",
  }
);

let Cart;
try {
  Cart = mongoose.model("carts");
} catch (error) {
  Cart = mongoose.model("carts", cartSchema);
}

//controllers and routes
const addCart = (cartData) => {
  return new Promise((resolve, reject) => {
    var new_cart = new Cart(cartData);
    new_cart.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert product to DB!"));
      } else {
        resolve({ message: "product added sccessfully" });
      }
    });
  });
};

const updatecart = (payload) => {
  return new Promise((resolve, reject) => {
    const query = {
      customerid: payload.customerid,
      productid: payload.productid,
    };
    if (payload.productid) {
      Cart.findOneAndUpdate(
        query,
        { $set: { quantity: payload.quantity } },
        (err, data) => {
          if (data) {
            resolve(data);
          } else {
            reject(new Error("Cannot Update"));
          }
        }
      );
    }
  });
};

const getCart = () => {
  return new Promise((resolve, reject) => {
    Cart.find({}, (err, data) => {
      if (data) {
        resolve(data);
        reject(new Error("Cannot get User Data"));
      } else {
        reject(new Error("Cannot get User Data"));
      }
    });
  });
};

router.route("/carts/add").post(authorization,(req, res) => {
  console.log("cart add");
  addCart(req.body)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/cart/get").get(authorization,(req, res) => {
  console.log("cart get");
  getCart()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add",authorization, function (req, res) {
    let cart = new Cart(req.body);
    cart
      .save()
      .then((cart) => {
        res
          .status(200)
          .json(
            `{"product": Product added successfully. Created product details: ${cart}}`
          );
      })
      .catch((err) => {
        res
          .status(400)
          .send(`Adding new product failed. Error details: ${err.message}`);
      });
  });

//get Product by id details route
router.get("/:cart_id", function (req, res) {
    Product.findById(req.params.cart_id)
      .then((cart) => {
        res.status(200).json(cart);
      })
      .catch((err) => {
        res
          .status(400)
          .send(
            `Recieving product details failed. Error details: ${err.message}`
          );
      });
  });

  // Product update route
router.put("/carts/update/:cart_id", function (req, res) {
    Cart.findById(req.params.cart_id)
      .then((cart) => {
        cart.name = req.body.name;
        cart.detail = req.body.detail;
        cart.price = req.body.price;
        cart.quantity = req.body.quantity;
  
        cart
          .save()
          .then((cart) => {
            res
              .status(200)
              .json(`Cart updated! Updated cart details: ${cart}`);
          })
          .catch((err) => {
            res
              .status(400)
              .send(`Update not possible. Error details: ${err.message}`);
          });
      })
      .catch((err) => {
        res.status(404).send(`Cart not found. Error details: ${err.message}`);
      });
  });

  //Delete Product by id
router.delete("/carts/delete/:cart_id", function (req, res) {
    Cart.findByIdAndDelete(req.params.cart_id)
    .then((cart) => {
      if (cart) {
        return res
          .status(200)
          .json(`Cart deleted! Deleted product details: ${cart}`);
      } else {
        return res.status(404).send("Cart not found");
      }
    })
    .catch((err) => {
      res.status(500).send(`Error details: ${err.message}`);
    });
});

module.exports = router