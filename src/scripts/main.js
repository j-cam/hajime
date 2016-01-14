//=require ../../node_modules/jquery/dist/jquery.min.js
//=include ./modules/plugins.js

$(document).ready(function() {


  $('#navTrigger').click( function(){

      var body = $('body');

      if(body.hasClass('show-nav')){

        body.removeClass('show-nav').addClass('hide-nav');

      } else {

        body.removeClass('hide-nav').addClass('show-nav');

      }

  });

});