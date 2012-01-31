
// auxiliar variables
var days = "99";
var hours = "99";
var minutes = "99";
var seconds = "99";
var first_time = true;
var browser_name = "undefined";
var was_above_limit = false;

// starting point: initialize and set panel to running mode
init();

		
////
// initializes variables and sets the counter for the first time
////
function init()
{
	// force default values
	if (typeof(target)=="undefined") target = "01/30/2012 15:00 PM";
	if (typeof(countdown_active)=="undefined") countdown_active = true;

	// calculate remaining time
	var target_date = new Date(target);
	var current_date = new Date();
	var remaining_time = new Date(target_date-current_date);
	var remaining_time_in_seconds = Math.floor(remaining_time.valueOf()/1000);
	
	// call the function that updates the HTML 'airport' panel
	update_counter(remaining_time_in_seconds);
	
	// since update_counter has a special behavior for the first time,
	//	set it to false (default behavior) from now on
	first_time=false;
	
}

////
// call fuction that updates the 'airport' panel and set a timer to call this same function each second
////
function update_counter(secs)
{
	update_panels(secs);
  
	if (countdown_active)
	{
		setTimeout("update_counter(" + (secs-1) + ")", 1000);
	}
}

////
// calculates time left and update each HTML panel if applicable
////
function update_panels(secs)
{
	// if target reached, stop animation and force panels to ZERO
	if (secs < 0)
	{
		secs = 0;
		countdown_active = false;
	}

	var daysleft = get_days_left(secs);
	var hoursleft = get_hours_left(secs);
	var minutesleft = get_minutes_left(secs);
	var secondsleft = get_seconds_left(secs);
	var is_above_limit = false;
	if(daysleft > 99)
	{
		daysleft = 99;
		hoursleft = 99;
		minutesleft = 99;
		secondsleft = 99;
		is_above_limit = true;
	}

	// update days - only if there are changes since last second
	if(days!=daysleft || first_time)
	{
		var old_left_digit = days.toString()[0];
		var old_right_digit = days.toString()[1];		
		var left_digit = daysleft.toString()[0];
		var right_digit = daysleft.toString()[1];
			
		// right digit should animate only if it changed, which happens when the left-digit was '0' last time
		if(old_right_digit=='0' || first_time || (!is_above_limit && was_above_limit))
		{
			change_panel_images('days-topleft','days-bottomleft', 1, left_digit, old_left_digit);
		}
		change_panel_images('days-topright','days-bottomright', 2, right_digit, old_right_digit);
		
		days=daysleft;
	}

	// update hours - only if there are changes since last second
	if(hours!=hoursleft || first_time)
	{
		var old_left_digit = hours.toString()[0];
		var old_right_digit = hours.toString()[1];
		var left_digit = hoursleft.toString()[0];
		var right_digit = hoursleft.toString()[1];
		
		// right digit should animate only if it changed, which happens when the left-digit was '0' last time
		if(old_right_digit=='0' || first_time || (!is_above_limit && was_above_limit))
		{
			change_panel_images('hours-topleft','hours-bottomleft', 3, left_digit, old_left_digit);
		}		
		change_panel_images('hours-topright','hours-bottomright', 4, right_digit, old_right_digit);

		hours=hoursleft;
	}

	// update minutes - only if there are changes since last second
	if(minutes!=minutesleft || first_time)
	{
		var old_left_digit = minutes.toString()[0];		
		var old_right_digit = minutes.toString()[1];
		var left_digit = minutesleft.toString()[0];
		var right_digit = minutesleft.toString()[1];
		
		// right digit should animate only if it changed, which happens when the left-digit was '0' last time
		if(old_right_digit=='0' || first_time || (!is_above_limit && was_above_limit))
		{
			change_panel_images('minutes-topleft','minutes-bottomleft', 5, left_digit, old_left_digit);
		}
		change_panel_images('minutes-topright','minutes-bottomright', 6, right_digit, old_right_digit);
		
		minutes=minutesleft;
	}
	
	// update seconds - only if there are changes since last second
	if(seconds!=secondsleft || first_time)
	{
		var old_left_digit = seconds.toString()[0];
		var old_right_digit = seconds.toString()[1];
		var left_digit = secondsleft.toString()[0];
		var right_digit = secondsleft.toString()[1];
	
		// right digit should animate only if it changed, which happens when the left-digit was '0' last time
		if(old_right_digit=='0' || first_time || (!is_above_limit && was_above_limit))
		{
			change_panel_images('seconds-topleft','seconds-bottomleft', 7, left_digit, old_left_digit);
		}
		change_panel_images('seconds-topright','seconds-bottomright', 8, right_digit, old_right_digit);
		
		seconds=secondsleft;
	}
	
	was_above_limit = is_above_limit;
}

////
// updates HTML panels according to the field_id (seconds, minutes, hours or days ; left or right digit) - 3d animations mode(webkit)
////
function change_panel_images(top_field_id, bottom_field_id, idx, digit, old_digit)
{
	var animations_enabled = false;

	// get user's browser name
	//	some visual features are different depending on the browser's name/version
	browser_name = BrowserDetect.browser;
	
	// since Chrome and Safari are the only browsers supporting 3d rotations, the divs solely used
	//	for these animations should be hidden
	if(browser_name == "Chrome" || browser_name == "Safari")
	{
		animations_enabled = true;
	}
	
	// set filename for front and back panels for the top part of the digit
	var top_number_filename = 'img/' + (animations_enabled ? old_digit : digit) + '_panel_up_piece.png';
	var top_number_filename_back = 'img/' + digit + '_panel_up_piece.png';
	
	// set filename for front and back panels for the bottom part of the digit
	var bottom_number_filename = 'img/' + digit + '_panel_down_piece.png';
	var bottom_number_filename_back = 'img/' + old_digit + '_panel_down_piece.png';

	// reset css class so that animation restarts
	var curr_top_div = $("#"+top_field_id+"-div"),
	new_top_div = curr_top_div.clone(true);
	curr_top_div.before(new_top_div);
	$("." + curr_top_div.attr("class") + ":eq("+idx+")").remove();

	// reset css class so that animation restarts
	var curr_bottom_div = $("#"+bottom_field_id+"-div"),
	new_bottom_div = curr_bottom_div.clone(true);
	curr_bottom_div.before(new_bottom_div);
	$("." + curr_bottom_div.attr("class") + ":eq("+idx+")").remove();
	
	// update panels with new images
	document.getElementById(top_field_id).src=top_number_filename;
	document.getElementById(top_field_id+"-back").src=top_number_filename_back;
	document.getElementById(bottom_field_id).src=bottom_number_filename;
	document.getElementById(bottom_field_id+"-back").src=bottom_number_filename_back;
}

////
// converts seconds to days
////
function get_days_left(secs)
{
	return convert_seconds(secs,86400,1000000);
}

////
// converts seconds to hours
////
function get_hours_left(secs)
{
	return convert_seconds(secs,3600,24);
}

////
// converts seconds to minutes
////
function get_minutes_left(secs)
{
	return convert_seconds(secs,60,60);
}

////
// converts seconds to seconds in a minute
////
function get_seconds_left(secs)
{
	return convert_seconds(secs,1,60);
}

////
// converts seconds to a specific time, expressed in seconds (minute: 60 seconds ; hour: 3600 seconds ; ...)
////
function convert_seconds(seconds, unit, base)
{
	var output = ((Math.floor(seconds/unit)) % base).toString();
	if (output.length < 2)
	{
		output = "0" + output;
	}

	return output;
}