var express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

var Schema = require('mongoose').Schema
const cartSchema = Schema({
  product: {
    type: ObjectId,
    ref: "Product"
  },
  name: String,
  count: Number,
  price: Number
}, {
    collection: 'order'
})

let Order
try {
  Order = mongoose.model('order')
} catch (error) {
  Order = mongoose.model('order', cartSchema)
}
