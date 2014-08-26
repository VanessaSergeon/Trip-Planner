$(document).ready(function() {

  var map;
  var numDays = 0;
  var dayArray = [];
  var currentDayIndex;
  var currentDay;

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
    this.thingsToDo = [];
    this.restaurants = [];
    this.hotelCount = 0;
    this.thingsCount = 0;
    this.restaurantsCount = 0;
    this.markers = [];
  }

  Day.prototype.clearMarkers = function() {
    for(var i = 0; i < this.markers.length; i++) {
      markers[i].setMap(null);
    }
  };

  Day.prototype.putMarkersOnMap = function() {
    for(var i = 0; i < this.markers.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.markers[i][0], this.markers[i][1]),
        animation: google.maps.Animation.DROP,
        map: map
        // title: title
      });
    }
  };

  // Day.prototype.getLatLng = function() {};
  Day.prototype.renderDay = function(id) {
    var currentId = id;
    $('#plan').empty();

    var thingsToDoList;
    for(var j = 0; j < this.thingsToDo.length; j++) {
      thingsToDoList += '<li>' + this.thingsToDo[j] + '<li>';
    }
    var restaurantsList;
    for(var n = 0; n < this.restaurants.length; n++) {
      restaurantsList += '<li>' + this.restaurants[n] + '<li>';
    }
    var plan = '<h3>Plan for Day ' + currentId + '</h3>';
    plan += '<h4>Hotel</h4><ul>';
    plan += '<li>' + this.hotel + '</li>';
    plan += '</ul><h4>Things to do</h4><ul>'
    plan += thingsToDoList;
    plan += '</ul><h4>Restaurants</h4><ul>';
    plan += restaurantsList;
    plan += '</ul>';

    $('#plan').append(plan);

    this.putMarkersOnMap();
  };


  // ******* ADD DAY BUTTON *******


  $('#newDay').click(function() {
    var id = numDays++
    var dayButton = '<li><a id="'+numDays+'" href="#">Day '+numDays+'</a></li>';
    $('#tripDays').append(dayButton);
    dayArray.push(day = new Day());

    writeDayToDatabase(id);

    $('a').on('click', function() {
      currentDayIndex = parseInt(this.id)-1;
      currentDay = dayArray[currentDayIndex];
      console.log('this is the index number of day', currentDayIndex);
      currentDay.renderDay(this.id);
    });

    console.log(this.id)
    var currentDayIndex = id;
    currentDay = dayArray[currentDayIndex];
    currentDay.renderDay(id);
    // putMarkersOnMap();
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

  $(".addBtn").on('click',function() {

    event.preventDefault();
    var $this = $(this);

    var matchingSelectName = $this.attr('data-select');
    var matchingSelect = selects[matchingSelectName];
    var selected = matchingSelect.val();
      // selected is the id number
    var longitude = data[matchingSelectName][selected].place[0].location[0];
    var latitude = data[matchingSelectName][selected].place[0].location[1];
    var title = data[matchingSelectName][selected].name;

    var activityLocation = [longitude, latitude]
    dayArray[numDays-1].markers.push(activityLocation);

    var planItem = data[matchingSelectName][selected].name;

    if(($this.attr('data-select') == "hotels") && (currentDay.hotelCount === 0)) {
      currentDay.hotelCount++;
      currentDay.hotel.push(title);
    }
    if(($this.attr('data-select') == "thingsToDo") && (currentDay.thingsCount < 3)) {
      currentDay.thingsCount++
      currentDay.thingsToDo.push(title);
    }
    if(($this.attr('data-select') == "restaurants") && (currentDay.restaurantsCount < 3)) {
      currentDay.restaurantsCount++;
      currentDay.restaurants.push(title);
    }

    console.log('this should be activity id:', selected);
    console.log('this should be day index:', currentDayIndex);
    console.log('this should be activity type:', matchingSelectName);

    addActivityToDay(selected, currentDay._id, matchingSelectName);

  }); // addBtn click event


  // ******* AJAX *******


  function writeDayToDatabase(day_number) {

    var post_callback = function (dbDay) {
      //... what to do when done...
      dayArray[dayArray.length-1]._id = dbDay._id;
    };

    // jQuery Ajax call
    $.post( "/days", day_number, post_callback);

  } // end writeDayToDatabase

  function addActivityToDay(attraction_id, dayId, type_of_place) {
    var post_data = {
      dayId: dayId,
      attraction_id: attraction_id,
      attraction_type: type_of_place
    };

    // the callback function below will be called if this request completes successfully.
    // the server's response to this request is passed into this callback function as "responseData"

    var post_callback = function (responseData) {
      //... what to do when done...
      alert(responseData);
    };

    // jQuery Ajax call
    $.post( "/days/" + dayId + "/attractions", post_data, post_callback);
  } // end addActivityToDay


  // ******* GOOGLE MAP *******
  function initialize() {
    var Fullstack = new google.maps.LatLng(40.716916, -73.995402);
    var mapOptions = {
      center: Fullstack,
      zoom: 13
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  } // initialize
  google.maps.event.addDomListener(window, 'load', initialize);


}); // document on ready

