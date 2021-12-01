// Weather JS Logic

const cityFormEl = $('target');
const cityInputEl = $('#city-input');
const citySubmitEl = $('#city-submit');

// API Key
const APIKEY = '459011ac5cf9fbfc44816294a4c3b7aa';

let queryURL = ``;
let currentCityLat = '';
let currentCityLong = '';

cityFormEl.submit((event) => {
    event.preventDefault();
    
})

const pullWeatherData = () => {
    fetch()
}

//let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKEY}`;
