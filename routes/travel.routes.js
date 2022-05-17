const router = require("express").Router();
const Travel = require("../models/travel.model");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
// const axios = require('axios');


router.get("/travels", (req, res, next) => {

  User.findById(req.session.user._id)
  .populate("travels")
    .then((currentUser) => {
     
      res.render("travels/travel-list", {travels: currentUser.travels});
      
    })
    .catch((err) => next(err));

});

router.get("/travels/create", (req, res, next) => {
  res.render("travels/travel-create");
});



// axios.get("https://restcountries.com/v3.1/name/${name}")
//     .then((country)=>{
//       console.log(country.data[0].flags.png)
//       res.render("travels/travel-list", {
//        flag: country.data[0].flags.png
//       })
//     })
//     .catch((err) =>
//     console.log( err)
//   );



  

router.get("/travels-search", (req, res, next) =>{
  const {country} = req.query;
  console.log(country)
  Travel.find({
    author: req.session.user._id,
    country: {$regex: country, $options: "i"}})
    .then((foundedCountries)=>{
console.log(foundedCountries);
res.render("travels/travel-list", {travels: foundedCountries})
    })

  
})


router.post(
  "/travels/create",
  fileUploader.single("travel-image"),
  (req, res, next) => {
    const { title, country, city, date, description } = req.body;
  const userId = req.session.user._id;
    if (req.file) {
      Travel.create({
        title,
        country,
        city,
        author: userId,
        date,
        description,
        imageUrl: req.file.path,
      })
        .then((createdTravel) => {
         
         return User.findByIdAndUpdate(userId, {$push: {travels:createdTravel._id}}, {new: true}) 
         .then((updatedUser)=>{
           console.log(updatedUser)
           res.redirect("/travels")
         })
         
        })
        .catch((err) => next(err));
    } else {
      Travel.create({ title, country, city, date, description })
        .then(() => res.redirect("/travels"))
        .catch((err) => next(err));
    }
  }
);

router.get("/travels/:id/details", (req, res, next) => {
 const { id } = req.params;
  Travel.findById(id)
    .then((travels) => {
      res.render("travels/travel-details", travels);
    })
    .catch((err) => next(err));

});




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
