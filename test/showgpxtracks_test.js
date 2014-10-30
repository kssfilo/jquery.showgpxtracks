(function($) {
  module('jQuery.showgpxtracks');

  asyncTest('basic', function(assert) {
	var el="<div class=\"track\" style=\"width:800px;height:600px;\" src=\"hiking.gpx\" id=\"target\"></div>";
	$('#target').append(el);
	$('.track').showGpxTracks();
    expect(1);
	setTimeout(function(){
		assert.notEqual($('#target').html(),el);
		//$('#qunit-fixture').html('');
		start();
	},5000);
  });

}(jQuery));
