$(document).ready(function() {
    $(window).scroll(function() { // check if scroll event happened
      if ($(document).scrollTop() > 0) { // check if user scrolled more than 50 from top of the browser window
        $(".navbar").addClass("navcolor"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
      } else {
        $(".navbar").removeClass("navcolor"); // if not, change it back to transparent
      }
    });

    $(document).on('click', 'a', function(event){
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 75
        }, 500).delay(200);

        $("a").css("border","2px dashed rgba(0,0,0,0)");
        $(this).css("border","2px dashed white");
    });

});
