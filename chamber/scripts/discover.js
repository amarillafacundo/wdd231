document.addEventListener('DOMContentLoaded', () => {
    updateVisitMessage();
    fetchInterestItems();
    updateFooter();
});

function updateVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');

    const now = Date.now();
    if (lastVisit) {
        const diffInDays = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
        visitMessage.textContent = diffInDays === 0
            ? "Welcome back! You visited today."
            : `Welcome back! It's been ${diffInDays} day${diffInDays > 1 ? 's' : ''} since your last visit.`;
    } else {
        visitMessage.textContent = "Welcome! This is your first visit.";
    }

    localStorage.setItem('lastVisit', now.toString());
}

async function fetchInterestItems() {
    const grid = document.getElementById('interests-grid');
    try {
        const response = await fetch('data/interests.json');
        const data = await response.json();

        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('interest-card');

            const h2 = document.createElement('h2');
            h2.textContent = item.title;

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.alt;
            img.loading = "lazy";
            img.width = 400;
            img.height = 300;
            figure.appendChild(img);

            const address = document.createElement('address');
            address.textContent = item.address; // Assuming "address" field is now in JSON

            const desc = document.createElement('p');
            desc.textContent = item.description;

            const button = document.createElement('button');
            button.textContent = "Learn More";

            card.appendChild(h2);
            card.appendChild(figure);
            card.appendChild(address);
            card.appendChild(desc);
            card.appendChild(button);
            grid.appendChild(card);
        });
    } catch (error) {
        grid.textContent = "Unable to load interest items.";
        console.error("Error loading interests:", error);
    }
}

function updateFooter() {
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
}
