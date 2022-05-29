var key = "3ec592439e8da5077918559215eac651"

var cityName = $("#citySearch").val()
let storedCity = JSON.parse(localStorage.getItem("City")) || [];




// var call = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key + "&units=imperial"

//var call = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latLon[0] + "&lon=" + latLon[1] + "&appid=" + key



var getWeather = function (cityName) {
    let weatherApiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key + "&units=imperial"
    fetch(weatherApiCall)
// call and response to and from the api
    .then(function (response) {
        //console.log(response)
      return response.json();
      
    })
    //information that was hard coded into the url
    .then(function (data) {
        if (data.cod !=="200"){
            return;
        } getCityInfo(dtat.coord.lat, data.city.coord.lon);
    })
    .catch(err => console.log(err));
};
      // $("#search-btn").on("click", function(){
//     getWeatherInfo()
// }) 

    var searchButton = document.getElementById("search-btn");
    searchButton.addEventListener("click", function () {
        cityName = $("#citySearch").val();
        getWeather(cityName);
        console.log(storedCity)
        storedCity.push(cityName);

        var addNewButton = document.createElement("button");
        addNewButton.setAttribute("class", "cityNames");
        addNewButton.textContent = cityName;
        $("#presetCities").append(addNewButton);
    
        localStorage.setItem("City", JSON.stringify(storedCity));
        addWeatherEventListener();
    });

    // Setting up date function
    let date = function (time) {
        let someDate = new Date();
        someDate.setTime(time * 1000);
        let dd = someDate.getDate();
        let mm = someDate.getMonth() + 1;
        let y = someDate.getFullYear();
        return mm + '/' + dd + '/' + y;
    };

    var getCityInfo = function (lat, lon) {
        let uvApi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key + '&units=metric'
        fetch(uvApi)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                $('.cityDate').html(cityName + " (" + date(data.current.dt) + ")" + `<img src="https://openweathermap.org/img/w/${data.current.weather[0].icon}.png" />`); // in the city variable
                $('.current-temp').text("Temp: " + data.current.temp + " °C");
                $('.current-windspeed').text("Wind: " + data.current.wind_speed + " MPH");
                $('.current-humidity').text("Humidity: " + data.current.humidity + " %");
                $('.current-uv').html("UV Index: " + `<span class="btnColor">${data.current.uvi}</span>`);
                fiveDayForecast(data);
    
                if (data.current.uvi <= 2) {
                    $(".btnColor").attr("class", "btn btn-success");
                };
                if (data.current.uvi > 2 && data.current.uvi <= 5) {
                    $(".btnColor").attr("class", "btn btn-warning");
                };
                if (data.current.uvi > 5) {
                    $(".btnColor").attr("class", "btn btn-danger");
                };
    
            });
    };

    var fiveDayForecast = function (data) {
        $('.fiveDayForecast').empty();
        for (let i = 1; i < 6; i++) {
            var day = $("<div class='day'><div />")
            $(day).append(date(data.daily[i].dt));
            $(day).append(`<img src="https://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>`);
            $(day).append("<p>Temp: " + data.daily[i].temp.day + " °C</p>");
            $(day).append("<p>Wind: " + data.daily[i].wind_speed + " MPH</p>");
            $(day).append("<p>Humidity: " + data.daily[i].humidity + " %</p>");
            $('.fiveDayForecast').append(day)
    
        };
    }  
    
       
       
    //     //console.log(data.main.temp)
    //     var lat = data.coord.lat
    //     var lon = data.coord.lon 
    //     var call2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + key + "&units=imperial"
           
    //     console.log(data)
    //     //fetching the second api call within the first
    //     fetch(call2)
    //         .then(function(response){
    //             return response.json();
    //         })
    //     .then (function(data){
           
    //         //console.log("test")
    //         //contine for all the data you need
    //         var currentTemp = data.current.temp
    //         var windSpeed = data.current.wind_speed
    //         var currentHumidity = data.current.humidity
    //         var currentUvIndex = data.current.uvi
    //       console.log(data)
    //         console.log(currentTemp)
    //         console.log(windSpeed)
    //         console.log(currentHumidity)
    //         console.log(currentUvIndex)

    //         var currentWeatherEl = $("#current-weather")
    //         var currentTempEl = $("#current-temp")
    //         var currentWindEl = $("#current-windspeed")
    //         var currentHumidityEl = $("#current-humidity")
    //         var currentUvEl = $("#current-uv")

    //         currentTempEl.text("Temp: " + currentTemp + "F")
    //         currentWindEl.text("Wind: " + windSpeed + "MPH")
    //         currentHumidityEl.text("Humidity: " + currentHumidity + "%")
    //         currentUvEl.text("Uv Index: " + currentUvIndex)

            

    //         //for (var i = 0; i < data.daily.length; i++){
    //             var forecastEl = $("#forecast")
    //         //add styling in p tag
    //         var displayTemp = $("<p>")
    //         var forecastTemp = data.daily[i].temp.day
    //         displayTemp.text("Temp" + forecastTemp + "F")
            
    //         var displayWind = $("<p>")
    //         var forecastWind = data.daily[i].weather.wind_speed
    //         displayWind.text("Wind" + forecastWind + "MPH")

    //         var displayHumidity = $("<p>")
    //         var forcastHumidity = data.daily[i].feels_like.humidity
    //         displayHumidity.text("Humidity" + forcastHumidity + "%")

    //         var displayUv = $("<p>")
    //         var forecastUv = data.daily[i].uvi
    //         displayUv.text("Uv Index: " + forecastUv)
    //         }


    //     )}
        
        
            
            
    

    
    

    // )};




//getWeatherInfo()