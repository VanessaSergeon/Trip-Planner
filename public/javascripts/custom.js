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


  // ******* ADD DAY BUTTON *******
  var numDays = 0;
  $('#newDay').click(function() {
    numDays++
    var dayButton = '<li><a href="#">Day '+numDays+'</a></li>';
    $('#tripDays').append(dayButton);
  });


  // ******* DAY PLAN *******

  // wont work because option values have been changed from name to id
    // var counter = 0;
    // $('#addHotel').click(function() {
    //   event.preventDefault();
    //   if(counter === 0) {
    //     var dayHotel = $('#hotelDropdown').val();
    //     $('#hotelList').append('<li>' + dayHotel + '</li>')
    //     counter++;
    //   } else { alert('You can only stay in one hotel per day.');}
    // });

    // var counter2 = 0
    // $('#addThing').click(function() {
    //   event.preventDefault();
    //   if(counter2 < 3) {
    //     var dayThing = $('#toDoDropdown').val();
    //     $('#thingsList').append('<li>' + dayThing + '</li>')
    //     counter2++;
    //   } else { alert('You can see 3 sites per day.');}
    // });

    // var counter3 = 0;
    // $('#addRestaurant').click(function() {
    //   event.preventDefault();
    //   if(counter3 < 3) {
    //     var dayRestaurant = $('#restaurantDropdown').val();
    //     $('#restaurantsList').append('<li>' + dayRestaurant + '</li>')
    //     counter3++;
    //   } else { alert('You can only eat at 3 restaurants per day.');}
    // });


  // ******* ADD PIN TO GOOGLE MAP *******


  var selects = {
    hotels: $("#hotelDropdown"),
    thingsToDo: $("#toDoDropdown"),
    restaurants: $("#restaurantDropdown")
  };

  //ZN
  var data = {
    hotels: hotelObj,
    thingsToDo: thingsToDoObj,
    restaurants: restaurantsObj
  };

    var countHotel = 0;
    var countThings = 0;
    var CountRestaurants = 0;

  $(".addBtn").on('click',function() {

    event.preventDefault();
    var $this = $(this);

    var matchingSelectName = $this.attr('data-select');
    var matchingSelect = selects[matchingSelectName];
    var selected = matchingSelect.val();

    var longitude = data[matchingSelectName][selected].place[0].location[0];
    var latitude = data[matchingSelectName][selected].place[0].location[1];
    var title = data[matchingSelectName][selected].name;
      console.log("this is the location:", longitude);
      console.log("this is the location:", latitude);
      console.log("this is the name:", title);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(longitude, latitude),
      animation: google.maps.Animation.DROP,
      map: map,
      title: title
    });

    var planItem = data[matchingSelectName][selected].name;

    console.log("should be type of list item", data[matchingSelectName]);

    if(($this.attr('data-select') == "hotels") && (countHotel === 0)) {
      $('#hotelList').append('<li>' + planItem + '</li>');
      countHotel++
    }
    if(($this.attr('data-select') == "thingsToDo") && (countThings < 3)) {
      $('#thingsList').append('<li>' + planItem + '</li>')
      countThings++
    }
    if(($this.attr('data-select') == "restaurants") && (CountRestaurants < 3)) {
      $('#restaurantsList').append('<li>' + planItem + '</li>')
      CountRestaurants++
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

