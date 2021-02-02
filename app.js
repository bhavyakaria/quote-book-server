const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require('dotenv').config()

const app = express();
app.use(express.json());

// cors middleware
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Connect to Mongo
mongoose.connect(process.env.MongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Express Session 
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

// Routes
app.use('/', require('./routes/index'));
app.use("/v1/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));