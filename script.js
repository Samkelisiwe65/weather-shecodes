 <script>
        function refreshWeather(response) {
            let temperatureElement = document.querySelector("#temperature");
            let cityElement = document.querySelector("#city");
            let descriptionElement = document.querySelector("#description");
            let humidityElement = document.querySelector("#humidity");
            let windElement = document.querySelector("#wind-speed");
            temperatureElement.innerHTML = Math.round(response.data.main.temp);
            descriptionElement.innerHTML = response.data.weather[0].description;
            humidityElement.innerHTML = `${response.data.main.humidity}%`;
            windElement.innerHTML = `${response.data.wind.speed} km/h`;
        }

        function updateTime() {
            let now = new Date();
            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day = days[now.getDay()];
            let hours = now.getHours().toString().padStart(2, "0");
            let minutes = now.getMinutes().toString().padStart(2, "0");
            let formattedTime = `${day} ${hours}:${minutes};

        }

        function searchCity(city) {
            let apiKey = "43de0b07896346afb5b4f4f011771529";
            let apiUrl = https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            axios.get(apiUrl).then(refreshWeather);
        }

        function handlerSubmit(event) {
            event.preventDefault();
            let searchInput = document.querySelector("#search-form-input");
            let cityElement = document.querySelector("#city");
            cityElement.innerHTML = searchInput.value;
            searchCity(searchInput.value);
        }
         let searchFormElement = document.querySelector("#search-form");
         searchFormElement.addEventListener("submit", handlerSubmit);

        function refreshForecast(response) {
        let forecastElement = document.querySelector("#forecast");
        forecastElement.innerHTML = ""; // Clear previous forecast

        let forecastData = response.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
    );

        forecastData.forEach((forecast) => {
        let day = new Date(forecast.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
        });
        let icon = forecast.weather[0].icon;
        let temperature = Math.round(forecast.main.temp);

        forecastElement.innerHTML += `
            <div class="forecast-day">
                <div>${day}</div>
                <div class="forecast-icon">
                    <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${forecast.weather[0].description}" />
                </div>
                <strong>${temperature}°C</strong>
            </div>
        `;
    });
}

function searchCity(city) {
    let apiKey = "43de0b07896346afb5b4f4f011771529";
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(weatherUrl).then(refreshWeather);
    axios.get(forecastUrl).then(refreshForecast);
}

    </script>
