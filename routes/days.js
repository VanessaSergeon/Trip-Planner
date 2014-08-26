var express = require('express');
var router = express.Router();
var models = require('../models');


router.post('/', function(req, res) {
  var day_number = req.body.day_number;
  var newDay = new models.Day({"day_number": day_number});
  newDay.save(function(err, day) {
    res.json(day);
  });
});

router.post('/:dayId/attractions', function(req, res) {
  var activityId = req.body.attraction_id;
  var dayId = req.body.dayId;
  var activityType = req.body.attraction_type;

  models.Day.findOne({"_id": dayId}, function(err, day) {
    console.log(err);
    day[activityType].push(activityId);
    day.save(function(err, day) {
      res.json(day);
    });
  });

  res.send('info was sent to the back end');
});

router.get('/', function(req, res) {
  //...list all days...
});

module.exports = router;
