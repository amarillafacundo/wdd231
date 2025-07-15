// Display the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Display the last modified date
document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;

// Fetch and display member data
const dataURL = "data/members.json"; // Ensure your members.json is in a 'data' folder
const directoryContainer = document.getElementById("directory");

async function getMembers() {
    try {
        const response = await fetch(dataURL);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error loading member data:", error);
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = ""; // Clear existing content

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        // Dynamically add content including image
        card.innerHTML = `
    <img src="images/${member.image}" alt="Logo of ${member.name}" width="100" height="100"> <h2>${member.name}</h2>
    <p><strong>Address:</strong> ${member.address}</p>
    <p><strong>Phone:</strong> ${member.phone}</p>
    <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
    <p class="level">Membership: ${getMembershipLabel(member.membership)}</p>
    `;

        directoryContainer.appendChild(card);
    });
}

function getMembershipLabel(level) {
    switch (level) {
        case 3:
            return "Gold";
        case 2:
            return "Silver";
        case 1:
            return "Member";
        default:
            return "N/A";
    }
}

// Initial call to fetch and display members when the page loads
getMembers();

// View toggle functionality
const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");

gridButton.addEventListener("click", () => {
    directoryContainer.classList.add("grid");
    directoryContainer.classList.remove("list");

    // Show images when in Grid View
    const memberCards = directoryContainer.querySelectorAll(".member-card");
    memberCards.forEach(card => {
        const img = card.querySelector("img");
        if (img) {
            img.style.display = "block"; // Or use "" to revert to default display
        }
    });
});

listButton.addEventListener("click", () => {
    directoryContainer.classList.add("list");
    directoryContainer.classList.remove("grid");

    // Hide images when in List View
    const memberCards = directoryContainer.querySelectorAll(".member-card");
    memberCards.forEach(card => {
        const img = card.querySelector("img");
        if (img) {
            img.style.display = "none";
        }
    });
});