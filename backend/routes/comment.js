const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//models
var Schema = require("mongoose").Schema;
const commentSchema = Schema(
  {
    user: String,
    comment: String,
  },
  {
    collection: "comments",
  }
);

let Comment;
try {
  Comment = mongoose.model("comments");
} catch (error) {
  Comment = mongoose.model("comments", commentSchema);
}

//controllers and routes
const addComment = (commentData) => {
  return new Promise((resolve, reject) => {
    var new_comment = new Comment(commentData);
    new_comment.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert product to DB!"));
      } else {
        resolve({ message: "product added sccessfully" });
      }
    });
  });
};

const getComment = () => {
  return new Promise((resolve, reject) => {
    Comment.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get product!"));
      } else {
        if (data) {
          resolve(data);
        }
        reject("Cannot get product!");
      }
    });
  });
};

router.route("/add").post((req, res) => {
  console.log("comment add");
  addComment(req.body)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get").get((req, res) => {
  console.log("comment get");
  getComment()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add", function (req, res) {
  let comment = new Comment(req.body);
  comment
    .save()
    .then((product) => {
      res
        .status(200)
        .json(
          `{"product": Product added successfully. Created product details: ${product}}`
        );
    })
    .catch((err) => {
      res
        .status(400)
        .send(`Adding new product failed. Error details: ${err.message}`);
    });
});

//get Product by id details route
router.get("/:comment_id", function (req, res) {
  Product.findById(req.params.product_id)
    .then((product) => {
      res.status(200).json(product);
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
router.put("/comments/update/:comment_id", function (req, res) {
  Comment.findById(req.params.comment_id)
    .then((comment) => {
      comment.name = req.body.name;
      comment.detail = req.body.detail;
      comment.price = req.body.price;
      comment.quantity = req.body.quantity;

      comment
        .save()
        .then((comment) => {
          res
            .status(200)
            .json(`Comment updated! Updated comment details: ${comment}`);
        })
        .catch((err) => {
          res
            .status(400)
            .send(`Update not possible. Error details: ${err.message}`);
        });
    })
    .catch((err) => {
      res.status(404).send(`Comment not found. Error details: ${err.message}`);
    });
});

//Delete Product by id
router.delete("/comments/delete/:comment_id", function (req, res) {
    Comment.findByIdAndDelete(req.params.comment_id)
    .then((comment) => {
      if (comment) {
        return res
          .status(200)
          .json(`Comment deleted! Deleted product details: ${comment}`);
      } else {
        return res.status(404).send("Comment not found");
      }
    })
    .catch((err) => {
      res.status(500).send(`Error details: ${err.message}`);
    });
});

module.exports = router
