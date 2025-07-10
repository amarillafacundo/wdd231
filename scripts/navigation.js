// Toggle navigation on mobile //
document.getElementById("menu").addEventListener("click", () => {
    document.querySelector(".navigation").classList.toggle("open");
});


document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navigation a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.href.split('/').pop();

        if (currentPath === '' && linkPath === 'index.html') {
            link.classList.add('active');
        } else if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });
});