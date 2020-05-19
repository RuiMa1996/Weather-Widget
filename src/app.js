const myWeatherAPIKey = '04901bda849c03c85e34cc2001a5c026';
const currentWeather = document.querySelector('.current-conditions');

navigator.geolocation.getCurrentPosition(position => {
  localLat = position.coords.latitude;
  localLong = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${localLat}&lon=${localLong}&appid=${myWeatherAPIKey}`)
  .then(resp => {
    if(resp.ok) {
      return resp.json();
    } else {
      throw new Error('No json found');
    }
  })
  .then(localWeather => {
    console.log(localWeather);
  })
});