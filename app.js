const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(express.json());

// cors middleware
app.use(cors());

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
app.use("/v1/api", require("./routes/book"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on ${PORT}`));