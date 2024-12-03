/* ------ Variables ------ */

// Hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Book Appointment Button inside the header
const bookAppointmentButton = document.querySelector('.book-appointment');

/* ------ End Variables ------ */





/* ------ Script for body (Hamburger, Scroll to Top, etc.) ------ */

// Function to toggle hamburger menu
function toggleHamburgerMenu() {
    navLinks.classList.toggle('active');
}

// Function to enable scrolling
function enablescroll() {
    document.body.style.overflow = 'auto';
}

// Function to hide the hamburger menu
function hidehamburgerMenu() {
    navLinks.classList.remove('active');
    enablescroll(); // Enable scrolling
}

// Open or close navLinks when hamburger is clicked
hamburger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleHamburgerMenu();
});

// Close the hamburger menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (navLinks.classList.contains('active') && event.target !== hamburger && !navLinks.contains(event.target)) {
        hidehamburgerMenu();
    }
});

// Scroll to the top when the button is clicked with smooth scrolling
const scrollButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll to the top of the page when the website is refreshed
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

var picker = new Pikaday({
    field: document.getElementById('datepicker'),
    format: 'YYYY-DD-MM',
    yearRange: [1700, moment().year()],
    showYearDropdown: true,
    autoClose: true,
    placeholder: 'Select Date',
});

var picker2 = new Pikaday({
    field: document.getElementById('date-of-birth'),
    format: 'YYYY-DD-MM',
    yearRange: [1700, moment().year()],
    showYearDropdown: true,
    autoClose: true,
    placeholder: 'Select Date',
});

/* -------------------------------------------------------------- */