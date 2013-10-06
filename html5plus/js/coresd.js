looptrack = 0;
      jQuery(function() { 
        // Setup the player to autoplay the next track
        var a = audiojs.createAll({
          trackEnded: function() {
            var next = looptrack==0 ? jQuery('ol li.playing').next().next() : jQuery('ol li.playing');
            if (!next.length) next = jQuery('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load(jQuery('a', next).attr('data-src'));
			audio.play();
			
			jQuery('#current-track'+id).html(jQuery('a', next).attr('title'));
			jQuery('#current-play-pic'+id).attr('src', jQuery('a', next).attr('name'));
			
          }
        });
		
        
        // Load in the first track
        var audio = a[0];
            first = jQuery('ol li a').attr('data-src'); // previous first = jQuery('ol a').attr('data-src');
        jQuery('ol li').first().addClass('playing');
        audio.load(first);
		jQuery('#current-track'+id).html(jQuery('ol li a').first().attr('title'));
		jQuery('#current-play-pic'+id).attr('src',jQuery('ol li a').first().attr('name'));
		

        // Load in a track on click
        jQuery('ol li').click(function(e) {
          e.preventDefault();
          jQuery(this).addClass('playing').siblings().removeClass('playing');
          audio.load(jQuery('a', this).attr('data-src'));
          audio.play();
        });
		
		// change current track name & image
		jQuery('.track-name').click(function(e) {
          jQuery('#current-track'+id).html(jQuery(this).attr('title'));
		  jQuery('#current-play-pic'+id).attr('src',jQuery(this).attr('name'));
        });
		
		// mouse click events for track change		
		jQuery('#next_track'+id).click(function() { 
			var next = jQuery('.playing').next().next(); // previous var next = jQuery('.playing').next();
			if (!next.length) next = jQuery('.Palylist01').first();
			if(jQuery('a', next).attr('title')!=null){
				jQuery('#current-track'+id).html(jQuery('a', next).attr('title'));
				jQuery('#current-play-pic'+id).attr('src', jQuery('a', next).attr('name'));
				
			//jQuery('#scrollbar1').tinyscrollbar_update(60);	
			}
			next.click();
			
		
		});	
				
		jQuery('#prev_track'+id).click(function() { 
			var prev = jQuery('.playing').prev().prev(); // previous var prev = jQuery('.playing').prev();
            if (!prev.length) prev = jQuery('.Palylist01').last();
			if(jQuery('a', prev).attr('title')!=null){
				jQuery('#current-track'+id).html(jQuery('a', prev).attr('title'));
				jQuery('#current-play-pic'+id).attr('src', jQuery('a', prev).attr('name'));
				
			//jQuery('#scrollbar1').tinyscrollbar_update(0);	
			}
            prev.click();

			
		});	
		
		jQuery('#play-pause'+id).click(function() { 
			 audio.playPause();
		});	
		
		// loop track 
		jQuery('#loop-track'+id).click(function(){
	      jQuery('#loop-track-box'+id).hide();
		  jQuery('#noloop-track-box'+id).show();
		  //audio.settings.loop = true;
		  looptrack = 1;
		});
		
		jQuery('#noloop-track'+id).click(function(){
	      jQuery('#loop-track-box'+id).show();
		  jQuery('#noloop-track-box'+id).hide();
		 // audio.settings.loop = false;
		 looptrack = 0;
		});
		
		
		// shuffle tracks
		
		jQuery('#shuffle-track'+id).click(function(){
	      jQuery('#shuffle-track-box'+id).hide();
		  jQuery('#noshuffle-track-box'+id).show();
		  
		  
		jQuery(".track-name").each(function (idx, el) { 
		
		  //alert( "this is element " + idx);
		  
		  //var idd = jQuery(this).attr('id');   
		  
		  //console.log( idd+' data-src= ' + jQuery(this).attr('data-src') );
		  
		  jQuery('#source'+id+idx+'download').attr('href', jQuery(this).attr('data-src'))
		  
		  //console.log( idx+' download.src= ' + jQuery('#source'+idd+'download').attr('href') );
		  
		
		});
		  
		  
		});
		
		jQuery('#noshuffle-track'+id).click(function(){
	      jQuery('#shuffle-track-box'+id).show();
		  jQuery('#noshuffle-track-box'+id).hide();
		 // audio.settings.loop = false;
		// shuffletrack = 0;
		});
		
	   
	    var scrubber1 = jQuery('#Player-progressbar01'+id);
		
		leftPos = function(elem) {
            var curleft = 0;
            if (elem.offsetParent) {
              do { curleft += elem.offsetLeft; } while (elem = elem.offsetParent);
            }
            return curleft;
          };
	     
		 jQuery('#Player-progressbar01'+id).click(function(e){
		 var relativeLeft = e.clientX - leftPos(this);
		 
		 //alert(e.clientX);
		 //alert(leftPos(this));
		 //alert(relativeLeft);
		 //alert(parseInt(this.offsetWidth));
		 
         audio.skipTo(relativeLeft / parseInt(this.offsetWidth));
		 })
		
		
        // Keyboard shortcuts
        jQuery(document).keydown(function(e) {
          var unicode = e.charCode ? e.charCode : e.keyCode;
             // right arrow
          if (unicode == 39) {
            var next = jQuery('li.playing').next().next();
            if (!next.length) next = jQuery('ol li').first();
            next.click();
            // back arrow
          } else if (unicode == 37) {
            var prev = jQuery('li.playing').prev().prev();
            if (!prev.length) prev = jQuery('ol li').last();
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