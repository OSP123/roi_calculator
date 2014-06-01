var actions_drop_down;
var roi_defined_container;
var roi_per_action_container;
$(document).ready(function(){ 

	actions_drop_down = $('#actions_drop_down');
	roi_defined_container = $('#roi_per_action_container');
	roi_per_action_container = $('#roi_per_action_container');
	total_cost = $('#total_cost');

  $('#add_action').click(function(){ 
    var value = actions_drop_down.val();
  	$('#' + value + '_defined').show( "fold", 1000 );
  	$('#' + value + '_calculated').show( "fold", 1000 );
  });

  $('#cpc_web_ad').change(multipleCostAndVisitors);

  $('#visitors_web_ad').change(multipleCostAndVisitors);

  $('#ctr_email').change(multipleCostAndVisitors);

  $('#emails').change(multipleCostAndVisitors);

  $('#cpc_fb_ad').change(multipleCostAndVisitors);

	$('#visitors_fb_ad').change(multipleCostAndVisitors);

	$('#ctr_website').change(multipleCostAndVisitors);

	$('#visitors_website').change(multipleCostAndVisitors);

	$('#total_visitors').change(visitorsChange);

	$('#total_participants').change(participantsChange);

	$('#conversion_rate').change(conversionRateChange);

	$('.average_engagement_percentage').change(actionsCalculation);

	$('.participants_per_action').change(actionsCalculation);

	$('.value_per_action').change(actionsCalculation);

	$('.total_value_per_action').change(actionsCalculation);

  function calculateCost() {
  	var
  		cpc_web_ad_value = parseFloat($('#cpc_web_ad').val()),
  		total_visitors_web_ad = parseFloat($('#total_visitors_web_ad').val()),
			total_web_ad = cpc_web_ad_value*total_visitors_web_ad,
  		cpc_fb_ad_value = parseFloat($('#cpc_fb_ad').val()),
  		total_visitors_fb_ad = parseFloat($('#total_visitors_fb_ad').val()),
  		total_fb_ad = cpc_fb_ad_value*total_visitors_fb_ad;

  	$('#total_cost').val(0);
  	$('#total_cost').val((parseFloat($('#total_cost').val()) + total_web_ad + total_fb_ad).toFixed(2));
	}

	function calculateTotalVisitors() {
	// Calculate Total Visitors
		var total_visitors_web_ad = parseFloat($('#total_visitors_web_ad').val()),
				total_visitors_emails = parseFloat($('#total_visitors_emails').val()),
				total_visitors_website = parseFloat($('#total_visitors_website').val()),
				total_visitors_fb_ad = parseFloat($('#total_visitors_fb_ad').val());

		$('#total_visitors').val((total_visitors_web_ad + total_visitors_emails + total_visitors_website + total_visitors_fb_ad).toFixed(0)).change();
	}

	function calculateVisitors() {
	// Calculate visitors for each traffic source
		var visitors_web_ad = parseFloat($('#visitors_web_ad').val());
		$('#total_visitors_web_ad').val(visitors_web_ad.toFixed(0));

		var ctr_email = parseFloat($('#ctr_email').val()),
				emails = parseFloat($('#emails').val()),
				total_emails = ctr_email*(emails/100);

  	$('#total_visitors_emails').val(total_emails.toFixed(0));

  	var ctr_website = parseFloat($('#ctr_website').val()),
				visitors_website = parseFloat($('#visitors_website').val()),
				total_website_visitors = ctr_website*(visitors_website/100);

  	$('#total_visitors_website').val(total_website_visitors.toFixed(0));

  	var visitors_fb_ad = parseFloat($('#visitors_fb_ad').val());
		$('#total_visitors_fb_ad').val(visitors_fb_ad.toFixed(0));

	}

	function multipleCostAndVisitors() {
		calculateVisitors();
		calculateCost();
		calculateTotalVisitors();
	}

	function participantsChange() {
	// Calculate Total Participants
		var total_visitors = parseFloat($('#total_visitors').val()),
			total_participants = parseFloat($('#total_participants').val()),
			conversion_rate = (total_participants/total_visitors) * 100,
			average_engagement_percentage = parseFloat($('.average_engagement_percentage').parent().find('.average_engagement_percentage').val());

			$('#conversion_rate').val(conversion_rate.toFixed(2));

			$('.participants_per_action').val((total_participants * (average_engagement_percentage/100)).toFixed(0)).change;
			viralVisitors();
	}


	function conversionRateChange() {
	// Calculate Total Participants
		var total_visitors = parseFloat($('#total_visitors').val()),
				conversion_rate = parseFloat($('#conversion_rate').val()),
				total_participants = total_visitors * (conversion_rate/100);

				$('#total_participants').val(total_participants.toFixed(0)).change();
	}

	function visitorsChange() {
		conversionRateChange();
	}

	function actionsCalculation() {

		var participants_per_action = parseFloat($(this).parent().find('.participants_per_action').val()),
				participants = parseFloat($('#total_participants').val()),
				average_engagement_percentage = parseFloat($(this).parent().find('.average_engagement_percentage').val()),
				value_per_action = parseFloat($(this).parent().find('.value_per_action').val()),
				total_value_per_action = parseFloat($(this).parent().find('.total_value_per_action').val()),
				total_value = 0,
				val_per_action = ((average_engagement_percentage/100) * participants_per_action * value_per_action).toFixed(2);


		if($(this).is('.average_engagement_percentage')) {
			$(this).parent().find('.participants_per_action').val(((average_engagement_percentage/100) * participants).toFixed(0));
			$(this).parent().find('.total_value_per_action').val(val_per_action).change();
		}
		else if($(this).is('.participants_per_action')) {
			$(this).parent().find('.average_engagement_percentage').val(((participants_per_action / participants) * 100).toFixed(2));
			$(this).parent().find('.total_value_per_action').val(val_per_action).change();
		}
		else if($(this).is('.value_per_action')) {
			$(this).parent().find('.total_value_per_action').val(val_per_action).change();
		}
		else if($(this).is('.total_value_per_action')) {
					$(".total_value_per_action").each(function(){
						if ($(this).is(":visible")) {
							total_value += parseFloat($(this).val());
						}
					});
				$('#total_roi').val(total_value.toFixed(2));
		}
	}

	$(".value_per_action").each(function(){

		var average_engagement_percentage = parseFloat($(this).parent().find('.average_engagement_percentage').val()),
				participants_per_action = parseFloat($(this).parent().find('.participants_per_action').val()),
				value_per_action = parseFloat($(this).parent().find('.value_per_action').val()),
				val_per_action = ((average_engagement_percentage/100) * participants_per_action * value_per_action).toFixed(2);

		if ($(this).is(":visible")) {
			$(this).parent().find('.total_value_per_action').val(val_per_action).change();
		}

	});


	function viralVisitors() {
		var total_participants = parseFloat($('#total_participants').val()),
				viral_conversion_rate = parseFloat($('#viral_conversion_rate').val()),
				viral_visitors = total_participants * (viral_conversion_rate/100);
				
				$('#viral_visitors').val(viral_visitors.toFixed(0)).change();
	}

	function viralParticipants() {
		
	}

	function viralConversionRate() {
		var total_participants = parseFloat($('#total_participants').val()),
				viral_conversion_rate = parseFloat($('#viral_conversion_rate').val()),
				viral_visitors = total_participants * (viral_conversion_rate/100);
	}
	


});
