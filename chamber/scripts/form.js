// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.getElementById("timestamp");

    if (timestampField) {
        const now = new Date().toISOString();
        timestampField.value = now;
    }
});
