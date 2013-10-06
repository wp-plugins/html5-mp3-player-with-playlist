looptrack = 0;
      $(function() { 
        // Setup the player to autoplay the next track
        var a = audiojs.createAll({
          trackEnded: function() {
            var next = looptrack==0 ? $('ol li.playing').next().next() : $('ol li.playing');
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
			audio.play();
			
			$('#current-track'+id).html($('a', next).attr('title'));
			$('#current-play-pic'+id).attr('src', $('a', next).attr('name'));
			
          }
        });
		
        
        // Load in the first track
        var audio = a[0];
            first = $('ol li a').attr('data-src'); // previous first = $('ol a').attr('data-src');
        $('ol li').first().addClass('playing');
        audio.load(first);
		$('#current-track'+id).html($('ol li a').first().attr('title'));
		$('#current-play-pic'+id).attr('src',$('ol li a').first().attr('name'));
		

        // Load in a track on click
        $('ol li').click(function(e) {
          e.preventDefault();
          $(this).addClass('playing').siblings().removeClass('playing');
          audio.load($('a', this).attr('data-src'));
          audio.play();
        });
		
		// change current track name & image
		$('.track-name').click(function(e) {
          $('#current-track'+id).html($(this).attr('title'));
		  $('#current-play-pic'+id).attr('src',$(this).attr('name'));
        });
		
		// mouse click events for track change		
		$('#next_track'+id).click(function() { 
			var next = $('.playing').next().next(); // previous var next = $('.playing').next();
			if (!next.length) next = $('.Palylist01').first();
			if($('a', next).attr('title')!=null){
				$('#current-track'+id).html($('a', next).attr('title'));
				$('#current-play-pic'+id).attr('src', $('a', next).attr('name'));
				
			//$('#scrollbar1').tinyscrollbar_update(60);	
			}
			next.click();
			
		
		});	
				
		$('#prev_track'+id).click(function() { 
			var prev = $('.playing').prev().prev(); // previous var prev = $('.playing').prev();
            if (!prev.length) prev = $('.Palylist01').last();
			if($('a', prev).attr('title')!=null){
				$('#current-track'+id).html($('a', prev).attr('title'));
				$('#current-play-pic'+id).attr('src', $('a', prev).attr('name'));
				
			//$('#scrollbar1').tinyscrollbar_update(0);	
			}
            prev.click();

			
		});	
		
		$('#play-pause'+id).click(function() { 
			 audio.playPause();
		});	
		
		// loop track 
		$('#loop-track'+id).click(function(){
	      $('#loop-track-box'+id).hide();
		  $('#noloop-track-box'+id).show();
		  //audio.settings.loop = true;
		  looptrack = 1;
		});
		
		$('#noloop-track'+id).click(function(){
	      $('#loop-track-box'+id).show();
		  $('#noloop-track-box'+id).hide();
		 // audio.settings.loop = false;
		 looptrack = 0;
		});
		
		
		// shuffle tracks
		
		$('#shuffle-track'+id).click(function(){
	      $('#shuffle-track-box'+id).hide();
		  $('#noshuffle-track-box'+id).show();
		  
		  
		$(".track-name").each(function (idx, el) { 
		
		  //alert( "this is element " + idx);
		  
		  //var idd = $(this).attr('id');   
		  
		  //console.log( idd+' data-src= ' + $(this).attr('data-src') );
		  
		  $('#source'+id+idx+'download').attr('href', $(this).attr('data-src'))
		  
		  //console.log( idx+' download.src= ' + $('#source'+idd+'download').attr('href') );
		  
		
		});
		  
		  
		});
		
		$('#noshuffle-track'+id).click(function(){
	      $('#shuffle-track-box'+id).show();
		  $('#noshuffle-track-box'+id).hide();
		 // audio.settings.loop = false;
		// shuffletrack = 0;
		});
		
	   
	    var scrubber1 = $('#Player-progressbar01'+id);
		
		leftPos = function(elem) {
            var curleft = 0;
            if (elem.offsetParent) {
              do { curleft += elem.offsetLeft; } while (elem = elem.offsetParent);
            }
            return curleft;
          };
	     
		 $('#Player-progressbar01'+id).click(function(e){
		 var relativeLeft = e.clientX - leftPos(this);
		 
		 //alert(e.clientX);
		 //alert(leftPos(this));
		 //alert(relativeLeft);
		 //alert(parseInt(this.offsetWidth));
		 
         audio.skipTo(relativeLeft / parseInt(this.offsetWidth));
		 })
		
		
        // Keyboard shortcuts
        $(document).keydown(function(e) {
          var unicode = e.charCode ? e.charCode : e.keyCode;
             // right arrow
          if (unicode == 39) {
            var next = $('li.playing').next().next();
            if (!next.length) next = $('ol li').first();
            next.click();
            // back arrow
          } else if (unicode == 37) {
            var prev = $('li.playing').prev().prev();
            if (!prev.length) prev = $('ol li').last();
            prev.click();
            // spacebar
          } else if (unicode == 32) {
            audio.playPause();
          }
        })
      
	  
	  
 
        var  ids = ['vol-0', 'vol-10', 'vol-20', 'vol-30', 'vol-40', 'vol-50', 'vol-60', 'vol-70', 'vol-80', 'vol-90'];
			
        for (var i = 0, ii = ids.length; i < ii; i++) {
          var elem = document.getElementById(ids[i]),
              volume = ids[i].split('-')[1];
			  
			 // alert(ids[i]);
          elem.setAttribute('data-volume', volume / 100);
          elem.onclick = function(e) {
            audio.setVolume(this.getAttribute('data-volume'));
            e.preventDefault();
            return false;
          }
        }
        
      
	  
	  
	  
	  });
	  
	  
	  
	function basename (path, suffix) {
	
	var b = path.replace(/^.*[\/\\]/g, '');
	
	if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) {
	b = b.substr(0, b.length - suffix.length);
	}
	
	return b;
	}