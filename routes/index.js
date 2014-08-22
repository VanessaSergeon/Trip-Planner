var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', [
  function(req, res, next) {
    models.Hotel.find(function(err, hotels) {
      res.locals.hotels = hotels;
      next();
    });
  },
  function(req, res, next) {
    models.Restaurant.find(function(err, restaurants) {
      res.locals.restaurants = restaurants;
      next();
    });
  },
  function(req, res, next) {
    models.ThingsToDo.find(function(err, thingsToDos) {
      res.locals.thingsToDos = thingsToDos;
      next();
    });
  },
  function(req, res, next) {
    res.render('index');
  }
]);

module.exports = router;


// router.get('/', function(req, res) {
//   models.Hotel.find(function(err, hotels) {
//   models.Restaurant.find(function(err, restaurants) {
//   models.ThingsToDo.find(function(err, thingsToDos) {
//     res.render('index', { hotels: hotels,
//                           restaurants: restaurants,
//                           thingsToDos: thingsToDos,
//                           title: "Trip Planner" });
//       });
//     });
//   });
// });