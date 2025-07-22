const apiKey = "3c1670f2e8991afe549132fd8c765953";
const lat = -31.6333;
const lon = -60.7000;
const units = "metric";
const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

async function getWeather() {
    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error("Weather data fetch failed.");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("current-temp").textContent = `🌡️ ${temp} °C`;
    document.getElementById("weather-icon").setAttribute("src", iconURL);
    document.getElementById("weather-icon").setAttribute("alt", desc);
    document.getElementById("weather-desc").textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

getWeather();
