$( ".sendButton" ).on( "click", function() {
  var userMessage = $('.textBox[name="message"]').val();
  var prefix = userMessage.substr(0, 6);
  console.log( userMessage );
  console.log( prefix );

  // thank you, http://stackoverflow.com/questions/867916/creating-a-div-element-in-jquery
  // $( "<div></div>" ).attr( "class", "userTalkBubble" ).append( userMessage ).appendTo( "main" );
  // if( prefix.toLowerCase() === "@giphy" ) {
  // GIPHY CALL
  $.ajax({
      dataType: 'json',
      url: 'http://api.giphy.com/v1/gifs/search?q=' + userMessage + "&api_key=dc6zaTOxFJmzC",
      method: 'GET',
      // data: params,
    }) // end ajax GET request
      .done(function (data) {
      var giphyURL = data.data[0].images.fixed_height.url;
      var giphImg = "<img src='giphyURL'>";
      $( "<div></div>" ).attr("class", "userTalkBubble").html( giphImg ).appendTo( "main" );




      // console.log(data.data[0].images.fixed_height.url);
      // $( "<div></div>" ).attr("class", "userTalkBubble").attr( "src", "giphyURL" ).appendTo( "main" );
      // $( "<div class='.userTalkBubble'</div>" ).add( "img" ).attr( "src", giphyURL );
      // $( ".userTalkBubble" ).prepend( "<img class='theImg' src='giphyURL'/>" ).appendTo( "main" );
      // $( ".house-pic" ).attr( "src", data.data[0].images.fixed_height.url );
      $( "<div></div>" ).attr( "class", "botTalkBubble" ).append( "hello, yourself" ).appendTo( "main" );
    }); // end done() for GIPHY
  // } // end if
}); // end event submit
