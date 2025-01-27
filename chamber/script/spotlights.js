const spotlightContainer = document.querySelector(".spotlights-container");

const members = [
    {
        name: "Elite Tech Solutions",
        logo: "/chamber/image/elight_tech.jpg",
        phone: "(904) 309-59900",
        address: "7595 Baymeadows Way, Jacksonville, FL 32256, United States",
        website: "https://elite-tech-solutions.com",
        level: "gold",
    },
    {
        name: "Horizon Marketing",
        logo: "/chamber/image/horizon_icon.jpg",
        phone: "(310) 734-1493",
        address: "Based out of Southern California with offices in Orange County and LA County",
        website: "https://horizonmarketing.co",
        level: "silver",
    },
    {
        name: "Oceanview Resort",
        logo: "/chamber/image/oceanview-resort-logo.avif",
        phone: "(709)-927-5288",
        address: "West St. Modeste Newfoundland & Labrador, Canada A0K 5S0",
        website: "http://www.oceanviewresort.ca/home/",
        level: "silver",
    },    
];

function getSpotlightMembers() {
    // Filter only gold and silver members
    const eligibleMembers = members.filter(
        (member) => member.level === "gold" || member.level === "silver"
    );
    // Shuffle and select up to 3 members
    return eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
}

function displaySpotlights() {
    const selectedMembers = getSpotlightMembers();
    spotlightContainer.innerHTML = selectedMembers
        .map(
            (member) => `
            <div>
                <img src="${member.logo}" alt="${member.name} logo" width="100">
                <h3>${member.name}</h3>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p><strong>Membership Level:</strong> ${member.level}</p>
            </div>
        `
        )
        .join("");
}

displaySpotlights();
