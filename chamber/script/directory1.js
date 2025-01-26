// Fetch Weather Data
async function fetchWeather() {
    const apiKey = 'your_api_key_here'; // Replace with your OpenWeatherMap API key
    const city = 'YourCity'; // Replace with your chamber location
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherInfo = document.getElementById('weather-info');

        const currentWeather = data.list[0];
        const forecast = data.list.slice(1, 4); // Next 3 entries

        weatherInfo.innerHTML = `
            <p><strong>Current Temperature:</strong> ${currentWeather.main.temp}°C</p>
            <p><strong>Condition:</strong> ${currentWeather.weather[0].description}</p>
            <h3>3-Day Forecast:</h3>
            <ul>
                ${forecast.map(day => `<li>${new Date(day.dt * 1000).toDateString()}: ${day.main.temp}°C, ${day.weather[0].description}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Unable to load weather data at this time.</p>';
    }
}

// Load Spotlight Members
function loadSpotlights() {
    const members = [
        { name: 'Gold Business 1', level: 'gold', logo: 'images/gold1.png', phone: '123-456-7890', address: '123 Gold St', website: 'https://gold1.com' },
        { name: 'Silver Business 1', level: 'silver', logo: 'images/silver1.png', phone: '234-567-8901', address: '456 Silver St', website: 'https://silver1.com' },
        { name: 'Gold Business 2', level: 'gold', logo: 'images/gold2.png', phone: '345-678-9012', address: '789 Gold Ave', website: 'https://gold2.com' },
        { name: 'Silver Business 2', level: 'silver', logo: 'images/silver2.png', phone: '456-789-0123', address: '101 Silver Blvd', website: 'https://silver2.com' }
    ];

    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';

    // Filter gold and silver members and select 2-3 random ones
    const eligibleMembers = members.filter(member => member.level === 'gold' || member.level === 'silver');
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    shuffled.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');
        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name}" style="width: 100px; height: auto;">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
            <p class="${member.level}"><strong>Membership Level:</strong> ${member.level}</p>
        `;
        spotlightContainer.appendChild(card);
    });
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
    loadSpotlights();
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Populate Business Listings Section
const businessListings = document.getElementById("business-listings");
data.businesses.forEach(business => {
    const card = document.createElement("div");
    card.className = "business-card";
    card.innerHTML = `
        <h3>${business.name}</h3>
        <p>${business.tagline}</p>
        <p>Email: ${business.email}</p>
        <p>Phone: ${business.phone}</p>
        <p>URL: <a href="http://${business.url}" target="_blank">${business.url}</a></p>
    `;
    businessListings.appendChild(card);
});

// Example Button Event Listener
document.getElementById("keynote-btn").addEventListener("click", () => {
    alert("Keynote Tickets coming soon!");
});
