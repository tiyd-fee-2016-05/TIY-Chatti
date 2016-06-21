$( function() {
  "use strict";

  $( ".sendButton" ).on( "click", function() {
    var userMessage = $('.textBox[name="message"]').val().split( " " );
    // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
    $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
    console.log( userMessage );

    /*******************************************************************
      CHANGE BACKGROUND-COLOR
    *******************************************************************/

    if( userMessage[0].toLowerCase() === "@bg" ) {
      console.log( "Entering background-color" );
      $( "main" ).css( "background-color", userMessage[1] );
      $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "Excellent color choice!" ).appendTo( "main" );
      $( ".textBox" ).val( "" ); // reset textbox to placeholder value
    }

    /*******************************************************************
      DISPLAY FOURSQUARE RESTAURANT
    *******************************************************************/

    else if( userMessage[0].toLowerCase() === "@fs" ) {
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

    /*******************************************************************
      DISPLAY WUNDERGROUND
    *******************************************************************/

    else if( userMessage[0].toLowerCase() === "@weather" ) {
      console.log( "Entering Wunderground" );

      // begin foursquare GET request
      $.ajax( {
        datatype: "json",
        url: "http://api.wunderground.com/api/a4a7ba047e303c3b/conditions/q/" + userMessage[1] + ".json",
        method: "GET",
      } ) // end ajax GET request

      // if request is successful
      .done( function(data) {
        var currentTemp = data.current_observation.feelslike_string;
        // var currentIcon = data.current_observation.icon;
        var weatherIcon = $( "<img>" ).attr( "src", data.current_observation.icon_url );
        console.log( "http://api.wunderground.com/api/a4a7ba047e303c3b/conditions/q/" + userMessage[1] + ".json" );
        console.log( currentTemp );
        console.log( data.current_observation.icon_url );
        var weatherString = $( "<div></div>" ).attr( "class", "botTalkBubble" ).text( "You weather is comfortable " + currentTemp + " ");
        weatherString.prepend( weatherIcon ).appendTo( "main" );
        $( ".textBox" ).val( "" );
      }) // end done()
    } // end else if wunderground

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
  }); // end event submit
}) // end outmost function
