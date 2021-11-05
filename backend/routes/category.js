const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')

//models
var Schema = require('mongoose').Schema
const categorySchema = Schema({
    name:{
    type:String,
    trim:true,
    required:true,
    unique:true
  }
}, {
    collection: 'category'
})

let Category
try {
  Category = mongoose.model('category')
} catch (error) {
  Category = mongoose.model('category', categorySchema)
}



const createCategory = (categoryData) => {
  return new Promise ((resolve, reject) => {
      var new_category = new Category(
        categoryData
      )
      new_category.save((err, data) => {
          if(err){
               reject(new Error('Cannot create category to DB!'))
          }else{
              resolve({message: 'create category sccessfully'})
          }
      })
  })
}

const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {

      Category.findById(req).exec((err, data) => {
          if (err) {
              reject(new Error('Cannot get categorybyid to DB!'))
          }else{
            if(data){
              resolve(data)
            }
              reject('Cannot get categorybyid!')
          }
      })
  });
}

exports.getCategoryById = (req, res, next, id) =>
  {
    Category.findById(id).exec((err, cate) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.category = cate;  // variable
      next(); // call next function
    });
  };


//router.post("/category/create/",createCategory);
router.route('/category/create')
    .post((req, res) => {
      console.log('create');
      createCategory(req.body)
        .then(result => {
          console.log(result);
          res.status(200).json(result)
        })
        .catch(err=> {
          console.log(err);
        })
    })

//router.param("categoryId", getCategoryById);  // constructor
router.route('/category/get')
  .get((req, res)=>{
    console.log('get');
    getCategoryById(req.body.id)
    .then(result=> {
      console.log(result);
      res.status(200).json(result)
    })
    .catch(err=> {
      console.log(err);
    })
})


//router.get("/category/:categoryId", getCategory);
router.get("/category/:category_id", function(req, res) {
  Category.findById(req.params.category_id).then(category => {
      res.status(200).json(category);
  }).catch(err => {
      res.status(400).send(`Recieving category failed. Error details: ${err.message}`);
  });
})


//router.get("/categories", getAllCategory);

//update
//router.put("/category/:categoryId",updateCategory);

//delete

//router.delete("/category/:categoryId",removeCategory);


module.exports = router;
