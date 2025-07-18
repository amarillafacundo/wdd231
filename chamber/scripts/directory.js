
document.getElementById("year").textContent = new Date().getFullYear();


document.getElementById("lastModified").textContent = `Last modified: ${document.lastModified}`;


const dataURL = "data/members.json"; 
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
    directoryContainer.innerHTML = ""; 
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        
        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo of ${member.name}" width="100" height="100">
            <h2>${member.name}</h2>
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
        case 3: return "Gold";
        case 2: return "Silver";
        case 1: return "Member";
        default: return "N/A";
    }
}


getMembers();


const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");

gridButton.addEventListener("click", () => {
    directoryContainer.classList.add("grid");
    directoryContainer.classList.remove("list");

    
    const memberCards = directoryContainer.querySelectorAll(".member-card");
    memberCards.forEach(card => {
        const img = card.querySelector("img");
        if (img) {
            img.style.display = "block"; 
        }
    });
});

listButton.addEventListener("click", () => {
    directoryContainer.classList.add("list");
    directoryContainer.classList.remove("grid");

    const memberCards = directoryContainer.querySelectorAll(".member-card");
    memberCards.forEach(card => {
        const img = card.querySelector("img");
        if (img) {
            img.style.display = "none";
        }
    });
});
