$(document).ready(function() {
  // ADD DAY BUTTON
  var numDays = 0;
  $('#newDay').click(function() {
    numDays++
    var dayButton = '<button class="btn btn-primary">Day '+numDays+'</button>';
    $('#tripDays').append(dayButton);
  });

});