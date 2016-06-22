$( function() {
  "use strict";

  $( document ).ready( function() {
    $( ".textBox" ).focus();
  });

  /*
    thank you https://api.jquery.com/keydown/, for your help on this event.
    if enter is pressed, it will trigger the .sendButton click
  */

  $( ".textBox" ).keypress( function(e) {
    if(e.which == 13) {
      $( ".sendButton" ).click();
      e.preventDefault();
    }
  }); // end enter keypress event

  $( ".sendButton" ).on( "click", function(e) {
    e.preventDefault();

    var randomNum = Math.floor( (Math.random() * 10) + 1 );
    var userMessage = $('.textBox[name="message"]').val().split( " " );
    var userMessageUnsplit = $('.textBox[name="message"]').val();
    // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
    $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessageUnsplit ).appendTo( "main" );
    console.log( userMessage );
    $( ".textBox" ).focus();

    /*******************************************************************
      CHANGE BACKGROUND-COLOR
    *******************************************************************/

    if( userMessage[0].toLowerCase() === "@bg" ) {
      console.log( "Entering background-color" );
      $( "main" ).css( "background-color", userMessage[1] );
      $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "Excellent color choice!" ).appendTo( "main" );
      $( ".textBox" ).val( "" ); // reset textbox to placeholder value

      // thank you http://www.electrictoolbox.com/jquery-scroll-bottom/ for your help
      $( 'main' ).animate( {scrollTop:$(document).height()}, 'slow' );
    }

    /*******************************************************************
      DISPLAY FOURSQUARE RESTAURANT
    *******************************************************************/

    else if( userMessage[0].toLowerCase() === "@fs" ) {
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

    /*******************************************************************
      DISPLAY WUNDERGROUND
    *******************************************************************/

    else if( userMessage[0].toLowerCase() === "@weather" ) {
      console.log( "Entering Wunderground" );
      var weatherCity;
      var weatherState;

      if( userMessage[1].includes( "," ) ) {
        console.log( "comma in string" );
        console.log( userMessage[1].substr( 0, userMessage[1].length - 1 ));
        if( userMessage.length == 2 ) {
          var locationNoComma = userMessage[1].split( "," );
          console.log( locationNoComma );
          weatherCity = locationNoComma[0];
          weatherState = locationNoComma[1];
        }

        else {
          var weatherCity = userMessage[1];
          var weatherState = userMessage[2];
        }
      } // end if

      else {
        console.log( "Else entered" );
        var weatherCity = userMessage[1] + ",";
        var weatherState = userMessage[2];
      }

      // begin foursquare GET request
      $.ajax( {
        datatype: "json",
        url: "http://api.wunderground.com/api/a4a7ba047e303c3b/conditions/q/" + weatherState + "/" + weatherCity + ".json",
        method: "GET",
      } ) // end ajax GET request

      // if request is successful
      .done( function(data) {
        var currentTemp = data.current_observation.feelslike_string;
        var weatherIcon = $( "<img>" ).attr( "src", data.current_observation.icon_url ).addClass( "weatherIcon");
        console.log( "http://api.wunderground.com/api/a4a7ba047e303c3b/conditions/q/" + userMessage[1] + ".json" );
        console.log( currentTemp );
        console.log( data.current_observation.icon_url );
        var weatherString = $( "<div></div>" ).attr( "class", "botTalkBubble" ).text( "Your weather is a comfortable " + currentTemp + " ");
        weatherString.prepend( weatherIcon ).appendTo( "main" );

        // thank you http://www.electrictoolbox.com/jquery-scroll-bottom/ for your help
        $('main').animate( {scrollTop:$(document).height()}, 'slow' );
        $( ".textBox" ).val( "" );
      }) // end done()
    } // end else if wunderground

    /*******************************************************************
      DISPLAY GIPHY
    *******************************************************************/

    else if( userMessage[0].toLowerCase() === "@giphy" ) {
      console.log( "Entering giphy" );

      var desiredGiphy;

      if( userMessage.length > 2 ) {
        for( var index = 1; index < userMessage.length; index++ ) {
          desiredGiphy += userMessage[index] + "+";
          console.log( userMessage[index] );
        }
        console.log( desiredGiphy.length - 1 );
      }

      else {
        desiredGiphy = userMessage[1];
      }

      // begin giphy GET request
      $.ajax( {
        dataType: "json",
        url: "http://api.giphy.com/v1/gifs/search?q=" + desiredGiphy + "&api_key=dc6zaTOxFJmzC",
        method: "GET"
      } ) // end ajax GET request

      // if request is successful
      .done( function(data) {
        var giphyImg = $( "<img>" ).attr( "src", data.data[randomNum].images.fixed_height.url );
        console.log( giphyImg );
        $( "<div></div>" ).attr( "class", "botTalkBubble" ).html( giphyImg ).appendTo( "main" );

        // thank you http://www.electrictoolbox.com/jquery-scroll-bottom/ for your help
        $('main').animate( {scrollTop:$(document).height()}, 'slow' );
        $( ".textBox" ).val( "" );
      }) // end done()
    } // end else if giphy
  }); // end event submit
}) // end outmost function
