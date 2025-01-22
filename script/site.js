document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const searchInput = document.getElementById('search');
    const filterDropdown = document.getElementById('filter');
  
    let allMembers = [];
  
    async function fetchMembers() {
      const response = await fetch('data/members.json');
      allMembers = await response.json();
      displayMembers(allMembers, 'grid');
    }
  
    function displayMembers(members, viewType) {
      membersContainer.className = viewType;
      const filteredMembers = filterMembers(members);
      membersContainer.innerHTML = filteredMembers
        .sort((a, b) => a.membershipLevel - b.membershipLevel)
        .map(member => `
          <div class="member-card ${getMembershipClass(member.membershipLevel)}">
            <img src="image/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p class="membership">${getMembershipText(member.membershipLevel)}</p>
          </div>
        `)
        .join('');
    }
  
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
  
    function getMembershipClass(level) {
      return level === 3 ? 'gold' : level === 2 ? 'silver' : 'member';
    }
  
    function getMembershipText(level) {
      return level === 3 ? 'Gold Member' : level === 2 ? 'Silver Member' : 'Member';
    }
  
    gridViewBtn.addEventListener('click', () => displayMembers(allMembers, 'grid'));
    listViewBtn.addEventListener('click', () => displayMembers(allMembers, 'list'));
  
    searchInput.addEventListener('input', () => displayMembers(allMembers, membersContainer.className));
    filterDropdown.addEventListener('change', () => displayMembers(allMembers, membersContainer.className));
  
    // Set the last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
  
    fetchMembers();
  });
  