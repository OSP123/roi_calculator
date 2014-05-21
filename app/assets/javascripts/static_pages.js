var actions_drop_down;
var roi_defined_container;
var roi_per_action_container;
$(document).ready(function(){ 

	actions_drop_down = $('#actions_drop_down');
	roi_defined_container = $('#roi_per_action_container');
	roi_per_action_container = $('#roi_per_action_container');
  $('#add_action').click(function(){ 
    (actions_drop_down.val());
    var value = actions_drop_down.val();
  	$('#' + value + '_defined').show( "fold", 1000 );
  	$('#' + value + '_calculated').show( "fold", 1000 );
  });

});
