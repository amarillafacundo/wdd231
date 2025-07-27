async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        
        const spotlightCandidates = data.members.filter(member =>
            member.membership === "Gold" || member.membership === "Silver"
        );

        
        const randomSpotlights = spotlightCandidates
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const container = document.getElementById("spotlights");

        randomSpotlights.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" width="100" height="100" loading="lazy">
        <h3>${member.name}</h3>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
      `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading spotlight data:", error);
    }
}

getSpotlights();
