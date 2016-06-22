$( function() {
  "use strict";

  $( ".textBox" ).keypress( function(e) {
  if(e.which == 13) {
    $( ".sendButton" ).click();
    // e.preventDefault();
  }
}); // end enter keypress event

$( ".sendButton" ).on( "click", function(e) {
  e.preventDefault();
  var userMessage = $('.textBox[name="message"]').val().split( " " );
  var userMessageUnsplit = $('.textBox[name="message"]').val();

  /*******************************************************************
    CHANGE BACKGROUND-COLOR
  *******************************************************************/

  if( userMessage[0].toLowerCase() === "@bg" ) {
    $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
    console.log( userMessage );

    console.log( "Entering background-color" );
    $( "main" ).css( "background-color", userMessage[1] );
    $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "Excellent color choice!" ).appendTo( "main" );
    $( 'main' ).animate( {scrollTop:$(document).height()}, 'slow' );
    $( ".textBox" ).val( "" ); // reset textbox to placeholder value
    $( ".textBox" ).focus();
    }
  })
}) // end outmost function
