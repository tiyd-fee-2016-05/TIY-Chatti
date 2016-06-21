$( function() {
  "use strict";
  /*******************************************************************
    CHANGE BACKGROUND-COLOR
  *******************************************************************/

  if( userMessage[0].toLowerCase() === "@bg" ) {
    console.log( "Entering background-color" );
    $( "main" ).css( "background-color", userMessage[1] );
    $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "Excellent color choice!" ).appendTo( "main" );
    $( ".textBox" ).val( "" ); // reset textbox to placeholder value
    }
}) // end outmost function
