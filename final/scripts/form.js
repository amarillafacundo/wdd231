// Show form thank-you message
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        contactForm.style.display = 'none';
        document.getElementById('form-message').style.display = 'block';
    });
}

// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
if (menuBtn) {
    menuBtn.addEventListener('click', function () {
        document.querySelector('nav').classList.toggle('hidden');
    });
}
