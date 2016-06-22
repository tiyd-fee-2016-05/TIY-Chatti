$( function() {
  "use strict";

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

    /*******************************************************************
      DISPLAY GIPHY
    *******************************************************************/

    if( userMessage[0].toLowerCase() === "@giphy" ) {
    $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessageUnsplit ).appendTo( "main" );
    console.log( userMessage );
    $( ".textBox" ).focus();
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
