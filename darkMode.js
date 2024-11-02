// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
}

// Add this code to handle the logo switching
function updateLogos(isDark) {
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.src = isDark ? "Images/darklonglogo.png" : "Images/longlogo.png";
    });
}

// Call this initially
updateLogos(darkMode === 'enabled');

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Save preference
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', null);
    }

    updateLogos(body.classList.contains('dark-mode'));
});
