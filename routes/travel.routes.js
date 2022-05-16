const router = require("express").Router();
const Travel = require("../models/travel.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/travels", (req, res, next) => {
  Travel.find()
    .then((travels) => {
      res.render("travels/travel-list", { travels });
    })
    .catch((err) => next(err));
});

router.get("/travels/create", (req, res, next) => {
  res.render("travels/travel-create");
});

router.post(
  "/travels/create",
  fileUploader.single("travel-image"),
  (req, res, next) => {
    const { title, country, city, date, description } = req.body;

    if (req.file) {
      Travel.create({
        title,
        country,
        city,
        date,
        description,
        imageUrl: req.file.path,
      })
        .then(() => res.redirect("/travels"))
        .catch((err) => next(err));
    } else {
      Travel.create({ title, country, city, date, description })
        .then(() => res.redirect("/travels"))
        .catch((err) => next(err));
    }
  }
);

router.get("/travels/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Travel.findById(id)
    .then((travels) => {
      res.render("travels/travel-edit", travels);
    })
    .catch((err) => next(err));
});

router.post(
  "/travels/:id/edit",
  fileUploader.single("travel-image"),
  (req, res, next) => {
    const { id } = req.params;
    const { title, country, city, date, description } = req.body;
    if (req.file) {
      Travel.findByIdAndUpdate(id, {
        title,
        country,
        city,
        date,
        description,
        imageUrl: req.file.path,
      })
        .then(() => res.redirect("/travels"))
        .catch((err) => next(err));
    } else {
      Travel.findByIdAndUpdate(id, { title, country, city, date, description })
        .then(() => res.redirect("/travels"))
        .catch((err) => next(err));
    }
  }
);

router.post("/travels/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Travel.findByIdAndRemove(id)
    .then(() => res.redirect("/travels"))
    .catch((err) => next(err));
});

module.exports = router;
