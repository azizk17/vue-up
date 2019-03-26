export default class {
	/*eslint-disable */
	geoIsSupported () {
      if (navigator.geolocation) {
      	return true
      }
      else {
      	alert('location is not supported')
      	return false
      }
	}
	getCurrentLocation (callback) {
	  let self = this
	  navigator.geolocation.getCurrentPosition(function(position) {
	    callback(position)
	  }, function(error) {
	    alert('Error occurred. Error code: ' + error.code);
	    // error.code can be:
	    //   0: unknown error
	    //   1: permission denied
	    //   2: position unavailable (error response from locaton provider)
	    //   3: timed out
	  });
	}
	watchPosition (callback) {
	  var self = this
	  if (!this.geoIsSupported()) {
	  	callback(this.geoIsEnabled())
	  	return
	  }
	  var geo = navigator.geolocation;
	  var watch = geo.watchPosition(function(position) {
		  callback(position.coords)
		  self.stopWatch(position)
	  }, error => callback(this.errorHandler(error)));
	}
	stopWatch (watch) {
		var geo = navigator.geolocation;
		geo.clearWatch(watch);
	}
	errorHandler(err) {
        if(err.code == 1) {
           alert("Error: Access is denied!");
        }        
        else if( err.code == 2) {
           alert("Error: Position is unavailable!");
        }
    }
	distance(lat1, lon1, lat2, lon2, unit) {
		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return Math.round(dist).toFixed(2);
	}
}
