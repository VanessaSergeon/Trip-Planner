var express = require('express');
var router = express.Router();
var models = require('../models');


router.post('/', function(req, res) {
  //...create day...
  var day_number = req.body.day_number;
  var newDay = new models.Day({"day_number": day_number});
  newDay.save();
  res.send('success, a new day schema has been creaated');
});

router.post('/:dayId/attractions', function(req, res) {
  // ...add an attraction to day...
  var hotels = req.body.hotels;
  var restaurants = req.body.restaurants;
  var thingsToDo = req.body.thingsToDo;
});

router.get('/', function(req, res) {
  //...list all days...
});

module.exports = router;
