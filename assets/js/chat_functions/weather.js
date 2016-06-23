$( function() {
  "use strict";

  $( ".textBox" ).off().on("keydown", function(e) {
    if(e.which === 13) {
      e.preventDefault();
      $( ".sendButton" ).click();
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
      DISPLAY WUNDERGROUND
    *******************************************************************/

      if( userMessage[0].toLowerCase() === "@weather" ) {
        $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessageUnsplit ).appendTo( "main" );
        console.log( userMessage );
        $( ".textBox" ).focus();
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
          weatherCity = userMessage[1];
          weatherState = userMessage[2];
        }
      } // end if

      else {
        console.log( "Else entered" );
        weatherCity = userMessage[1] + ",";
        weatherState = userMessage[2];
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
  })// end click event
}) // end outer function
