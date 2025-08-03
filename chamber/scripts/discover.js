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

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.loading = 'lazy';

            const title = document.createElement('h3');
            title.textContent = item.name;

            const desc = document.createElement('p');
            desc.textContent = item.description;

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(desc);
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
