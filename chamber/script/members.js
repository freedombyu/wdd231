document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('directory-container');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    // Fetch data from JSON
    async function fetchMembers() {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    }

    // Display members
    function displayMembers(members) {
        container.innerHTML = '';
        members.forEach(member => {
            const card = document.createElement('div');
            card.className = 'member-card';
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            `;
            container.appendChild(card);
        });
    }

    // Toggle views
    gridViewButton.addEventListener('click', () => {
        container.className = 'grid-view';
    });

    listViewButton.addEventListener('click', () => {
        container.className = 'list-view';
    });

    // Footer updates
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    fetchMembers();
});
