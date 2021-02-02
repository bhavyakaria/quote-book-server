const express = require("express");

// User Model
const User = require('../models/User');

const router = express.Router();

router.post('/login', (req, res) => {
  const { name, email, googleToken } = req.body;

  User.findOne({ email: email })
        .then(user => {
          if (user) {
            const userObj = {
              name: user["name"],
              user_id: user["id"],
              user_session_token: user["googleToken"],
              email_id: user["email"]
            };
            return res.json({ data: userObj });
          } else {
            const newUser = new User({
              name,
              email,
              googleToken
            });
            newUser
              .save()
              .then(newUser => {
                const userObj = {
                  name: newUser["name"],
                  user_id: newUser["id"],
                  user_session_token: newUser["googleToken"],
                  email_id: newUser["email"]
                };
                return res.json(userObj);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => {
          console.log(err);
        });

});

module.exports = router;
