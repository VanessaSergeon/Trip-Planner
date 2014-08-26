var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripplanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Schema = mongoose.Schema;

var placeSchema = new Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number, Number]
});

var hotelSchema = new Schema({
  name: String,
  place: [placeSchema],
  num_stars: Number,
  amenities: String,
});

var thingsToDoSchema = new Schema({
  name: String,
  place: [placeSchema],
  age_range: String,
});

var restaurantSchema = new Schema({
  name: String,
  place: [placeSchema],
  cuisine: String,
  price: Number,
});

var daySchema = new Schema({
  day_number: Number,
  hotels: [{ type: Schema.Types.ObjectId, ref:"Hotel" }],
  restaurants: [{ type: Schema.Types.ObjectId, ref:"Restaurant" }],
  thingsToDo: [{ type: Schema.Types.ObjectId, ref:"ThingsToDo" }]
});


var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingsToDo= mongoose.model('ThingsToDo', thingsToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);
var Day = mongoose.model('Day', daySchema);

module.exports = {"Place": Place, "Hotel": Hotel, "ThingsToDo": ThingsToDo, "Restaurant": Restaurant, "Day": Day};






