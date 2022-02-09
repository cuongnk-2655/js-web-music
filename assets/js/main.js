$(document).ready(function () {
  
  $('.btn-play-music').on('click', function () {
    // console.log(this);
    $(this).css('font-size', '40px');
    // setTimeout(function () {
    //   $(this).css('font-size', '35px');
    // }, 500);
    $(this).animate({left: '10px'});
    setTimeout(function () {
      // $(this).css('position', 'relative');
      $(this).animate({left: '0px'});
      $(this).css('font-size', '35px');
      // $('.group-button-action').animate({right: '500px'});
    }, 500);
  });

});
