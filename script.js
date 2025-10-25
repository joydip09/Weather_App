const WeatherForm = document.getElementById('WeatherForm');
const CityInput = document.getElementById('CityInput');
const card = document.querySelector('.parent');
const apiKey = '9c5cb4cd9eb658f2f2bf0b71238da512';

WeatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = CityInput.value;
    
    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }

});

async function getWeatherData(city) {
const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(api_url);
    console.log(response);

    if (!response.ok) {
        throw new Error('City not found');
    }

    return await response.json();
};

function displayWeatherInfo(data) {
    const {name: city, 
           main: {temp, feels_like, humidity},
           weather: [{description, id}]} = data;
    
    card.textContent = '';
    card.style.display = 'grid';

    const cityDisplay = document.createElement("div");
    const Temperature = document.createElement("div");
    const FeelsLike = document.createElement("div");
    const Humidity = document.createElement("div");
    const Emoji = document.createElement("div");
    const Description = document.createElement("div");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("CityName");
    card.appendChild(cityDisplay);

    Temperature.textContent = `Temperature: ${(temp - 273.15).toFixed(0)} °C`;
    Temperature.classList.add("Temperature");
    card.appendChild(Temperature);

    FeelsLike.textContent = `Feels Like: ${(feels_like - 273.15).toFixed(0)} °C`;
    FeelsLike.classList.add("FeelsLike");
    card.appendChild(FeelsLike);

    Humidity.textContent = `Humidity: ${humidity} %`;
    Humidity.classList.add("Humidity");
    card.appendChild(Humidity);

    Description.textContent = description;
    Description.classList.add("Description");
    card.appendChild(Description);

    Emoji.textContent = getWeatherEmoji(id);
    Emoji.classList.add("Emoji");
    card.appendChild(Emoji);


};

function getWeatherEmoji(weatherId) {
    switch (true) {
        case weatherId >= 200 && weatherId < 300:
            return "⛈️"; // Thunderstorm
        case weatherId >= 300 && weatherId < 500:
            return "🌦️"; // Drizzle
        case weatherId >= 500 && weatherId < 600:
            return "🌧️"; // Rain
        case weatherId >= 600 && weatherId < 700:
            return "❄️"; // Snow
        case weatherId >= 700 && weatherId < 800:
            return "🌫️"; // Fog
        case weatherId === 800:
            return "☀️"; // Clear
        case weatherId > 800 && weatherId < 900:
            return "☁️"; // Clouds
        default:
            return "👽"; // Unknown
    }
};

function getWeatherImage(weatherId) {

};

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);

};
