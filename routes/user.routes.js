const router = require("express").Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile", (req, res, next) => {
  
  User.findById(req.session.user._id).then((user) => {
    res.render("users/profile", { user });
  });
});

router.get("/profile/:id/edit", (req, res, next) => {

  User.findById(req.session.user._id)
    .then((user) => {
      res.render("users/profile-edit", user);
    })
    .catch((err) => next(err));
});

router.post(
  "/profile/:id/edit",
  fileUploader.single("existingImage"), (req, res, next) => {
    const { id } = req.params;
    const { username, existingImage } = req.body;
  let image;
  if(req.file){
image = req.file.path;
  } else {
image = existingImage;
  }
      User.findByIdAndUpdate(id, { username, imageUrl: image })
        .then((updatedUser) => {
            console.log(updatedUser)
          res.redirect(`/profile`);
        })
        .catch((err) => next(err));
   
  }
);

module.exports = router;
