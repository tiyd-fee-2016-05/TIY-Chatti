$( function() {
  "use strict";

  $( ".sendButton" ).on( "click", function() {
  var userMessage = $('.textBox[name="message"]').val().split( " " );
  // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
  $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
  console.log( userMessage );
/*******************************************************************
  DISPLAY WUNDERGROUND
*******************************************************************/
// setting up values to pass meetup in ajax call

if( userMessage[0].toLowerCase() === "@weather" ) {
  console.log( "wunderground called" );
  // $( "main" ).css( "background-color", userMessage[1] );
  // $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "Here's your weather: " ).appendTo( "main" );
  $( ".textBox" ).val( "" ); // reset textbox to placeholder value


var params = {
  // features:conditions,
  query:userMessage[0],

}; // end params

$.ajax( {
  datatype: "json",
  // url:"http://api.wunderground.com/api/a4a7ba047e303c3b/alerts/q/IA/Des_Moines.json"
  url: "http://api.wunderground.com/api/a4a7ba047e303c3b/conditions/q/" + userMessage[1] + ".json",
  // url: "http://autocomplete.wunderground.com/aq?query=",
  // url: "http://api.wunderground.com/api/a4a7ba047e303c3b/features/q/query.format",
  // url: "http://api.wunderground.com/api/a4a7ba047e303c3b/features/q/query",
  method: "GET",
  data: params // params defined above
} ) // end ajax GET request

// if request is successful


.done( function(data) {
  var tempFeelsLike = data.current_observation.feelslike_string;
  var weatherIcon = $( "<img>" ).attr( "src", data.current_observation.icon_url);
  var weatherSting = $( "<div></div>" ).attr( "class", "botTalkBubble" ).text( "Here's your weather: " + tempFeelsLike);

  weatherSting.prepend(weatherIcon).appendTo('main');
  $( ".textBox" ).val( "" );
  console.log(data.current_observation.feelslike_string
  );
}) // end done()

} //end else if wunderground

})
})// end outmost function
