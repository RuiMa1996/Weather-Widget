const myWeatherAPIKey = '04901bda849c03c85e34cc2001a5c026';


navigator.geolocation.getCurrentPosition(position => {
  localLat = position.coords.latitude;
  localLong = position.coords.longitude;

  console.log(localLat);
  console.log(localLong);
})