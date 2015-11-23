var clip;
var clipTime;
var videoTime;
var playerNameForAlert;

jQuery(document).ready(function() {
	var monthNames = [ "January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December" ];
	var dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
		"Saturday"];
	var lastDayofMonth = ["31", "", "31", "30", "31", "30", "31", "30", "31", "31", "30", "31"];//jan, feb, march, april, may, june, july, august, september, october, november, december 0 indexed
		
	var d = new Date
	var dayoftheWeek = d.getDay(); //0 indexed
	var dayoftheMonth = d.getDate();
	var monthoftheYear = d.getMonth(); //0 indexed
	var Year = d.getFullYear();
	var headerDate = dayNames[dayoftheWeek] + ' ' + monthNames[monthoftheYear] + ' ' + dayoftheMonth + ', ' + d.getFullYear(); //formatted calendar header 
	var actualMonth = monthoftheYear + 1;
	var dateDisplayed = actualMonth + '/' + dayoftheMonth + '/' + Year;
	var todaysDate = actualMonth + '/' + dayoftheMonth + '/' + d.getFullYear(); //today's date for comparison

	$('.date').empty();
	$('.date').text(headerDate);


	// starter jQuery file
	jQuery('.home-bottom li:nth-of-type(2)').click(function(){
		//alert("hello");
		jQuery('.sign-in').show("slide", {direction:'down'}, 800);
	});//end click home button li
	
	jQuery('.back-button').click(function(){
		//alert("hello");
		jQuery('.sign-in').hide("slide" , {direction:'down'}, 800);
	}); //end click back button
	
	 
	 //click on the left arrow - change date, highlight border 
	 $('.left-arrow').on("click", function(e){
		var lastDayofPreviousMonth = new Date(Year, monthoftheYear, 0).getDate(); //getting the highest date of the previous month
		
		if(dayoftheWeek > 0)
			dayoftheWeek = dayoftheWeek - 1;
		else
			dayoftheWeek = dayoftheWeek + 6;
		//appropriate month and day 	
		if(dayoftheMonth > 1)
			dayoftheMonth = dayoftheMonth - 1;
		else if(dayoftheMonth == 1){
			dayoftheMonth = lastDayofPreviousMonth;
			if(monthoftheYear === 0){
				monthoftheYear = 11;
				Year = Year - 1; 
			}
			else{
				monthoftheYear = monthoftheYear - 1;
			}
		}
		headerDate = dayNames[dayoftheWeek] + ' ' + monthNames[monthoftheYear] + ' ' + dayoftheMonth + ', ' + Year;
		actualMonth = monthoftheYear + 1;
		dateDisplayed = actualMonth + '/' + dayoftheMonth + '/' + Year;
		$('.date').empty();
		$('.date').text(headerDate);
		
		$('.left-arrow')
	});
	 
	$('.right-arrow').on("click", function(e){
		var lastDayofThisMonth = new Date(Year, monthoftheYear + 1, 0).getDate();//getting the highest date of this month
		if(dateDisplayed === todaysDate){ //cant go in the future
			alert('Already Todays Date');
		}
		else{
			if(dayoftheMonth === lastDayofThisMonth){
				if(monthoftheYear === 11){					
					Year = Year + 1;
					dayoftheWeek = dayoftheWeek + 1;
					monthoftheYear = 0;				
					}
				else{
					monthoftheYear = monthoftheYear + 1;
					if(dayoftheWeek === 6)
						dayoftheWeek = 0;
					else
						dayoftheWeek = dayoftheWeek + 1;
				}
				dayoftheMonth = 1;				
			}
			else{
				if(dayoftheWeek === 6)
					dayoftheWeek = 0;
				else
					dayoftheWeek = dayoftheWeek + 1;
					// dayoftheWeek = 0;
				// if(dayoftheWeek === 6{
					// dayoftheWeek = 0;
					// }
				// else{
					// dayoftheWeek = dayoftheWeek + 1;
				// }
				dayoftheMonth = dayoftheMonth + 1;
			}
		headerDate = dayNames[dayoftheWeek] + ' ' + monthNames[monthoftheYear] + ' ' + dayoftheMonth + ', ' + Year;
		actualMonth = monthoftheYear + 1;
		dateDisplayed = actualMonth + '/' + dayoftheMonth + '/' + Year;
		$('.date').empty();
		$('.date').text(headerDate);
		}
	});
	 
	 
	$('ul.player-video-buttons li').on("mousedown", function(e){
		$('.player-profile-container').css('border-width', "2px");
		$('.player-profile-container').css('border-color', "yellow");
	});
	 
	$('ul.player-video-buttons li').on("mouseup", function(e){
		$('.player-profile-container').removeAttr('style');;
	});
	 
	 
	$('ul.player-video-buttons li').on("click", function(){
	var playerNameFormatted;
	var playerName =  $('span:nth-of-type(2)', this).text();
	var videoTag = '<video  id="play-video" width="588" height="318" controls autoplay><source src="{player-videoName}" type="video/mp4">Your browser does not support the video tag.</video>';
	var playerPosition = $('span:nth-of-type(1)', this).text();
	
	
	$('li').removeAttr('style');
	$('.player-name').empty();
	$('.video-player').empty();
	$('.player-name').text(playerPosition + " " + playerName);
	 
	 $(this).css({				//click changes CSS
		'height': '28px',
		'border-bottom': '3px solid #0B2B4B',
		'color': '#0B2B4B',
		'font-weight': 'bold'
	 });
	 


	 playerNameFormatted = playerName.toLowerCase();
	 playerNameFormatted = playerNameFormatted.split(' ').join('').toLowerCase();
	 var playerClipName = playerNameFormatted + '.mov';
	 videoTag = videoTag.replace('{player-videoName}', playerClipName);
	 $('.video-player').append(videoTag);
	 playerNameForAlert = playerNameFormatted;
	 });
	 
	 
	timeUpdate();
	setInterval('alertMe(playerNameForAlert);', 50);
});

	function timeUpdate(){
		clip = document.getElementById('play-video'); //current video 
		clipTime = clip.currentTime;
		clipTime = clipTime.toFixed(1); //Round to .x digit 
		setTimeout(timeUpdate, 15);
	}
	
	function alertMe(playerName){
			if(clipTime === '3.0'){
				$('.offense tr:nth-of-type(2) td:nth-of-type(5)').text('1');
				$('.offense tr:nth-of-type(2) td:nth-of-type(5)').effect("highlight", {}, 1000);
			}
			
			// switch(playername){
				// case "joshhamilton":
					// alert("josh hamilton");
					// playername = ""
					// break;
				// case"iankinsler":
					// alert("ian kinsler");
					// playername = ""
					// break;
				// default:
					// break;
			// }
	}
	
	
					// $('td:nth-of-type(4)', 'tr:nth-of-type(2)', '#pitching').text('1');
				// $('td:nth-of-type(4)', 'tr:nth-of-type(2)', '#pitching').effect("highlight", {}, 1500);
				
				
			// case "michaelcuddyer":
				// if(clipTime === 31){
					// alert('clipTime = 31');
					// // 
				// }
			// case "joshhamilton":
				// alert(playerName);
				// playerNameForAlert = "";
			// default:
				// break;
	
	
	
	
	// function loadStat(clip){
			// if(clip = 5)
			// {
				// alert('updated time');
			// }
	// }
	

// Object.prototype.toString.call(varName);  Get the type of an object 


