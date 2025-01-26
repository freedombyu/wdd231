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

// Load Spotlights
function loadSpotlights() {
    const members = [
        { name: "Gold Business", level: "gold", logo: "images/gold.png", phone: "123-456-7890", address: "123 Gold St", website: "https://gold.com" },
        { name: "Silver Business", level: "silver", logo: "images/silver.png", phone: "234-567-8901", address: "456 Silver St", website: "https://silver.com" },
    ];

    const spotlightContainer = document.getElementById("spotlight-container");

    members.forEach((member) => {
        const card = document.createElement("div");
        card.className = "member-card";
        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
        `;
        spotlightContainer.appendChild(card);
    });
}
