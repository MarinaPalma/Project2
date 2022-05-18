const router = require("express").Router();
const Travel = require("../models/travel.model");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const axios = require("axios");

router.get("/travels", (req, res, next) => {
  User.findById(req.session.user._id)
    .populate("travels")
    .then((currentUser) => {
      res.render("travels/travel-list", { travels: currentUser.travels });
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

router.get("/travels-search", (req, res, next) => {
  const { country, year} = req.query;
  console.log(req.query)

  if(!country){
    Travel.find({
      author: req.session.user._id,
      year: year
    }).then((foundedCountries) => {
      console.log(foundedCountries);
      res.render("travels/travel-list", { travels: foundedCountries });
    });
  } else if(!year) {
    Travel.find({
      author: req.session.user._id,
      country: { $regex: country, $options: "i" },
    }).then((foundedCountries) => {
      console.log(foundedCountries);
      res.render("travels/travel-list", { travels: foundedCountries });
    });
  } else {
    Travel.find({
      author: req.session.user._id,
      country: { $regex: country, $options: "i" },
      year: year
    }).then((foundedCountries) => {
      console.log(foundedCountries);
      res.render("travels/travel-list", { travels: foundedCountries });
    });
  }
});



router.post(
  "/travels/:id/photos",
  fileUploader.array("travel-image", 10),
  (req, res, next) => {
    const newPhotos = [];
    let currentPhotos;
    const { id } = req.params;

    req.files.forEach((file) => {
      newPhotos.push(file.path);
    });

    Travel.findById(id)
      .then((originalTravel) => {
        return (currentPhotos = originalTravel.imageUrl);
      })
      .then(() => {
        const allPhotos = [...currentPhotos, ...newPhotos];
        return Travel.findByIdAndUpdate(
          id,
          { imageUrl: allPhotos },
          { new: true }
        );
      })

      .then((updatedTravel) => {
        console.log(updatedTravel);
        res.redirect(`/travels/${id}/details`);
      });
  }
);

//Add API country flag when creating a travel

router.post(
  "/travels/create",
  fileUploader.single("travel-image"),
  (req, res, next) => {
    const { title, country, city, month, year, description } = req.body;
    const userId = req.session.user._id;

    let flag;
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)

      .then((country) => {
        flag = country.data[0].flags.png;
      })
      .then(() => {
        if (req.file) {
          Travel.create({
            title,
            country,
            countryFlag: flag,
            city,
            author: userId,
            month,
            year,
            description,
            imageUrl: req.file.path,
          })
            .then((createdTravel) => {
              return User.findByIdAndUpdate(
                userId,
                { $push: { travels: createdTravel._id } },
                { new: true }
              ).then((updatedUser) => {
                console.log(updatedUser);
                res.redirect("/travels");
              });
            })
            .catch((err) => next(err));
        } else {
          Travel.create({
            title,
            country,
            city,
            month,
            year,
            countryFlag: flag,
            description,
          })
            .then(() => res.redirect("/travels"))
            .catch((err) => next(err));
        }
      });
  }
);

router.get("/travels/:id/details", (req, res, next) => {
  const { id } = req.params;

  Travel.findById(id)
    .then((travel) => {
      res.render("travels/travel-details", travel);
    })
    .catch((err) => next(err));
});

// router.get("/travels/:id/details", (req, res, next) => {
//   const { id } = req.params;
//   let travel;
//   Travel.findById(id)
//     .then((foundedTravel) => {
//       return (travel = foundedTravel);
//     })
//     .then(() => {
//       const countryName = travel.country.toLowerCase();

//       return axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
//     })
//     .then((country) => {
//       const flag = country.data[0].flags.png;
//       console.log(country.data[0].flags.png);
//       res.render("travels/travel-details", { travel, flag });
//     })

//     .catch((err) => next(err));
// });

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
  async (req, res, next) => {
    const { id } = req.params;
    const { title, country, city, month, year, description } = req.body;

    let response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );
    let flag = response.data[0].flags.png;

    if (req.file) {
      Travel.findByIdAndUpdate(id, {
        title,
        country,
        countryFlag: flag,
        city,
        month,
        year,
        description,
        imageUrl: req.file.path,
      })
        .then(() => res.redirect("/travels"))
        .catch((err) => next(err));
    } else {
      return Travel.findByIdAndUpdate(id, {
        title,
        country,
        city,
        month,
        year,
        countryFlag: flag,
        description,
      })
        .then(() => res.redirect("/travels"))
        .catch((err) => next(err));
    }
  }
);

//Delete photos by pull method because is an array
router.post("/travels/:id/photos/delete", (req, res, next) => {
  const { id } = req.params;
  const { image } = req.body;
  Travel.findByIdAndUpdate(id, { $pull: { imageUrl: image } })
    .then(() => res.redirect(`/travels/${id}/details`))
    .catch((err) => next(err));
});

router.post("/travels/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Travel.findByIdAndRemove(id)
    .then(() => res.redirect("/travels"))
    .catch((err) => next(err));
});

module.exports = router;
