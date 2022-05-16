const router = require("express").Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id).then((user) => {
    res.render("users/profile", { user });
  });
});

router.get("/profile/:id/edit", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.render("users/profile-edit", user);
    })
    .catch((err) => next(err));
});

router.post(
  "/profile/:id/edit",
  fileUploader.single("profile-image"),
  (req, res, next) => {
    const { id } = req.params;

    const { username } = req.body;
    console.log(req.file)
  
      User.findByIdAndUpdate(id, { username, imageUrl: req.file.path })
        .then((updatedUser) => {
            console.log(updatedUser)
          res.redirect(`/profile/${id}`);
        })
        .catch((err) => next(err));
   
  }
);

module.exports = router;
