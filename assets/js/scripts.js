$( function() {
  "use strict";

  $( ".sendButton" ).on( "click", function() {
    var userMessage = $('.textBox[name="message"]').val().split( " " );
    // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
    $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
    console.log( userMessage );

    // *******************************************************************
    //                 @HELP message
    // *******************************************************************/

    if( userMessage[0].toLowerCase() === "@help" ) {
      console.log( "@help was entered" );
      // $( "main" ).css( "background-color", userMessage[1] );
      $( "<div></div>" ).attr( "class", "botTalkBubble" ).html( "You can type in:<br>@giphy [topic] <br>@weather [state/city] <br> @fs [type of cuisine]<br>@bg [color]" ).appendTo( "main" );
      $( ".textBox" ).val( "" ); // reset textbox to placeholder value
    }


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
    // setting up values to pass meetup in ajax call

    else if( userMessage[0].toLowerCase() === "@weather" ) {
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
/////////////////////////////////////////////////////////
// $( ".sendButton" ).on( "click", function() {
//   var userMessage = $('.textBox[name="message"]').val().substr(4);
//   // var prefix = userMessage.substr(0, 6);
//
//
//     $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
//
//   console.log( userMessage );
//
//
//   var space = userMessage.indexOf(" ");
//   var prefix = userMessage.substr(0,3);
//   console.log( prefix );
//   // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
//   // $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
//   // if( prefix.toLowerCase() === "@giphy" ) {
//
//   // GIPHY CALL
//   $.ajax({
//       dataType: 'json',
//       url: 'http://api.giphy.com/v1/gifs/search?q=' + userMessage + "&api_key=dc6zaTOxFJmzC",
//       method: 'GET',
//       // data: params,
//     }) // end ajax GET request
//       .done(function (data) {
//       var giphyURL = data.data[0].images.fixed_height.url;
//       var giphImg = "<img src='giphyURL'>";
//       $( "<div></div>" ).attr("class", "botTalkBubble").html( giphImg ).appendTo( "main" );
//
// // We're getting the following error message:
// // /GET Users/MB/Desktop/TIY/TIY-Chatti/giphyURL:1  file:///Users/MB/Desktop/TIY/TIY-Chatti/giphyURL net::ERR_FILE_NOT_FOUND
//
//       // console.log(data.data[0].images.fixed_height.url);
//       // $( "<div></div>" ).attr("class", "userTalkBubble").attr( "src", "giphyURL" ).appendTo( "main" );
//       // $( "<div class='.userTalkBubble'</div>" ).add( "img" ).attr( "src", giphyURL );
//       // $( ".userTalkBubble" ).prepend( "<img class='theImg' src='giphyURL'/>" ).appendTo( "main" );
//       // $( ".house-pic" ).attr( "src", data.data[0].images.fixed_height.url );
//       $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "hello, yourself" ).appendTo( "main" );
//     }); // end done() for GIPHY
//
//
//
//     /////////// FOURSQUARE CALL//////////////////
//     // var location;
//       var cuisine;
//
//       // location = $('.location-choice[name="location"]').val().toString();
//       cuisine = userMessage;
//
//       var params = {
//         client_id: "JFJKRIE3BWM34PK0MJARBNJ3DAW4WFPQHV1BUC4I0T1NCOR2",
//         client_secret: "URVQR5M1H0STFSZXYOF5EULRQ4EJRATZAXVEK2N3YM402RSR",
//         v:20130815,
//         ll:"40.7,-74",
//         // near: location,
//         query: cuisine
//       };
//
//       console.log(cuisine);
//
//       // begin foursquare GET call
//       // if (prefix == "@fs" ){
//       $.ajax({
//         dataType: 'json',
//         url: 'https://api.foursquare.com/v2/venues/search',
//         method: 'GET',
//         data: params,
//       }) // end ajax GET request
//         .done(function (data) {
//
//         var restaurantLi = $( ".restaurant" );
//         for( var index = 0; index < 1; index++ ) {
//           console.log(data.response.venues[index].name);
//           console.log(data.response.venues[index].location);
//           $( restaurantLi[index] ).text( data.response.venues[index].name );
//           $( "<div></div>" ).attr( "class", "botTalkBubble" ).text("You might want to try "+ data.response.venues[index].name + " .").appendTo( "main");
//         }
//
//         // $(".location-choice").val("");
//         $(".cuisine-choice").val("");
//
//         }); // end done()
// // }
//       ///////////END OF FOURSQUARE CALL//////////////////
//
//     /////////////////////////////@bg  BACKGROUND SWITCH////////////////////
// if (prefix == "@bg"){
//   $('main').css('background-color',"blue");
// }
//

//       /////////////////////////////@bg  BACKGROUND SWITCH////////////////////
//
//   // } // end if
// }); // end event submit
