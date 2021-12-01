// Weather JS Logic

const cityFormEl = $('target');
const cityInputEl = $('#city-input');
const citySubmitEl = $('#city-submit');
const searchHistoryEl = $('#search-history');

// API Key
const APIKEY = '459011ac5cf9fbfc44816294a4c3b7aa';

let queryURL = ``;
let currentCity = 
{lat: 0, 
    lon: 0, 
    name: 'EnglandIsMyCity', 
    date: '0000000000',
    icon: "aaa",
    temp: 0,
    wind: 0,
    humidity: 0,
    uvi: 0,
}
let currentCityLat = '';
let currentCityLong = '';
let currentCityName = '';

let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || "[]");
// Add search history below search button

function storeSearchHistory(userSearchQuery) {

    searchHistory.push(userSearchQuery);

    // Search
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

cityFormEl.submit((event) => {
    event.preventDefault();
    let userCity = $(cityInputEl).val();
    queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKEY}`;
    pullCityWeatherData();    
});

const pullCityWeatherData = () => {

    fetch(queryURL).then(response => 
        response.json()then)
}

//let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKEY}`;
