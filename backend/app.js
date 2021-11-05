const express = require('express')
const mongoose = require('mongoose')
var app = express();

const url = 'mongodb://localhost:27017/db_it';
const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//middleware1, CORS Proricy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Option, Authorization')
    return next()
})

//middleware2, encode data(json)
app.use(express.json());
//middleware3,connect to mongodb
app.use((req, res, next) => {
    mongoose.connect(url, config)
    .then(() => {
        console.log('Connect to MongoDB');
        next()
    })
    .catch(err => {
        console.log('Cannot Connect to MongoDB');
        res.status(501).send('501 Cannot Connect to MongoDB')
    })
})

app.use('/user', require('./routes/user'))
app.use('/login', require('./routes/signin'))
app.use('/api', require('./routes/products'))
app.use('/wishlist', require('./routes/wishlist'))
app.use('/comment', require('./routes/comment'))


app.listen(3000, function() {
    console.log('Listen on port 3000');
})
