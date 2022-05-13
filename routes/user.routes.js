const router = require('express').Router();
const User = require('../models/User.model');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", (req, res, next) => {
   console.log(req.session)
    res.render("users/profile", { user: req.session.user });
      
  });


  module.exports = router;