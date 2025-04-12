(function($){
	var gpxHandler = function(self, r, gpxurl){
		var minheight = 200;
		var infowidth = 30;

		var k = $('<div style="width:100%;height:70%">');
		var g = $('<canvas style="width:100%;height:20%">');
		var f = $('<div style="width:100%;height:10%;font-size:12px">');
		k.appendTo(self);
		g.appendTo(self);
		f.appendTo(self);

		var c = g[0].getContext('2d');
		g[0].width = g[0].offsetWidth;
		g[0].height = g[0].offsetHeight;
		var cw = g[0].width;
		var ch = g[0].height;

		const baseLayers = {
			"Standard": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; OpenStreetMap contributors'
			}),
			"Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
				maxZoom: 18,
				attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, etc.'
			}),
			"Topographic": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
				maxZoom: 15,
				attribution: 'Map data: &copy; OpenTopoMap (CC-BY-SA)'
			})
		};

		var map = L.map(k[0], {
		  layers: [baseLayers["Topographic"]],
		  zoomControl: true
		});

		L.control.layers(baseLayers, null, { collapsed: false }).addTo(map);

		var latlngs = [];
		var nlt = -90;
		var slt = 90;
		var wlg = 180;
		var elg = -180;
		var lev = 100000;
		var hev = 0;
		var dt = 0;
		var lps = null;
		var acc = 0;
		var dsc = 0;

		for (var i = 0; i < r.length; i++) {
			if (i > 0) {
				r[i].ev = r[i - 1].ev * 0.9 + r[i].ev * 0.1;
			}
			nlt = Math.max(r[i].lt, nlt);
			slt = Math.min(r[i].lt, slt);
			wlg = Math.min(r[i].lg, wlg);
			elg = Math.max(r[i].lg, elg);
			lev = Math.min(r[i].ev, lev);
			hev = Math.max(r[i].ev, hev);

			var latlng = L.latLng(r[i].lt, r[i].lg);
			latlngs.push(latlng);

			if (i !== 0) {
				var ldt = latlng.distanceTo(lps);
				dt += ldt;
				r[i].dt = dt;
				if (r[i - 1].ev < r[i].ev) acc += r[i].ev - r[i - 1].ev;
				if (r[i - 1].ev > r[i].ev) dsc += r[i - 1].ev - r[i].ev;
			}
			lps = latlng;
		}

		var dev = Math.max(hev - lev, minheight);
		var dx = cw / dt;
		var dy = ch / dev;

		var polyline = L.polyline(latlngs, { color: 'red', weight: 2, opacity: 0.9 }).addTo(map);
		map.fitBounds(polyline.getBounds());

		c.fillStyle = 'white';
		c.fillRect(0, 0, cw, ch);

		c.strokeStyle = 'lightgray';
		for (var i = 0; i < 4; i++) {
			c.beginPath();
			c.moveTo(0, ch / 4 * i);
			c.lineTo(cw - 1, ch / 4 * i);
			c.stroke();
		}

		c.fillStyle = 'rgba(0,127,0,0.5)';
		c.beginPath();
		c.moveTo(0, ch - (r[0].ev - lev) * dy);
		for (i = 1; i < r.length; i++) {
			c.lineTo(dx * r[i].dt, ch - (r[i].ev - lev) * dy);
		}
		c.lineTo(cw - 1, ch - 1);
		c.lineTo(0, ch - 1);
		c.closePath();
		c.fill();

		c.strokeStyle = 'black';
		c.lineWidth = 2;
		c.strokeRect(1, 1, cw - 2, ch - 2);

		c.fillStyle = 'blue';
		c.font = "12px Arial";
		c.fillText("+" + Math.round(dev) + "m", 5, 16);
		c.fillText("" + Math.round(lev) + "m", 5, ch - 6);

		var s = "Distance:" + (Math.round(dt) / 1000) + "km / Low:" + Math.round(lev) + "m / High:" + Math.round(hev) + "m / Accent:+" + Math.round(acc) + "m / Descent:" + Math.round(dsc) + "m";
		if (gpxurl) {
			s += "[<a href='" + gpxurl + "' download>Download GPX</a>]";
		}
		s += " (c)<a href='http://kanasys.com/gtech/'>kanasys.com</a>";
		f.html(s);
	};

	$.fn.showGpxTracksString = function(gpx){
		this.each(function(){
			var self = this;
			var xml = $.parseXML(gpx);
			var track = [];
			$(xml).find("trkpt").each(function() {
				var tm = new Date($(this).find('time').text());
				track.push({
					lt: parseFloat($(this).attr('lat')),
					lg: parseFloat($(this).attr('lon')),
					ev: parseFloat($(this).find('ele').text()),
					tm: tm
				});
			});
			gpxHandler(self, track);
		});
	};

	$.fn.showGpxTracks = function(optionalUrl){
		this.each(function(){
			var self = this;
			var gpxurl = optionalUrl || $(this).attr('src');
			if (!gpxurl) return;

			$.ajax({
				url: gpxurl,
				type: 'GET',
				dataType: 'xml',
				timeout: 20000,
				error: function(e) {
					console.log(e);
				},
				success: function(xml) {
					var track = [];
					$(xml).find("trkpt").each(function() {
						var tm = new Date($(this).find('time').text());
						track.push({
							lt: parseFloat($(this).attr('lat')),
							lg: parseFloat($(this).attr('lon')),
							ev: parseFloat($(this).find('ele').text()),
							tm: tm
						});
					});
					if (track.length > 1) {
						gpxHandler(self, track, gpxurl);
					}
				}
			});
		});
	};
})(jQuery);
