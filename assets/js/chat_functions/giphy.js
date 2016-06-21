$( function() {
  "use strict";

/*******************************************************************
  DISPLAY GIPHY
*******************************************************************/

else if( userMessage[0].toLowerCase() === "@giphy" ) {
  console.log( "Entering giphy" );

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
    $( ".textBox" ).val( "" );
  }) // end done()
} // end else if giphy
}) // end outmost function
