var express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const authorization = require('../config/authoriza')

//models
var Schema = require('mongoose').Schema
const productSchema = Schema({
    type: String,
    id: String,
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    /*category: {
      type: ObjectId,
      ref: "Category",

    },*/
    file: String,
    img: String,
}, {
    collection: 'products'
})

let Product
try {
  Product = mongoose.model('products')
} catch (error) {
  Product = mongoose.model('products', productSchema)
}


//controllers and routes
const addProduct = (productData) => {
    return new Promise ((resolve, reject) => {
        var new_product = new Product(
          productData
        )
        new_product.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert product to DB!'))
            }else{
                resolve({message: 'product added sccessfully'})
            }
        })
    })
}


const getProduct = () => {
  return new Promise ((resolve, reject) => {

      Product.find({},(err, data) => {
          if(err){
              reject(new Error('Cannot get product!'))
          }else{
            if(data){
              resolve(data)
            }
              reject('Cannot get product!')
          }
      })
  })
}

const getDevice = (type) =>{
  return new Promise((resolve, reject) => {
      Product.find({type: type}, (err,data) => {
          if(err){
              reject(new Error('Cannot get Product by type'))
          }else{
              if(data.length > 0){
                  resolve(data)
              }else{
                  reject(new Error('No '+type))
              }
          }
      })
  })
}

router.route('/products/add')
    .post(authorization,(req, res) => {
      console.log('add');
      addProduct(req.body)
        .then(result => {
          console.log(result);
          res.status(200).json(result)
        })
        .catch(err=> {
          console.log(err);
        })

    })

router.route('/products/get')
  .get(authorization,(req, res)=>{
    console.log('get');
    getProduct()
    .then(result=> {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err=> {
      console.log(err);
    })
})

router.route('/products/getproduct/:type')
.get((req, res) => {
    console.log(req.params.type)
    const type = req.params.type
    getDevice(type)
    .then(result => {
          console.log(result)
          res.status(200).send(result)
    })
    .catch(err => {
      console.log(err)
      res.status(400).json('No '+ type)
    })
})


router.post("/add", function(req, res) {
  let product = new Product(req.body);
  product.save().then(product => {
      res.status(200).json(`{"product": Product added successfully. Created product details: ${product}}`);
  }).catch(err => {
      res.status(400).send(`Adding new product failed. Error details: ${err.message}`);
  });
})

// router.route('/addproducts')
//     .post(authorization,(req,res) => {

//     })

//get Product by id details route
router.get("/:product_id", function(req, res) {
  Product.findById(req.params.product_id).then(product => {
      res.status(200).json(product);
  }).catch(err => {
      res.status(400).send(`Recieving product details failed. Error details: ${err.message}`);
  });
})

// Product update route
router.put("/products/update/:product_id", function(req, res) {
  Product.findById(req.params.product_id).then(product => {
      product.name = req.body.name;
      product.detail = req.body.detail;
      product.price = req.body.price;
      product.quantity = req.body.quantity;

      product.save().then(product => {
          res.status(200).json(`Product updated! Updated product details: ${product}`);
      }).catch(err => {
          res.status(400).send(`Update not possible. Error details: ${err.message}`);
      });
  }).catch(err => {
      res.status(404).send(`Product not found. Error details: ${err.message}`);
  });
})

//Delete Product by id
router.delete("/product/delete/:product_id", function(req, res) {
  console.log('Deleted');
  Product.findByIdAndDelete(req.params.product_id)
    .then(product => {
      if (product) {
        return res.status(200).json(`Product deleted! Deleted product details: ${product}`);
      } else {
        return res.status(404).send("Product not found");
      }
    })
    .catch(err => {
      res.status(500).send(`Error details: ${err.message}`);
    });
});

module.exports = router
