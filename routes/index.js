var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res) {
  models.Hotel.find(function(err, hotels) {
  models.Restaurant.find(function(err, restaurants) {
  models.ThingsToDo.find(function(err, thingsToDos) {
    res.render('index', { hotels: hotels,
                          restaurants: restaurants,
                          thingsToDos: thingsToDos,
                          title: "Trip Planner" });
      })
    })
  });
});

module.exports = router;
