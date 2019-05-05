/**
 * Dohledávaè adres
 * @author Martin Dobry
 * @link http://webscript.cz
 * @version 1.0
 */

var Ruian = function () {

	var delay = (function(){
		var timer = 0;
		return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		};
	})();
	
	function StreetSearch() {
		var search = $('#ruianStreet').val();
		var li = "";
		
		$('.ruian-helper').remove();
		
		if(search.length > 2) {
			$.ajax({ 
	            type: 'POST', 
	            url: 'RuianAjax.php', 
	            data: {
	            	search: function() {
	    	  			return search;
	      			}
	            }, 
	            dataType: 'json',
	            success: function (data) {
	            	
	            	$.each( data, function( key, value ) {
	            		li += '<li>'+value.replace(search, '<strong>'+search+'</strong>')+'</li>';
	            	});
	            	
	            	if(li)
	            		$('#ruianStreet').parent().append('<div class="ruian-helper"><ul>'+li+'</ul></div>');
	            	
	            	selectLI();
	            }
	        });
		}
	}
	
	function StreetHelper() {
		$('#ruianStreet').keyup(function(e) {
			if(e.which != 40 && e.which != 38 && e.which != 13) {
				delay(function(){
					StreetSearch();
			    }, 500 );
			}
		});
	}

	function select(data) {
		var address = data.replace("<strong>","").replace("</strong>","").split(', ');
		
		
		if(address[2]) {
			var zipcity = address[2].split(' ');
			
			$('#ruianStreet').val(address[0]);
			$('#ruianCity').val(zipcity[1]);
			$('#ruianZip').val(zipcity[0]);
			$('.ruian-helper').remove();
			
		} else {
			var zipcity = address[1].split(' ');
			
			if($.isNumeric(zipcity[0])) {
				$('#ruianStreet').val(address[0]);
				$('#ruianCity').val(zipcity[1]);
				$('#ruianZip').val(zipcity[0]);
				$('.ruian-helper').remove();
			} else {
				$('#ruianStreet').val(address[0]);
				$('#ruianStreet').focus();
			}
		}
	}
	
	function selectLI() {
		var li = $('.ruian-helper ul li');
		var liSelected;
		
		$(window).keydown(function(e){
			
			var keycode = (e.keyCode ? e.keyCode : e.which);
			
		    if(keycode === 40) {
		        if(liSelected) {
		            liSelected.removeClass('selected');
		            next = liSelected.next();
		            if(next.length > 0){
		                liSelected = next.addClass('selected');
		            } else {
		                liSelected = li.eq(0).addClass('selected');
		            }
		        } else {
		            liSelected = li.eq(0).addClass('selected');
		        }
		    }

		    if(keycode === 38){
		        if(liSelected) {
		            liSelected.removeClass('selected');
		            next = liSelected.prev();
		            if(next.length > 0){
		                liSelected = next.addClass('selected');
		            } else {
		                liSelected = li.last().addClass('selected');
		            }
		        } else {
		            liSelected = li.last().addClass('selected');
		        }
		    }
		    
			if(keycode === 13) {
				var selected = $('.selected').html();
		    	select(selected);
		    }
		    
		});
		
		$(".ruian-helper ul li").on("click", function(){
			select($(this).html());
		});
	}
	
	return {
		init: function () {
        	
			StreetHelper();
			
        }
    };
}();