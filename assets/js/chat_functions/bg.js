$( function() {
  "use strict";

    $( ".sendButton" ).on( "click", function() {
      var userMessage = $('.textBox[name="message"]').val().split( " " );
      // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery

  /*******************************************************************
    CHANGE BACKGROUND-COLOR
  *******************************************************************/

  if( userMessage[0].toLowerCase() === "@bg" ) {
    $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
    console.log( userMessage );

    console.log( "Entering background-color" );
    $( "main" ).css( "background-color", userMessage[1] );
    $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "Excellent color choice!" ).appendTo( "main" );
    $( ".textBox" ).val( "" ); // reset textbox to placeholder value
    }
  })
}) // end outmost function
