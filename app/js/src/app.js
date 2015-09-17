 // START: jQuery noConflict Wrapper
jQuery(document).ready(function($) {

    /**
     * @var object Fallback for IE8
     */
    var console = window.console || { log: function() {} };

    console.log('App.js Ready.');


/*
  Debug
//  */
// var initWindowWidth = $(window).width();
// var initWindowHeight = $(window).height();
// $('.screen-width').text(initWindowWidth + 'px X ' + initWindowHeight + 'px' );

// $(window).resize(function() {
//     var windowWidth = $(window).width();
//     var windowHeight = $(window).height();
//     $('.screen-width').text(windowWidth + 'px X ' + windowHeight + 'px' );
// });


});// END: jQuery noConflict Wrapper