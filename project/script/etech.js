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

document.addEventListener("DOMContentLoaded", async function () {
    const container = document.getElementById("items-container");
    const modal = document.getElementById("modal");
    const closeModal = document.querySelector(".close-btn");
    
    async function fetchData() {
        try {
            const response = await fetch("data/items.json"); // Fetch JSON data
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            displayItems(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            container.innerHTML = "<p>Failed to load data. Please try again later.</p>";
        }
    }

    function displayItems(items) {
        container.innerHTML = "";
        items.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("item-card");
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p><strong>Category:</strong> ${item.category}</p>
                <button class="view-more" data-index="${index}">View More</button>
            `;
            container.appendChild(card);
        });
        attachModalListeners(items);
    }

    function attachModalListeners(items) {
        document.querySelectorAll(".view-more").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                openModal(items[index]);
            });
        });
    }

    function openModal(item) {
        document.getElementById("modal-title").textContent = item.title;
        document.getElementById("modal-image").src = item.image;
        document.getElementById("modal-image").alt = item.title;
        document.getElementById("modal-description").textContent = item.description;
        document.getElementById("modal-category").textContent = item.category;
        document.getElementById("modal-price").textContent = item.price;
        modal.style.display = "block";
    }

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    await fetchData();
});





