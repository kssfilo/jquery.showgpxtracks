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

  asyncTest('textinput', function(assert) {
	var el="<div style=\"width:800px;height:600px;\" id=\"textinput\"></div>";
	$('#target2').append(el);
	var gpx='<?xml version="1.0" encoding="UTF-8"?><gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg><trkpt lat="35.365968055555555" lon="138.73368555555555"><ele>3680.0</ele></trkpt><trkpt lat="35.36499416666667" lon="138.73331305555556"><ele>3712.0</ele></trkpt><trkpt lat="35.36499416666667" lon="138.73331305555556"><ele>3712.0</ele></trkpt><trkpt lat="35.36493166666666" lon="138.73317333333333"><ele>3712.0</ele></trkpt></trkseg></trk></gpx>';
	$('#textinput').showGpxTracksString(gpx);
    expect(1);
	setTimeout(function(){
		assert.notEqual($('#target2').html(),el);
		//$('#qunit-fixture').html('');
		start();
	},5000);

  asyncTest('urlspec', function(assert) {
	var el="<div style=\"width:800px;height:600px;\" id=\"urlspec\"></div>";
	$('#target3').append(el);
	$('#urlspec').showGpxTracks('hiking.gpx');
    expect(1);
	setTimeout(function(){
		assert.notEqual($('#target3').html(),el);
		//$('#qunit-fixture').html('');
		start();
	},5000);
  });
  });

}(jQuery));
