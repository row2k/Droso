$(document).ready(function() {
    $(window).scroll(function() { // check if scroll event happened
      if ($(document).scrollTop() > 50) { // check if user scrolled more than 50 from top of the browser window
        $(".navbar").addClass("navcolor"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
      } else {
        $(".navbar").removeClass("navcolor"); // if not, change it back to transparent
      }
    });

    $('a').click(function(){
        $('html, body').animate({
            scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top - 50
        }, 500);
        return false;
    });
});
