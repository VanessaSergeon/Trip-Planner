$(document).ready(function() {

  var map;

  var hotelObj = {};
  for(var i = 0; i < all_hotels.length; i++){
    hotelObj[all_hotels[i]._id] = all_hotels[i];
  }

  var thingsToDoObj = {};
  for(var i = 0; i < all_things_to_do.length; i++){
    thingsToDoObj[all_things_to_do[i]._id] = all_things_to_do[i];
  }

  var restaurantsObj = {};
  for(var i = 0; i < all_restaurants.length; i++){
    restaurantsObj[all_restaurants[i]._id] = all_restaurants[i];
  }

  // ******* DAY PLAN *******

  function Day() {
    this.hotel =[];
    this.hotelCount = 0;
    this.thingsToDo =[];
    this.thingsCount = 0;
    this.restaurants =[];
    this.restaurantsCount = 0;
  }


  // ******* ADD DAY BUTTON *******

  var numDays = 0;
  var dayArray = [];

  $('#newDay').click(function() {
    numDays++
    var dayButton = '<li><a href="#">Day '+numDays+'</a></li>';
    $('#tripDays').append(dayButton);
    dayArray.push(day = new Day());
    console.log("this is the day array", dayArray)
  });


  // ******* ADD PIN TO GOOGLE MAP *******

  var selects = {
    hotels: $("#hotelDropdown"),
    thingsToDo: $("#toDoDropdown"),
    restaurants: $("#restaurantDropdown")
  };

  var data = {
    hotels: hotelObj,
    thingsToDo: thingsToDoObj,
    restaurants: restaurantsObj
  };

    // var countHotel = 0;
    // var countThings = 0;
    // var CountRestaurants = 0;

  $(".addBtn").on('click',function() {

    event.preventDefault();
    var $this = $(this);

    var matchingSelectName = $this.attr('data-select');
    var matchingSelect = selects[matchingSelectName];
    var selected = matchingSelect.val();

    var longitude = data[matchingSelectName][selected].place[0].location[0];
    var latitude = data[matchingSelectName][selected].place[0].location[1];
    var title = data[matchingSelectName][selected].name;

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(longitude, latitude),
      animation: google.maps.Animation.DROP,
      map: map,
      title: title
    });

    var planItem = data[matchingSelectName][selected].name;

    if(($this.attr('data-select') == "hotels") && (dayArray[numDays-1].hotelCount === 0)) {
      $('#hotelList').append('<li>' + planItem + '</li>');
      // countHotel++
      dayArray[numDays-1].hotelCount++;
      dayArray[numDays-1].hotel.push(selected);
    }
    if(($this.attr('data-select') == "thingsToDo") && (dayArray[numDays-1].thingsCount < 3)) {
      $('#thingsList').append('<li>' + planItem + '</li>')
      // countThings++
      dayArray[numDays-1].thingsCount++;
      dayArray[numDays-1].thingsToDo.push(selected);
    }
    if(($this.attr('data-select') == "restaurants") && (dayArray[numDays-1].restaurantsCount < 3)) {
      $('#restaurantsList').append('<li>' + planItem + '</li>')
      // CountRestaurants++
      dayArray[numDays-1].restaurantsCount++;
      dayArray[numDays-1].restaurants.push(selected);
    }

  }); // addBtn click event


  // ******* GOOGLE MAP *******
  function initialize() {
    var Fullstack = new google.maps.LatLng(40.716916, -73.995402);
    var mapOptions = {
      center: Fullstack,
      zoom: 13
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({
      position: Fullstack,
      map: map,
      title: "Fullstack Academy!"
    });
  } // initialize
  google.maps.event.addDomListener(window, 'load', initialize);


}); // document on ready

