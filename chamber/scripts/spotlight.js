async function getSpotlightMembers() {
    const response = await fetch('data/members.json');
    const data = await response.json();

    
    const spotlightCandidates = data.filter(member =>
        member.membership === "Gold" || member.membership === "Silver"
    );

    
    spotlightCandidates.sort(() => 0.5 - Math.random());

    
    const selected = spotlightCandidates.slice(0, 3);

    const spotlightContainer = document.getElementById('spotlight-members');
    spotlightContainer.innerHTML = '';

    selected.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

        spotlightContainer.appendChild(card);
    });
}

getSpotlightMembers();

