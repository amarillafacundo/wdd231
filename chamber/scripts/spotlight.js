// --- Member Spotlights Implementation ---

const membersDataURL = "data/members.json"; 
const spotlightMembersDiv = document.getElementById("spotlight-members");

async function loadSpotlightMembers() {
    try {
        const response = await fetch(membersDataURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();

        
        const eligibleMembers = members.filter(member =>
            member.membership === 3 || member.membership === 2
        );

        
        const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffledMembers.slice(0, 3); 

        displaySpotlights(selectedSpotlights);

    } catch (error) {
        console.error("Error loading member spotlight data:", error);
        if (spotlightMembersDiv) {
            spotlightMembersDiv.innerHTML = "<p>Could not load member spotlights.</p>";
        }
    }
}

function displaySpotlights(spotlights) {
    if (!spotlightMembersDiv) return; 
    spotlightMembersDiv.innerHTML = ""; 
    if (spotlights.length === 0) {
        spotlightMembersDiv.innerHTML = "<p>No Gold or Silver members to spotlight at this time.</p>";
        return;
    }

    spotlights.forEach(member => {
        const spotlightCard = document.createElement("div");
        spotlightCard.classList.add("spotlight-card"); 

        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="Logo of ${member.name}" width="80" height="80">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Membership:</strong> ${getMembershipLabel(member.membership)}</p>
        `;
        spotlightMembersDiv.appendChild(spotlightCard);
    });
}

function getMembershipLabel(level) {
    switch (level) {
        case 3: return "Gold";
        case 2: return "Silver";
        case 1: return "Member";
        default: return "N/A";
    }
}


loadSpotlightMembers();