const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
app.use(express.json());

// DB config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));