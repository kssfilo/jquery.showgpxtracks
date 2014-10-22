#jquery.showgpxtracks

##About

jQuery plugin to show gpx track and altitude graph

##Usage

```html
<html>
	<head>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=geometry&language=ja&sensor=false"></script>

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

