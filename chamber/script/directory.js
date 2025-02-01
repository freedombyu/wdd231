document.addEventListener('DOMContentLoaded', () => {
  const membersContainer = document.getElementById('members');
  const gridViewBtn = document.getElementById('grid-view');
  const listViewBtn = document.getElementById('list-view');
  const searchInput = document.getElementById('search');
  const filterDropdown = document.getElementById('filter');

  let allMembers = [];

  // Fetch members data
  async function fetchMembers() {
      const response = await fetch('data/members.json');
      allMembers = await response.json();
      displayMembers(allMembers, 'grid');
  }

  // Display members based on view type (grid or list)
  function displayMembers(members, viewType) {
      membersContainer.className = viewType;
      const filteredMembers = filterMembers(members);
      membersContainer.innerHTML = filteredMembers
          .sort((a, b) => a.membershipLevel - b.membershipLevel)
          .map(member => `
              <div class="member-card ${getMembershipClass(member.membershipLevel)}">
                  <img src="images/${member.image}" alt="${member.name}">
                  <h3>${member.name}</h3>
                  <p>${member.address}</p>
                  <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                  <p class="membership">${getMembershipText(member.membershipLevel)}</p>
              </div>
          `)
          .join('');
  }

  // Filter members based on search input and membership level
  function filterMembers(members) {
      const searchText = searchInput.value.toLowerCase();
      const membershipFilter = parseInt(filterDropdown.value, 10);

      return members.filter(member => {
          const matchesSearch =
              member.name.toLowerCase().includes(searchText) ||
              member.address.toLowerCase().includes(searchText);
          const matchesFilter =
              membershipFilter === 0 || member.membershipLevel === membershipFilter;

          return matchesSearch && matchesFilter;
      });
  }

  // Get membership class based on level
  function getMembershipClass(level) {
      return level === 3 ? 'gold' : level === 2 ? 'silver' : 'member';
  }

  // Get membership text based on level
  function getMembershipText(level) {
      return level === 3 ? 'Gold Member' : level === 2 ? 'Silver Member' : 'Member';
  }

  // Handle view changes
  gridViewBtn.addEventListener('click', () => displayMembers(allMembers, 'grid'));
  listViewBtn.addEventListener('click', () => displayMembers(allMembers, 'list'));

  searchInput.addEventListener('input', () => displayMembers(allMembers, membersContainer.className));
  filterDropdown.addEventListener('change', () => displayMembers(allMembers, membersContainer.className));

  // Mobile menu toggle functionality
  document.getElementById('menu-toggle').addEventListener('click', function() {
      const menu = document.getElementById('menu');
      menu.classList.toggle('active');
  });

  // Membership Modal functionality
  const membershipCards = document.querySelectorAll('.card');
  membershipCards.forEach(card => {
      card.addEventListener('click', function(event) {
          const cardId = card.id;
          const modalId = `${cardId}-modal`;
          const modal = document.getElementById(modalId);
          modal.style.display = 'flex';
      });
  });

  // Close modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
      const closeBtn = modal.querySelector('.close');
      closeBtn.addEventListener('click', function() {
          modal.style.display = 'none';
      });
  });

  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
          event.target.style.display = 'none';
      }
  });

  // Contact Us modal functionality (optional placeholder)
  function openModal(id) {
      document.getElementById(id).style.display = 'flex';
  }
  
  function closeModal(id) {
      document.getElementById(id).style.display = 'none';
  }

  // Display the last modified date
  document.getElementById('lastModified').textContent = document.lastModified;

  fetchMembers();

  function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

  // Set member details from URL parameters
  const params = new URLSearchParams(window.location.search);
  document.getElementById("firstName").textContent = params.get("firstName") || "N/A";
  document.getElementById("lastName").textContent = params.get("lastName") || "N/A";
  document.getElementById("email").textContent = params.get("email") || "N/A";
  document.getElementById("mobile").textContent = params.get("mobile") || "N/A";
  document.getElementById("business").textContent = params.get("business") || "N/A";
  document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";
});
