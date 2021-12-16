// Weather JS Logic
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );


// const cityFormEl = $('#target');
const cityFormEl = document.getElementById('target');
const cityInputEl = $('#city-input');
let citySubmitEl = $('#city-submit');
const searchHistoryEl = $('#search-history');

cityFormEl.addEventListener('click', searchHandler);

const APIKEY = "4c2ef19f28b879619b006e6afa9f94d4";

let queryURL = ``;
let currentCity = {
    lat: 0,
    lon: 0,
    name: "AbuDhabi",
    dt: "0000000000",
    icon: "aaa",
    temp: 0,
    wind: 0,
    humidity: 0,
    uvi: 0,
};

let currentCityLat = ``;
let currentCityLon = ``;
let currentCityName = ``;

let forecastWeather = [];
let forecastLength = 5;

let searchHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");

for (var i = 0; i < searchHistory.length; i++) {
    var searchHistoryItem = $('<li>')
        .text(searchHistory[i])
        .addClass('list-group-item-secondary text-center');
    searchHistoryEl.append(searchHistoryItem);
}

// cityFormEl.submit((event) => {
   function searchHandler(){      
    let userCity = '';
    event.preventDefault();
    if ($(cityInputEl).val() !== '') {
        userCity = $(cityInputEl).val();
        console.log(userCity);
        
        storeSearchHistory(userCity);
        queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=imperial&appid=${APIKEY}`;
        pullCityWeatherData();
    };
}
// });

const pullCityWeatherData = () => {

    forecastWeather = [];

    fetch(queryURL).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            if (res.status === 200) {

                console.log(`Status: ${res.status} OK`);
                console.log(res.data);

                // grab the required data from the response object
                // since we need the coordinates for the OneCall api, extract them
                currentCity.lat = res.data.coord.lat;
                currentCity.lon = res.data.coord.lon;
                currentCity.name = res.data.name;

                queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentCity.lat}&lon=${currentCity.lon}&units=imperial&appid=${APIKEY}`;
                pullCoordWeatherData();

            } else {
                console.log(`An error occurred. Status: ${res.status}`);
            }
        }));

}

const pullCoordWeatherData = () => {

    fetch(queryURL).then(response =>
        response.json().then(data => ({
            data: data,
            status: response.status
        })).then(res => {
            if (res.status === 200) {

                console.log(`Status: ${res.status} OK`);
                console.log(res.data);

                // grab the required data from the response object
                currentCity.date = new Date(res.data.current.dt * 1000).toLocaleDateString('en-US');
                currentCity.uvi = res.data.current.uvi;
                currentCity.temp = res.data.current.temp;
                currentCity.wind = res.data.current.wind_speed;
                currentCity.humidity = res.data.current.humidity;
                currentCity.icon = res.data.current.weather[0].icon;

                loadCurrentWeather();

                for (var i = 1; i < forecastLength + 1; i++) {
                    // start with a fresh object each iteration
                    let nextWeatherForcast = {};

                    // take everything needed from the response and store it
                    Object.assign(nextWeatherForcast, {
                        date: new Date(res.data.daily[i].dt * 1000).toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric'
                        }),
                        icon: res.data.daily[i].weather[0].icon,
                        temp: res.data.daily[i].temp.max,
                        wind: res.data.daily[i].wind_speed,
                        humi: res.data.daily[i].humidity,
                    });

                    // lastly, push that object to the array and repeat for all cards
                    forecastWeather.push(nextWeatherForcast);
                }

                loadFiveDayWeather();
            } else {
                console.log(`An error occurred. Status: ${res.status}`);
            }
        }));

}

const storeSearchHistory = (userSearchQuery) => {

    searchHistory.push(userSearchQuery);

    // set the local storage to include the new search
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

const loadCurrentWeather = () => {

    
    let currentWeatherEl = $("#right-div");
    currentWeatherEl.empty();

    //UV Index Color Change
    let uvIndexColor = 'green';

    if(currentCity.uvi >= 8) {
        uvIndexColor = 'darkpink';
    } else if(currentCity.uvi >= 6) {
        uvIndexColor = 'red';
    } else if(currentCity.uvi >= 3) {
        uvIndexColor = 'orange';
    } else {
        // Returns to default color
    }

    // Adding data to weather screen
    let date = $('<h1>')
        .text(`${currentCity.name} (${currentCity.date})`)
        .attr("style", "display: inline");
    let icon = $('<img>')
        .attr("src", `https://openweathermap.org/img/wn/${currentCity.icon}@2x.png`);
    let temp = $('<p>')
        .text(`Temp: ${currentCity.temp}°F`);
    let wind = $('<p>')
        .text(`Wind Speed: ${currentCity.wind} MPH`);
    let humi = $('<p>')
        .text(`Humidity: ${currentCity.humidity}%`);
    let uvi = $('<div><p></p></div>')
        .attr('style', `background-color: ${uvIndexColor}; width: max-content; padding: 0 5px;`)
        .find('p')
        .text(`UV Index: ${currentCity.uvi}`)
        .attr('style', 'color: white;')
        .end()

    currentWeatherEl.append(date)
        .append(icon)
        .append(temp)
        .append(wind)
        .append(humi)
        .append(uvi);
}

const loadFiveDayWeather = () => {

    for (var i = 0; i < forecastLength; i++) {
        let currentCard = $(`#card-${i}`);
        currentCard.children(".card-header").text('');
        currentCard.children(".card-body").empty();

        let date = $('<h3>')
            .text(forecastWeather[i].date);
        let icon = $('<img>')
            .attr("src", `https://openweathermap.org/img/wn/${forecastWeather[i].icon}@2x.png`);
        let temp = $('<p>')
            .text(`Temp: ${forecastWeather[i].temp}°F`);
        let wind = $('<p>')
            .text(`Wind: ${forecastWeather[i].wind} MPH`);
        let humi = $('<p>')
            .text(`Humidity: ${forecastWeather[i].humi}%`);

        currentCard.children(".card-header").append(date);
        currentCard.children(".card-body").append(icon)
            .append(temp)
            .append(wind)
            .append(humi);
    }
}

});
