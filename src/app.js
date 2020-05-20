const myWeatherAPIKey = '04901bda849c03c85e34cc2001a5c026';
const currentWeather = document.querySelector('.current-conditions');
const forecastWeather = document.querySelector('.forecast');
const dateOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

navigator.geolocation.getCurrentPosition(position => {
  localLat = position.coords.latitude;
  localLong = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${localLat}&lon=${localLong}&appid=${myWeatherAPIKey}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('No json found');
      }
    })
    .then(localWeather => {
      displayLocalWeather(localWeather);
    });

  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${localLat}&lon=${localLong}&appid=${myWeatherAPIKey}`)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('No json found');
      }
    })
    .then(forecast => {
      console.log(forecast);
      displayForecast(forecast);
    })
});

function displayLocalWeather(info) {
  currentWeather.innerHTML = "";

  currentWeather.insertAdjacentHTML('afterbegin', `
    <h2>Current Conditions</h2>
    <img src="http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png"/>
    <div class="current">
      <div class="temp">${tempConvert(info.main.temp)}℃</div>
      <div class="condition">${info.weather[0].description}</div>
    </div>
  `)
}

function tempConvert(kelvinTemp) {
  return Math.round(kelvinTemp - 273.15);
}

function displayForecast(forecastInfo) {
  newDateObj = {};

  for (let objOfArray of forecastInfo.list) {
    if (objOfArray.dt_txt.includes(objOfArray.dt_txt.substring(0, 11))) {
      if (newDateObj[convertTime(objOfArray.dt_txt)] === undefined) {
        newDateObj[convertTime(objOfArray.dt_txt)] = [objOfArray];
      } else {
        newDateObj[convertTime(objOfArray.dt_txt)].push(objOfArray);
      }
    }
  }
  console.log(newDateObj);

  for (let weekdays in newDateObj) {
    let date = new Date();
    let highTemp = [];
    let lowTemp = [];
    if (weekdays !== dateOfWeek[date.getDay()]) {
      for (let results of newDateObj[weekdays]) {
        highTemp.push(results.main.temp_max);
        highTemp.sort((a, b) => b - a);
        lowTemp.push(results.main.temp_min);
        lowTemp.sort((a, b) => a - b);
      }
      console.log(highTemp);
      console.log(lowTemp);
    }
  }
}


function convertTime(time) {
  let newDate = new Date(time);
  return dateOfWeek[newDate.getDay()];
}
