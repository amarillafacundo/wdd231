// --- Member Spotlights Implementation ---

const membersDataURL = "data/members.json"; // Your members.json file
const spotlightMembersDiv = document.getElementById("spotlight-members");

async function loadSpotlightMembers() {
    try {
        const response = await fetch(membersDataURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();

        // Filter for Gold (3) and Silver (2) members
        const eligibleMembers = members.filter(member =>
            member.membership === 3 || member.membership === 2
        );

        // Shuffle the eligible members and pick the first 2 or 3
        const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedSpotlights = shuffledMembers.slice(0, 3); // Get up to 3 random members

        displaySpotlights(selectedSpotlights);

    } catch (error) {
        console.error("Error loading member spotlight data:", error);
        if (spotlightMembersDiv) {
            spotlightMembersDiv.innerHTML = "<p>Could not load member spotlights.</p>";
        }
    }
}

function displaySpotlights(spotlights) {
    if (!spotlightMembersDiv) return; // Exit if div not found

    spotlightMembersDiv.innerHTML = ""; // Clear existing content

    if (spotlights.length === 0) {
        spotlightMembersDiv.innerHTML = "<p>No Gold or Silver members to spotlight at this time.</p>";
        return;
    }

    spotlights.forEach(member => {
        const spotlightCard = document.createElement("div");
        spotlightCard.classList.add("spotlight-card"); // Add a class for styling

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

// Call the function to load member spotlights when the page loads
loadSpotlightMembers();