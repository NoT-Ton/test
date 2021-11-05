var express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const authorization = require('../config/authoriza');

var Schema = require("mongoose").Schema;
const internal = require("stream");

const userSchema = Schema(
  {
    username: String,
    password: String,
    name: String,
    surname: String,
    gender: String,
    age: Number,
    email: String,
    phone: String,
  },
  {
    collection: "users",
  }
);

let User;
try {
  User = mongoose.model("users");
} catch (error) {
  User = mongoose.model("users", userSchema);
}

const makeHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

const insertUser = (dataUser) => {
  return new Promise((resolve, reject) => {
    var new_user = new User({
      username: dataUser.username,
      password: dataUser.password,
      name: dataUser.name,
      surname: dataUser.surname,
      gender: dataUser.gender,
      age: dataUser.age,
      email: dataUser.email,
      phone: dataUser.phone,
    });
    new_user.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert user to DB!"));
      } else {
        resolve({ message: "Sign up successfully" });
      }
    });
  });
};

const getUser = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot get users!"));
      } else {
        if (data) {
          resolve(data);
        }
        reject("Cannot get users!");
      }
    });
  });
};

const getUserData = (id) => {
    return new Promise((resolve, reject) => {
        User.find({_id:id},(err, data) => {
            if(err){
                reject(new Error('Cannot get User Data'))
            }
            else{
                resolve(data)
            }
        })
    })
}

const updateUserData = (data,id) =>{
    return new Promise((resolve, reject) => {
        const query = {_id:id }
        User.findOneAndUpdate(query,{ $set :{username: data.username,
            email:data.email,
            phone: data.phone,}},(err, data) => {
            if(err){
                reject(new Error('Cannot Update'))
            }else{
                resolve(data)
            }
        })
    })
}

router.route("/signup").post((req, res) => {
  makeHash(req.body.password).then((hashText) => {
    const playload = {
      username: req.body.username,
      password: hashText,
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
    };
    console.log(playload);
    insertUser(playload)
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {});
  });
});

router.route("/updateuser/:id").put(authorization, (req, res) => {
  const id = req.params.id;
  const payload = {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
  };
  updateUserData(payload, id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route('/getuserdata/:id').get(authorization,(req, res) => {
    const id = req.params.id
     getUserData(id)
     .then(result => {
            res.status(200).send(result)
     })
     .catch(err => {
            console.log(err)
     })
})

module.exports = router;
