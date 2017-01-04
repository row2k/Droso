/*
#######################################
#droso fruit recognizer
#(c)brittany walker,rowland zhang 2016
#######################################
*/
////prevent default
$(window).keydown(function(event) {
  if(event.keyCode == 13) { //prevent return form submit
    event.preventDefault();
    return false;
  } else if (event.keyCode == 8) { //prevent backspace nav
    event.preventDefault();
    return false;
  }
});

////navbar collapse,shade
function collapseNavbar() {
  if ($(".navbar").offset().top > 50) { // check if user is more than 50 from top
    $(".navbar").addClass("navbar-collapse");
  } else {
    $(".navbar").removeClass("navbar-collapse");
  }
}
$(window).scroll(collapseNavbar); //run check whenever scroll happens
$(document).ready(collapseNavbar); //run check whenever page reloads

$(document).ready(function() {
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

    $("#playbutton").click(function(e){
      var href = "#play",
          offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
      $('html, body').stop().animate({
          scrollTop: offsetTop + 14
      }, 300);
      e.preventDefault();
    });

    //JS for the drag and drop



  	'use strict';

  	;( function ( document, window, index )
  	{
  		// feature detection for drag&drop upload
  		var isAdvancedUpload = function()
  			{
  				var div = document.createElement( 'div' );
  				return ( ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div ) ) && 'FormData' in window && 'FileReader' in window;
  			}();


  		// applying the effect for every form
  		var forms = document.querySelectorAll( '.box' );
  		Array.prototype.forEach.call( forms, function( form )
  		{
  			var input		 = form.querySelector( 'input[type="file"]' ),
  				label		 = form.querySelector( 'label' ),
  				errorMsg	 = form.querySelector( '.box__error span' ),
  				restart		 = form.querySelectorAll( '.box__restart' ),
  				droppedFiles = false,
  				showFiles	 = function( files )
  				{
  					label.textContent = files.length > 1 ? ( input.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', files.length ) : files[ 0 ].name;
  				},
  				triggerFormSubmit = function()
  				{
  					var event = document.createEvent( 'HTMLEvents' );
  					event.initEvent( 'submit', true, false );
  					form.dispatchEvent( event );
  				};

  			// letting the server side to know we are going to make an Ajax request
  			var ajaxFlag = document.createElement( 'input' );
  			ajaxFlag.setAttribute( 'type', 'hidden' );
  			ajaxFlag.setAttribute( 'name', 'ajax' );
  			ajaxFlag.setAttribute( 'value', 1 );
  			form.appendChild( ajaxFlag );

  			// automatically submit the form on file select
  			input.addEventListener( 'change', function( e )
  			{
  				showFiles( e.target.files );


  				triggerFormSubmit();


  			});

  			// drag&drop files if the feature is available
  			if( isAdvancedUpload )
  			{
  				form.classList.add( 'has-advanced-upload' ); // letting the CSS part to know drag&drop is supported by the browser

  				[ 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop' ].forEach( function( event )
  				{
  					form.addEventListener( event, function( e )
  					{
  						// preventing the unwanted behaviours
  						e.preventDefault();
  						e.stopPropagation();
  					});
  				});
  				[ 'dragover', 'dragenter' ].forEach( function( event )
  				{
  					form.addEventListener( event, function()
  					{
  						form.classList.add( 'is-dragover' );
  					});
  				});
  				[ 'dragleave', 'dragend', 'drop' ].forEach( function( event )
  				{
  					form.addEventListener( event, function()
  					{
  						form.classList.remove( 'is-dragover' );
  					});
  				});
  				form.addEventListener( 'drop', function( e )
  				{
  					droppedFiles = e.dataTransfer.files; // the files that were dropped
  					showFiles( droppedFiles );


  					triggerFormSubmit();

  									});
  			}


  			// if the form was submitted
  			form.addEventListener( 'submit', function( e )
  			{
  				// preventing the duplicate submissions if the current one is in progress
  				if( form.classList.contains( 'is-uploading' ) ) return false;

  				form.classList.add( 'is-uploading' );
  				form.classList.remove( 'is-error' );

  				if( isAdvancedUpload ) // ajax file upload for modern browsers
  				{
  					e.preventDefault();

  					// gathering the form data
  					var ajaxData = new FormData( form );
  					if( droppedFiles )
  					{
  						Array.prototype.forEach.call( droppedFiles, function( file )
  						{
  							ajaxData.append( input.getAttribute( 'name' ), file );
  						});
  					}

  					// ajax request
  					var ajax = new XMLHttpRequest();
  					ajax.open( form.getAttribute( 'method' ), form.getAttribute( 'action' ), true );

  					ajax.onload = function()
  					{
  						form.classList.remove( 'is-uploading' );
  						if( ajax.status >= 200 && ajax.status < 400 )
  						{
  							var data = JSON.parse( ajax.responseText );
  							form.classList.add( data.success == true ? 'is-success' : 'is-error' );
  							if( !data.success ) errorMsg.textContent = data.error;
  						}
  						else alert( 'Error. Please, contact the webmaster!' );
  					};

  					ajax.onerror = function()
  					{
  						form.classList.remove( 'is-uploading' );
  						alert( 'Error. Please, try again!' );
  					};

  					ajax.send( ajaxData );
  				}
  				else // fallback Ajax solution upload for older browsers
  				{
  					var iframeName	= 'uploadiframe' + new Date().getTime(),
  						iframe		= document.createElement( 'iframe' );

  						$iframe		= $( '<iframe name="' + iframeName + '" style="display: none;"></iframe>' );

  					iframe.setAttribute( 'name', iframeName );
  					iframe.style.display = 'none';

  					document.body.appendChild( iframe );
  					form.setAttribute( 'target', iframeName );

  					iframe.addEventListener( 'load', function()
  					{
  						var data = JSON.parse( iframe.contentDocument.body.innerHTML );
  						form.classList.remove( 'is-uploading' )
  						form.classList.add( data.success == true ? 'is-success' : 'is-error' )
  						form.removeAttribute( 'target' );
  						if( !data.success ) errorMsg.textContent = data.error;
  						iframe.parentNode.removeChild( iframe );
  					});
  				}
  			});


  			// restart the form if has a state of error/success
  			Array.prototype.forEach.call( restart, function( entry )
  			{
  				entry.addEventListener( 'click', function( e )
  				{
  					e.preventDefault();
  					form.classList.remove( 'is-error', 'is-success' );
  					input.click();
  				});
  			});

  			// Firefox focus bug fix for file input
  			input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
  			input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });

  		});
  	}( document, window, 0 ));


});
