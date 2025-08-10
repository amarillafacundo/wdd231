// Function to fetch workout data from data/workout.json
async function fetchWorkouts() {
    try {
        const response = await fetch('data/workout.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        renderWorkouts(data.workouts);
    } catch (error) {
        console.error('Could not fetch workouts:', error);
    }
}

// Function to render workout cards
function renderWorkouts(workouts) {
    const workoutContainer = document.querySelector('.workout-grid');
    workoutContainer.innerHTML = '';

    workouts.forEach(workout => {
        const workoutCard = document.createElement('div');
        workoutCard.classList.add('workout-card');
        workoutCard.innerHTML = `
            <img src="${workout.image}" alt="${workout.name}">
            <h2>${workout.name}</h2>
            <p>${workout.description}</p>
        `;
        workoutContainer.appendChild(workoutCard);
    });
}

document.addEventListener('DOMContentLoaded', fetchWorkouts);