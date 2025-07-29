// Function to set the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Function to set the last modified date in the footer
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;


// --- Weather API Implementation ---

const weatherAPIKey = "3c1670f2e8991afe549132fd8c765953"
const city = "Santa Fe, AR"; 
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPIKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${weatherAPIKey}`;

const weatherInfoDiv = document.getElementById("weather-info");
const forecastInfoDiv = document.getElementById("forecast-info");


async function getWeatherData() {
    try {
        
        const currentWeatherResponse = await fetch(weatherURL);
        if (!currentWeatherResponse.ok) {
            throw new Error(`HTTP error! status: ${currentWeatherResponse.status}`);
        }
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);

       
        const forecastResponse = await fetch(forecastURL);
        if (!forecastResponse.ok) {
            throw new Error(`HTTP error! status: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        if (weatherInfoDiv) {
            weatherInfoDiv.innerHTML = "<p>Could not load weather data.</p>";
        }
        if (forecastInfoDiv) {
            forecastInfoDiv.innerHTML = "<p>Could not load forecast data.</p>";
        }
    }
}

function displayCurrentWeather(data) {
    if (!weatherInfoDiv) return; 

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed; 

    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

    weatherInfoDiv.innerHTML = `
        <p><img src="${iconURL}" alt="${description}" class="weather-icon"> ${temp.toFixed(0)}&deg;F - ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed.toFixed(1)} mph</p>
    `;
}

function displayForecast(data) {
    if (!forecastInfoDiv) return; 

    forecastInfoDiv.innerHTML = ""; 

    
    const uniqueForecastDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    for (let i = 0; i < data.list.length; i++) {
        const forecastDate = new Date(data.list[i].dt * 1000); 
        forecastDate.setHours(0, 0, 0, 0); 
        
        if (forecastDate > today && !uniqueForecastDays.some(day => day.getTime() === forecastDate.getTime())) {
            uniqueForecastDays.push(forecastDate);
            if (uniqueForecastDays.length >= 3) {
                break; 
            }
        }
    }

    
    uniqueForecastDays.forEach(day => {
        const matchingEntry = data.list.find(entry => {
            const entryDate = new Date(entry.dt * 1000);
            entryDate.setHours(0, 0, 0, 0);
            
            return entryDate.getTime() === day.getTime() && entry.dt_txt.includes("12:00:00") || entry.dt_txt.includes("15:00:00");
        }) || data.list.find(entry => new Date(entry.dt * 1000).setHours(0, 0, 0, 0) === day.getTime()); 

        if (matchingEntry) {
            const date = new Date(matchingEntry.dt * 1000);
            const temp = matchingEntry.main.temp;
            const iconCode = matchingEntry.weather[0].icon;
            const description = matchingEntry.weather[0].description;
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-card");
            forecastCard.innerHTML = `
                <p><strong>${dayName}</strong></p>
                <img src="${iconURL}" alt="${description}" class="weather-icon-small">
                <p>${temp.toFixed(0)}&deg;F</p>
                <p class="description-small">${description}</p>
            `;
            forecastInfoDiv.appendChild(forecastCard);
        }
    });
}


getWeatherData();
