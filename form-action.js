document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById('submission-details');

    if (params.toString()) {
        container.innerHTML = `
            <p><strong>Name:</strong> ${params.get('name')}</p>
            <p><strong>Email:</strong> ${params.get('email')}</p>
            <p><strong>Message:</strong> ${params.get('message')}</p>
        `;
    } else {
        container.innerHTML = '<p>No form data found.</p>';
    }
});