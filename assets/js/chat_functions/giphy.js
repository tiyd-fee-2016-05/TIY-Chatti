$( function() {
  "use strict";

  $( ".sendButton" ).on( "click", function() {
  var userMessage = $('.textBox[name="message"]').val().split( " " );
  // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery

/*******************************************************************
  DISPLAY GIPHY
*******************************************************************/

if( userMessage[0].toLowerCase() === "@giphy" ) {
  $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
  console.log( userMessage );
  console.log( "user entered giphy" );
  // begin giphy GET request
  $.ajax( {
    dataType: "json",
    url: "http://api.giphy.com/v1/gifs/search?q=" + userMessage[1] + "&api_key=dc6zaTOxFJmzC",
    method: "GET"
  } ) // end ajax GET request

  // if request is successful
  .done( function(data) {
    var giphyImg = $( "<img>" ).attr( "src", data.data[0].images.fixed_height.url );
    console.log( giphyImg );
    $( "<div></div>" ).attr( "class", "botTalkBubble" ).html( giphyImg ).appendTo( "main" );
    $( ".textBox" ).val( "" ); // reset textbox to placeholder value
  }) // end done()
} // end else if giphy
})
}) // end outmost function
