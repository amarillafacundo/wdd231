
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");

    if (timestampField) {
        const now = new Date().toISOString();
        timestampField.value = now;
    }
});

// Modal logic
const modalButtons = document.querySelectorAll(".modal-btn");
const closeButtons = document.querySelectorAll(".close-btn");
const modals = document.querySelectorAll(".modal");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = "block";
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest(".modal").style.display = "none";
    });
});

// Close modals if user clicks outside
window.addEventListener("click", event => {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Open modal
    document.querySelectorAll(".modal-link").forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetModalId = link.getAttribute("data-modal");
            const targetModal = document.getElementById(targetModalId);
            if (targetModal) {
                targetModal.classList.add("show");
            }
        });
    });

    // Close modal
    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", () => {
            button.closest(".modal").classList.remove("show");
        });
    });

    window.addEventListener("click", (e) => {
        document.querySelectorAll(".modal.show").forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    });
});

