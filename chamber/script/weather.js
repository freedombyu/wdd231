document.addEventListener("DOMContentLoaded", () => {
    // Set the current year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Fetch Weather
    fetchWeather();

    // Load Spotlights
    loadSpotlights();

    // Menu Toggle for Mobile View
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("show");
    });
});

// Fetch Weather Data
async function fetchWeather() {
    const apiKey = "your_api_key_here";
    const city = "YourCity";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherContent = document.getElementById("weather-content");

        const currentWeather = data.list[0];
        weatherContent.innerHTML = `
            <p>Current Temperature: ${currentWeather.main.temp}°C</p>
            <p>Condition: ${currentWeather.weather[0].description}</p>
        `;
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}


// Dynamic Weather Section
const weatherSection = document.querySelector('.info .current-weather');

const weatherData = {
    temperature: '75°F',
    condition: 'Partly Cloudy',
    high: '85°F',
    low: '52°F',
    humidity: '34%',
    sunrise: '7:30am',
    sunset: '9:59pm'
};

if (weatherSection) {
    weatherSection.innerHTML = `
        <h3>Current Weather</h3>
        <p><strong>${weatherData.temperature}</strong></p>
        <p>${weatherData.condition}</p>
        <p>High: ${weatherData.high} | Low: ${weatherData.low}</p>
        <p>Humidity: ${weatherData.humidity}</p>
        <p>Sunrise: ${weatherData.sunrise}</p>
        <p>Sunset: ${weatherData.sunset}</p>
    `;
}


// Dynamic Events Section
const eventsSection = document.querySelector('.info .events');

const eventList = [
    { name: 'Annual Business Gala', date: 'March 15, 2025' },
    { name: 'Networking Breakfast', date: 'April 10, 2025' },
    { name: 'Startup Pitch Night', date: 'May 5, 2025' }
];

if (eventsSection) {
    eventsSection.innerHTML = '<h3>Upcoming Events</h3>';
    eventList.forEach(event => {
        const eventItem = document.createElement('p');
        eventItem.textContent = `${event.name} - ${event.date}`;
        eventsSection.appendChild(eventItem);
    });
}
