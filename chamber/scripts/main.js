// Function to set the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Function to set the last modified date in the footer
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;


// --- Weather API Implementation ---

const weatherAPIKey = "3c1670f2e8991afe549132fd8c765953"; // <<-- REPLACE THIS WITH YOUR ACTUAL API KEY -->>
const city = "Santa Fe, AR"; // City and country code for Santa Fe, Argentina
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherAPIKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${weatherAPIKey}`;

const weatherInfoDiv = document.getElementById("weather-info");
const forecastInfoDiv = document.getElementById("forecast-info");


async function getWeatherData() {
    try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(weatherURL);
        if (!currentWeatherResponse.ok) {
            throw new Error(`HTTP error! status: ${currentWeatherResponse.status}`);
        }
        const currentWeatherData = await currentWeatherResponse.json();
        displayCurrentWeather(currentWeatherData);

        // Fetch 3-day forecast (OpenWeatherMap's 'forecast' API provides 5-day / 3-hour data)
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
    if (!weatherInfoDiv) return; // Exit if div not found

    const temp = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed; // Wind speed in mph since units=imperial

    const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

    weatherInfoDiv.innerHTML = `
        <p><img src="${iconURL}" alt="${description}" class="weather-icon"> ${temp.toFixed(0)}&deg;F - ${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed.toFixed(1)} mph</p>
    `;
}

function displayForecast(data) {
    if (!forecastInfoDiv) return; // Exit if div not found

    forecastInfoDiv.innerHTML = ""; // Clear previous content

    // Filter for unique days (e.g., around noon for each day)
    // The API provides data every 3 hours. We want one entry per day for 3 days.
    const uniqueForecastDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    for (let i = 0; i < data.list.length; i++) {
        const forecastDate = new Date(data.list[i].dt * 1000); // Convert timestamp to Date object
        forecastDate.setHours(0, 0, 0, 0); // Normalize to start of day

        // Check if this date is already added and if it's within the next 3 days (excluding today)
        if (forecastDate > today && !uniqueForecastDays.some(day => day.getTime() === forecastDate.getTime())) {
            uniqueForecastDays.push(forecastDate);
            if (uniqueForecastDays.length >= 3) {
                break; // We only need the next 3 days
            }
        }
    }

    // Now, iterate through the original list and find the data for the selected forecast days (e.g., around midday)
    uniqueForecastDays.forEach(day => {
        const matchingEntry = data.list.find(entry => {
            const entryDate = new Date(entry.dt * 1000);
            entryDate.setHours(0, 0, 0, 0);
            // Find an entry for the day, ideally around noon (12:00-15:00)
            return entryDate.getTime() === day.getTime() && entry.dt_txt.includes("12:00:00") || entry.dt_txt.includes("15:00:00");
        }) || data.list.find(entry => new Date(entry.dt * 1000).setHours(0, 0, 0, 0) === day.getTime()); // Fallback to any entry for the day

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

// Call the function to get weather data when the page loads
getWeatherData();

// --- Member Spotlights Implementation ---

const membersDataURL = "data/members.json"; // Your members.json file
const spotlightMembersDiv = document.getElementById("spotlight-members");

async function loadSpotlightMembers() {
    try {
        const response = await fetch(membersDataURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();

        // Filter for Gold (3) and Silver (2) members
        const eligibleMembers = members.filter(member =>
            member.membership === 3 || member.membership === 2
        );

        // Shuffle the eligible members and pick the first 2 or 3
        const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffledMembers.slice(0, 3); // Get up to 3 random members

        displaySpotlights(selectedSpotlights);

    } catch (error) {
        console.error("Error loading member spotlight data:", error);
        if (spotlightMembersDiv) {
            spotlightMembersDiv.innerHTML = "<p>Could not load member spotlights.</p>";
        }
    }
}

function displaySpotlights(spotlights) {
    if (!spotlightMembersDiv) return; // Exit if div not found

    spotlightMembersDiv.innerHTML = ""; // Clear existing content

    if (spotlights.length === 0) {
        spotlightMembersDiv.innerHTML = "<p>No Gold or Silver members to spotlight at this time.</p>";
        return;
    }

    spotlights.forEach(member => {
        const spotlightCard = document.createElement("div");
        spotlightCard.classList.add("spotlight-card"); // Add a class for styling

        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="Logo of ${member.name}" width="80" height="80">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership:</strong> ${getMembershipLabel(member.membership)}</p>
        `;
        spotlightMembersDiv.appendChild(spotlightCard);
    });
}

// Reuse the getMembershipLabel function from your directory.js if not already in main.js
// If you moved it from directory.js to main.js:
// function getMembershipLabel(level) {
//     switch (level) {
//         case 3: return "Gold";
//         case 2: return "Silver";
//         case 1: return "Member";
//         default: return "N/A";
//     }
// }

// Call the function to load member spotlights when the page loads
loadSpotlightMembers();