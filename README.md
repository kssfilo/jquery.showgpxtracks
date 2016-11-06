#jquery.showgpxtracks

jQuery plugin to show gpx track and altitude graph

##Download

* [jquery.showgpxtracks.js](https://raw.github.com/kssfilo/jquery.showgpxtracks/master/dist/jquery.showgpxtracks.js)
* [jquery.showgpxtracks.min.js](https://raw.github.com/kssfilo/jquery.showgpxtracks/master/dist/jquery.showgpxtracks.min.js)

##Usage

###Load from URL("src" attr)

```html
<html>
	<head>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=geometry&language=en&sensor=false"></script>

		<script src='jquery.showgpxtracks.js' ></script>

		<script>
			$(document).ready(function(){
				$('.track').showGpxTracks();
			});
		</script>
	</head>

	<body>
		<div class='track' src='hiking.gpx' style='width:600px;height;400px;'></div>
	</body>
</html>
```

The server which hosts gpx files have to support Access-Control-Allow-Origin header if the server is on another domain.

###Load from URL(function param)

```html
<html>
	<head>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=geometry&language=en&sensor=false"></script>

		<script src='jquery.showgpxtracks.js' ></script>

		<script>
			$(document).ready(function(){
				$('#track').showGpxTracks('hiking.gpx');
			});
		</script>
	</head>

	<body>
		<div id='track' style='width:600px;height:400px;'></div>
	</body>
</html>
```

###Load from GPX Text

```html
<html>
	<head>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=geometry&language=en&sensor=false"></script>

		<script src='jquery.showgpxtracks.js' ></script>

		<script>
			$(document).ready(function(){
				var gpx='<?xml version="1.0" encoding="UTF-8"?><gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg><trkpt lat="35.365968055555555" lon="138.73368555555555"><ele>3680.0</ele></trkpt><trkpt lat="35.36499416666667" lon="138.73331305555556"><ele>3712.0</ele></trkpt><trkpt lat="35.36499416666667" lon="138.73331305555556"><ele>3712.0</ele></trkpt><trkpt lat="35.36493166666666" lon="138.73317333333333"><ele>3712.0</ele></trkpt></trkseg></trk></gpx>';
				$('#track').showGpxTracksString(gpx);
			});
		</script>
	</head>

	<body>
		<div id='track' style='width:600px;height:400px;'></div>
	</body>
</html>
```

##History

* 0.2.0: Added showGpxTracksString() and optionalUrl param of showGpxTracks()


