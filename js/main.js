$(document).ready(function() {
    $(window).scroll(function() { // check if scroll event happened
      if ($(document).scrollTop() > 0) { // check if user scrolled more than 50 from top of the browser window
        $(".navbar").addClass("navcolor"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
      } else {
        $(".navbar").removeClass("navcolor"); // if not, change it back to transparent
      }
    });

    // $(document).on('click', 'a[href*="#"]', function(event){
    //     event.preventDefault();
    //
    //     $('html, body').animate({
    //         scrollTop: $( $.attr(this, 'href') ).offset().top - 75
    //     }, 500).delay(200);
    //
    //     $("a").css("border","2px dashed rgba(0,0,0,0)");
    //     $(this).css("border","2px dashed white");
    // });

    // Cache selectors
    var lastId,
        topMenu = $("#navbar"),
        topMenuHeight = topMenu.outerHeight()+15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
          var item = $($(this).attr("href"));
          if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
      var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
      $('html, body').stop().animate({
          scrollTop: offsetTop + 14
      }, 300);
      e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function(){
       // Get container scroll position
       var fromTop = $(this).scrollTop()+topMenuHeight;

       // Get id of current scroll item
       var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
       });
       // Get the id of the current element
       cur = cur[cur.length-1];
       var id = cur && cur.length ? cur[0].id : "";

       if (lastId !== id) {
           lastId = id;
           // Set/remove active class
           menuItems
             .parent().removeClass("active")
             .end().filter("[href='#"+id+"']").parent().addClass("active");
       }
    });

});
