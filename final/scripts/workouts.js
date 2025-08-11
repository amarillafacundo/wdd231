// Function to fetch workout data from data/workout.json
async function fetchWorkouts() {
    try {
        const response = await fetch('data/workout.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderWorkouts(data.workouts);
        setupFilter(data.workouts);
    } catch (error) {
        console.error('Could not fetch workouts:', error);
    }
}

// Function to render workout cards
function renderWorkouts(workouts) {
    const workoutContainer = document.querySelector('.workout-grid'); // Corrected to use your class name
    if (!workoutContainer) {
        console.error('Workout grid container not found.');
        return;
    }
    workoutContainer.innerHTML = '';

    workouts.forEach(workout => {
        const workoutCard = document.createElement('div');
        workoutCard.classList.add('workout-card');
        workoutCard.innerHTML = `
            <img src="${workout.image}" alt="${workout.name}" loading="lazy">
            <h3>${workout.name}</h3>
            <p><strong>Difficulty:</strong> ${workout.difficulty}</p>
            <p><strong>Duration:</strong> ${workout.duration}</p>
            <button class="favorite-button" data-id="${workout.id}">
                ${isFavorite(workout.id) ? '❤️' : '🤍'}
            </button>
            <button class="details-button" data-id="${workout.id}">More Info</button>
        `;
        workoutContainer.appendChild(workoutCard);
    });

    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', toggleFavorite);
    });
    document.querySelectorAll('.details-button').forEach(button => {
        button.addEventListener('click', showModal);
    });
}

// Function to check if a workout is a favorite
function isFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favoriteWorkouts')) || [];
    return favorites.includes(id);
}

// Function to toggle favorite status
function toggleFavorite(event) {
    const workoutId = event.target.dataset.id;
    let favorites = JSON.parse(localStorage.getItem('favoriteWorkouts')) || [];
    const index = favorites.indexOf(workoutId);

    if (index > -1) {
        favorites.splice(index, 1);
        event.target.textContent = '🤍';
    } else {
        favorites.push(workoutId);
        event.target.textContent = '❤️';
    }
    localStorage.setItem('favoriteWorkouts', JSON.stringify(favorites));
}

// Function to show workout details in a modal
function showModal(event) {
    const workoutId = event.target.dataset.id;
    fetch('data/workout.json')
        .then(response => response.json())
        .then(data => {
            const workout = data.workouts.find(w => w.id === workoutId);
            if (workout) {
                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <h3>${workout.name}</h3>
                    <p><strong>Difficulty:</strong> ${workout.difficulty}</p>
                    <p><strong>Duration:</strong> ${workout.duration}</p>
                    <p>${workout.description}</p>
                    <p><strong>Exercises:</strong></p>
                    <ul>
                        ${workout.exercises.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                    <button class="close-button">Close</button>
                `;
                const modal = document.querySelector('#workout-modal');
                modal.style.display = 'block';

                document.querySelector('.close-button').addEventListener('click', () => {
                    modal.style.display = 'none';
                });
            }
        });
}

// Function to set up the filter by difficulty
function setupFilter(workouts) {
    const filterSelect = document.querySelector('#difficulty-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (event) => {
            const difficulty = event.target.value;
            const filteredWorkouts = difficulty === 'all'
                ? workouts
                : workouts.filter(w => w.difficulty.toLowerCase() === difficulty);
            renderWorkouts(filteredWorkouts);
        });
    }
}

document.addEventListener('DOMContentLoaded', fetchWorkouts);