// TRIP LIST

var tripsListCallback = function(response) {
  console.log(response);
  $('#trips-list thead tr').append("<th>Name</th><th>Number of Weeks</th>");
  var tripsListTemplate = _.template($('#trips-list-template').html());
  for ( i = 0; i < response.length; i++){
    var newTripRow = tripsListTemplate({
      trip: response[i]
    });
   $('#trips-list tbody').append($(newTripRow));
  }

  // would do this dynamically but because of the number of fake trips and fake contients, creating this manually
  var continents = ["Africa", "Asia", "Australasia", "Europe", "South America", "North America", "Antarctica"];
  createContinentFilters(continents);
};

var tripsListClickHandler = function() {
  $('.clear').empty();
  url = "https://trektravel.herokuapp.com/trips";
  $.get(url, tripsListCallback).fail(failureCallback);
};

// TRIP DETAILS

var tripDetailsCallback = function(response) {
  var tripDetailsTemplate = _.template($('#trip-details-template').html());
  var tripDetails = tripDetailsTemplate({
      trip: response
    });
   $('#trip-details').append($(tripDetails));
 };

var tripDetailsClickHandler = function() {
  url = "https://trektravel.herokuapp.com/trips/" + $(this).attr('id');
  $.get(url, tripDetailsCallback).fail(failureCallback);
  $('.clear').empty();
};

// RESERVE TRIP

var reservationCallback = function(){
  $('.clear-form').empty();
  $("#messages").html("<h3>Reservation complete!</h3>");
};

var reservationClickHandler = function(e) {
    e.preventDefault();
    var url = $('form').attr("action");
    var formData = $('form').serialize();
    $.post(url, formData, reservationCallback).fail(failureCallback);
};

// CONTINENT FILTER
var createContinentFilters = function(continentsArray){
  // may need to create template for header to avoid duplicate. Add clear class
  $('#trip-filters').append("<h4>Filter by Contient<h4>");
  var continentFilterTemplate = _.template($('#continent-filter-template').html());
  for ( i = 0; i < continentsArray.length; i++){
    var newContinentFilter = continentFilterTemplate({
      continent: continentsArray[i]
    });
    console.log(continentsArray[i]);
   $('#trip-filters').append($(newContinentFilter));
  }
};

// var continentFilterCallback = function(){
//   console.log("In the continent filter callback! wooo");
// };

var continentFilterClickHandler = function(){
  console.log($(this));
  url = "https://trektravel.herokuapp.com/trips/continent?query=" + $(this).attr('id');
  $.get(url,tripsListCallback).fail(failureCallback);
  $('.clear').empty();
};


// FAIL

var failureCallback = function() {
  $("#messages").html("<h3>Request failed</h3>");
  console.log("Didn't Work! :(");
};

// DOCUMENT READY

$(document).ready(function() {
  $('#list-trips-btn').click(tripsListClickHandler);
  $('body').on('click', '#reserve', reservationClickHandler);
  $('body').on('click', '.trip-details-btn', tripDetailsClickHandler);
  $('body').on('click', '.continent-filter', continentFilterClickHandler);
});
