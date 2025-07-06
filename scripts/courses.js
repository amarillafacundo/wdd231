const courses = [
    { code: "CSE 110", name: "Programming Building Blocks", credits: 2, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "CSE 111", name: "Programming with Fuctions", credits: 2, completed: true },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
    { code: "WDD 231", name: "Web Frontend Development I", credits: 2, completed: false },
    
    
];

const container = document.getElementById("courses");
const allBtn = document.getElementById("all");
const wddBtn = document.getElementById("wdd");
const cseBtn = document.getElementById("cse");

function renderCourses(list) {
    container.innerHTML = "";
    let totalCredits = 0;

    list.forEach(course => {
        const card = document.createElement("div");
        card.style.padding = "1rem";
        card.style.margin = "0.5rem 0";
        card.style.border = "1px solid #ccc";
        card.style.borderRadius = "8px";
        card.style.backgroundColor = course.completed ? "#d4edda" : "#f8d7da";

        card.innerHTML = `<strong>${course.code}</strong>: ${course.name} — ${course.credits} credits`;

        container.appendChild(card);
        totalCredits += course.credits;
    });

    const total = document.createElement("p");
    total.textContent = `Total Credits: ${totalCredits}`;
    container.appendChild(total);
}

allBtn.addEventListener("click", () => {
    renderCourses(courses);
});
wddBtn.addEventListener("click", () => {
    renderCourses(courses.filter(c => c.code.startsWith("WDD")));
});
cseBtn.addEventListener("click", () => {
    renderCourses(courses.filter(c => c.code.startsWith("CSE")));
});

// Load all courses on page load
renderCourses(courses);
  