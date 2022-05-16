const router = require('express').Router();
const User = require('../models/User.model');
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", (req, res, next) => {
   console.log(req.session)
    res.render("users/profile", { user: req.session.user });
      
  });

router.get('/profile/:id/edit', (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
      .then((user) => {
        res.render('users/profile-edit', user);
      })
      .catch((err) => next(err));
  });

//   router.post('/:id/edit', fileUploader.single('profile-image'), (req, res, next) => {
//     const { id } = req.params;

//     const { username } = req.body;
   
  
//     if (req.file) {
//       User.findByIdAndUpdate(id, { username, imageUrl: req.file.path })
//         .then(() => res.redirect('/profile'))
//         .catch((err) => next(err));
//     } else {
//       User.findByIdAndUpdate(id, { username })
//         .then(() => res.redirect('/profile'))
//         .catch((err) => next(err));
//     }
//   });




  module.exports = router;