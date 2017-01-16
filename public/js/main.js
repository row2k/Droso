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
////fly animations
//fly blink
function blinkEyes() {
  $('#drosoEyesClosed').fadeTo(0,1);
  $('#drosoEyesClosed').stop().delay(200).animate({opacity:0}, 0, function() {});
}
window.setInterval(blinkEyes, 3000);

//stop fly fixed position before reaching bios
var windw = this;
$.fn.followTo = function(pos){var $this = this,$window = $(windw);$window.scroll(function(e){
if ($(window).scrollTop() > pos) {
  $this.css({
    position: 'absolute',
    top: 150 + pos
  });
} else {
  $this.css({
    position: 'fixed',
    top: 150
  });
}
});};
$('#drosoWrapper').followTo(700);
//fly move wings
function animateWings() {
  if($("#droso").offset().top % 7 == 0) {
    $('#droso').removeClass("droso-static");
    $('#droso').addClass("droso-flying");
  } else {
    $('#droso').removeClass("droso-flying");
    $('#droso').addClass("droso-static");
  }
}
$(window).scroll(animateWings);


    // Cache selectors
    var lastId,
        topMenu = $("#navbar"),
        topMenuHeight = topMenu.outerHeight()-25,
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

    //JS for firebase

    'use strict';

     // Firebase SDK
     this.database = firebase.database();
     this.auth = firebase.auth();
     this.storage = firebase.storage();

     //var imgtextRef = this.database().ref('images/');
     /*imgtextRef.on('value', function(snapshot) {
       var curImages = imgtextRef.snapshot.val();
       console.log(curImages);
     });*/

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

          /*var formData = new FormData();
          for (var i = 0; i < droppedFiles.length; i++) {
          formData.prepend('file', droppedFiles[i]);
        }*/

    			// automatically submit the form on file select
    			input.addEventListener( 'change', function( e )
    			{
            pickedFiles = e.target.files;
    				showFiles( pickedFiles );
            console.log(pickedFiles);
            droppedFiles = false;
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
    					showFiles(droppedFiles);
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
            form.classList.remove('is-success');

    				if( isAdvancedUpload ) // ajax file upload for modern browsers
    				{
    					e.preventDefault();

    					// gathering the form data
    					var formData = new FormData( form );
    					if( droppedFiles )
    					{
    						Array.prototype.forEach.call( droppedFiles, function( file )
    						{
    							formData.append( input.getAttribute( 'name' ), file );
    						});
    					}

              if (droppedFiles == false) {
                droppedFiles = pickedFiles;
              }

                var inFile = droppedFiles[0];
                console.log(droppedFiles);
                var filename = inFile.name;
                var storageRef = firebase.storage().ref();
                var folderRef = storageRef.child('images');
                var imgRef = folderRef.child(filename);
                var uploadTask = imgRef.put(inFile);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', function(snapshot){
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                    form.classList.add('is-uploading');
                    console.log('Upload is running');
                    break;
                  }
                  }, function(error) {
                    form.classList.remove('is-uploading');
                    form.classList.add('is-error');
                  }, function() {

                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    form.classList.remove('is-uploading');
                    form.classList.add('is-success');
                    console.log('success');

                    var imageURL = storageRef.child('/images/'+filename+'').getDownloadURL();
                    imageURL.then(function(url){
                      $('.is-success').prepend('<img src="'+ url + '"/>');
                    })
                    console.log(imageURL);
                    $("#replay").css("display","block");
                    $("#ready").css("display","none");
                    $("#loading").css("display","block");
                    $("#result").css("display","block");

                    
                    firebase.database().ref('images/image1').once('value').then(function(snapshot) {
                      var imgText = snapshot.val();
                      console.log(imgText);
                      $("#fruitname").html(''+ imgText +'');
                    });
                  });



              }
    				else // fallback Ajax solution upload for older browsers
    				{
    					/*var iframeName	= 'uploadiframe' + new Date().getTime(),
    						iframe		= document.createElement( 'iframe' );

    						$iframe		= $( '<iframe name="' + iframeName + '" style="display: none;"></iframe>' );

    					iframe.setAttribute( 'name', iframeName );
    					iframe.style.display = 'none';

    					document.body.appendChild( iframe );
    					form.setAttribute( 'target', iframeName );

    					iframe.addEventListener( 'load', function()
    					{
    						var data = JSON.parse( iframe.contentDocument.body.innerHTML );
    						/*form.classList.remove( 'is-uploading' )
    						form.classList.add( data.success == true ? 'is-success' : 'is-error' )
    						form.removeAttribute( 'target' );
    						if( !data.success ) errorMsg.textContent = data.error;
    						iframe.parentNode.removeChild( iframe );
    					});*/
    				}
    			});


    			// restart the form if has a state of error/success
    			/*Array.prototype.forEach.call( restart, function( entry )
    			{
    				entry.addEventListener( 'click',
            $('#replay').click(function( e )
    				{
    					e.preventDefault();
              $('.is-success img').remove();
    					form.classList.remove('is-error'); form.classList.remove('is-success');
              droppedFiles = false;
              pickedFiles = false;
    					input.click();
    				});
    			//});*/

    			// Firefox focus bug fix for file input
    			input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
    			input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });

    		});

        $("#play a").click(function(event) {
          event.preventDefault();
        });

        $("#replay").click(function(event){
          event.preventDefault;
          $('.is-success img').remove();
          $('.dragform form').removeClass('is-error');
          $('.dragform form').removeClass('is-success');
          $('.dragform form').removeClass('is-uploading');
          droppedFiles = false;
          pickedFiles = false;
          $('.dragform label').html('<strong>Choose an image</strong><span class="box__dragndrop"> or drag it here</span>.')
          $('#loading, #result').css("display","none");
          $('#ready').css("display","block");
          $(this).css("display","none");
        });

    	}( document, window, 0 ));

    });
