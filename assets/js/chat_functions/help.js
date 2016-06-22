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

    var userMessage = $('.textBox[name="message"]').val().split( " " );
    var userMessageUnsplit = $('.textBox[name="message"]').val();
    /*******************************************************************
                    @HELP message
    *******************************************************************/

      if( userMessage[0].toLowerCase() === "@help" ) {
      console.log( "@help was entered" );
      // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
      $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessageUnsplit ).appendTo( "main" );
      console.log( userMessage );
      // $( "main" ).css( "background-color", userMessage[1] );
      $( "<div></div>" ).attr( "class", "botTalkBubble" ).html( "You can type in:<br>@giphy [topic] <br>@weather [state/city] <br> @fs [type of cuisine]<br>@bg [color]" ).appendTo( "main" );
      $( ".textBox" ).val( "" ); // reset textbox to placeholder value
      $( ".textBox" ).focus();
      // thank you http://www.electrictoolbox.com/jquery-scroll-bottom/ for your help
      $( 'main' ).animate( {scrollTop:$(document).height()}, 'slow' );
    } // end if
  }) // end submit event
}) // end outer function
