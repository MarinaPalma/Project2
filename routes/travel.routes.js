const router = require("express").Router();
const Travel = require("../models/travel.model");

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

router.post("/travels/create", (req, res, next) => {
  const { title, country, city, date, description } = req.body;

  Travel.create({ title, country, city, date, description })
    .then(() => res.redirect("/travels"))
    .catch((err) => next(err));
});

module.exports = router;
