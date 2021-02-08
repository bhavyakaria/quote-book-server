const express = require('express');

const router = express.Router();

// Welcome Page
router.get('/', (req, res) => res.send('welcome 2021'));

module.exports = router;