document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.sidebar');
    const showSidebarButton = document.getElementById("nav-toggle");
    const hideSidebarButton = document.querySelector('.sidebar > li');

    if (sidebar && showSidebarButton && hideSidebarButton) {
        showSidebarButton.addEventListener('click', showSidebar);
        hideSidebarButton.addEventListener('click', hideSidebar);
    }

    fetchAndCache("services.json", "servicesCache")
        .then(displayServices);

    fetchAndCache("https://api.openweathermap.org/data/2.5/weather?q=New York&appid=YOUR_API_KEY&units=metric", "weatherCache")
        .then(displayWeather);
});

function showSidebar() {
    document.querySelector('.sidebar').style.display = 'flex';
}

function hideSidebar() {
    document.querySelector('.sidebar').style.display = 'none';
}

function fetchAndCache(url, cacheKey) {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) return Promise.resolve(JSON.parse(cachedData));

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem(cacheKey, JSON.stringify(data));
            return data;
        })
        .catch(error => console.error('Error fetching data:', error));
}
document.addEventListener("DOMContentLoaded", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            document.getElementById("location-info").innerText = 
                `We offer IT solutions near your location: [${latitude}, ${longitude}]`;
        });
    } else {
        document.getElementById("location-info").innerText = 
            "Location services are not supported in your browser.";
    }
});
async function fetchTechNews() {
    try {
        const response = await fetch(
            "https://newsapi.org/v2/everything?q=technology&apiKey=YOUR_NEWSAPI_KEY"
        );
        const data = await response.json();

        const newsContainer = document.getElementById("tech-news");
        newsContainer.innerHTML = ""; // Clear existing content

        data.articles.slice(0, 3).forEach((article) => {
            newsContainer.innerHTML += `
                <div class="news-item">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read More</a>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching news:", error);
        document.getElementById("tech-news").innerText = 
            "Failed to load tech news.";
    }
}

document.addEventListener("DOMContentLoaded", fetchTechNews);

async function loadServices() {
    const response = await fetch("services.json");
    const services = await response.json();

    const servicesContainer = document.getElementById("services-list");
    servicesContainer.innerHTML = "";

    services.forEach((service) => {
        servicesContainer.innerHTML += `
            <div class="service-item">
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            </div>
        `;
    });
}

document.addEventListener("DOMContentLoaded", loadServices);

async function getChatbotResponse(userInput) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userInput }]
        })
    });

    const data = await response.json();
    document.getElementById("chatbot-response").innerText = data.choices[0].message.content;
}

document.getElementById("chatbot-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const userInput = document.getElementById("chatbot-input").value;
    getChatbotResponse(userInput);
});
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
});

document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);



