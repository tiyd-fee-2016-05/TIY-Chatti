$( function() {
  "use strict";



$( ".sendButton" ).on( "click", function() {
  var userMessage = $('.textBox[name="message"]').val().split( " " );
  // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
  $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
  console.log( userMessage );
/*******************************************************************
  DISPLAY FOURSQUARE RESTAURANT
*******************************************************************/

  if( userMessage[0].toLowerCase() === "@fs" ) {
  console.log( "Entering FourSquare" );
  var location = userMessage[1];
  var cuisine = userMessage[2];
  console.log( location );
  console.log( cuisine );

  // setting up values to pass foursquare in ajax call
  var params = {
    client_id: "JFJKRIE3BWM34PK0MJARBNJ3DAW4WFPQHV1BUC4I0T1NCOR2",
    client_secret: "URVQR5M1H0STFSZXYOF5EULRQ4EJRATZAXVEK2N3YM402RSR",
    v: 20130815,
    ll: "40.7,-74",
    near: location,
    query: cuisine
  }; // end params

  // begin foursquare GET request
  $.ajax( {
    datatype: "json",
    url: "https://api.foursquare.com/v2/venues/search",
    method: "GET",
    data: params // params defined above
  } ) // end ajax GET request

  // if request is successful
  .done( function(data) {
    $( "<div></div>" ).attr( "class", "botTalkBubble" ).text( "You should try: " +
    data.response.venues[0].name + " at " +
    data.response.venues[0].location.address ).appendTo( "main" );
    $( ".textBox" ).val( "" );
  }) // end done()
} // end else if foursquare
})
}) // end outmost function
