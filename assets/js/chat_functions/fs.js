$( function() {
  "use strict";

  $( ".textBox" ).keypress( function(e) {
    if(e.which == 13) {
      $( ".sendButton" ).click();
      e.preventDefault();
    }
  }); // end enter keypress event

  $

  $( ".sendButton" ).on( "click", function(e) {
    e.preventDefault();

    var randomNum = Math.floor( (Math.random() * 10) + 1 );
    var userMessage = $('.textBox[name="message"]').val().split( " " );
    var userMessageUnsplit = $('.textBox[name="message"]').val();
    // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery

    /*******************************************************************
      DISPLAY FOURSQUARE RESTAURANT
    *******************************************************************/

    if( userMessage[0].toLowerCase() === "@fs" ) {
    $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessageUnsplit ).appendTo( "main" );
    console.log( userMessage );
    $( ".textBox" ).focus();
    console.log( "Entering FourSquare" );
    var location;
    var cuisine;

    if( !userMessage[1].includes( "," ) ) {
      location = userMessage[1] + "," + userMessage[2];
      cuisine = userMessage[3];
    }

    else if( userMessage[1].includes( "," ) && userMessage.length !== 4 ) {
      location = userMessage[1];
      cuisine = userMessage[2];
      console.log( location );
      console.log( cuisine );
    }

    else if( userMessage[1].includes( "," ) && userMessage.length === 4 ){
      location = userMessage[1] + userMessage[2];
      cuisine = userMessage[3];
      console.log( "Third case entered" );
      console.log( location );
      console.log( cuisine );
    }

    else {
      console.log( "Whatever" );
    }

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
      data.response.venues[randomNum].name + " at " +
      data.response.venues[randomNum].location.address ).appendTo( "main" );

      // thank you http://www.electrictoolbox.com/jquery-scroll-bottom/ for your help
      $('main').animate( {scrollTop:$(document).height()}, 'slow' );
      $( ".textBox" ).val( "" );
    }) // end done()
  } // end else if foursquare
}) // end click event
})
