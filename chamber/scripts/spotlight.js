async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        
        const spotlightCandidates = members.filter(member =>
            member.membership === 2 || member.membership === 3
        );

        
        const randomSpotlights = spotlightCandidates
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        const container = document.getElementById("spotlights");

        randomSpotlights.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo">
        <h3>${member.name}</h3>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading spotlight data:", error);
    }
}

getSpotlights();
