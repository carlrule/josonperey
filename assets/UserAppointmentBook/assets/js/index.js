/* ------ Variables ------ */

// Book Appointment Button inside the header
const bookAppointment = document.querySelector('.book-appointment');

// Popup Forms
const clientPopup = document.getElementById('client-popup');
const forgotPopup = document.getElementById('forgot-password-popup');
const forgotLink = document.getElementById('forgot-link');
const backForgotLink = document.getElementById('back-to-login');
const adminLoginLink = document.getElementById('admin-login-link');
const adminPopup = document.getElementById('admin-popup');
const loginAsClientLink = document.getElementById('login-as-client-link');
const registerLink = document.getElementById('register-link');
const registerPopup = document.getElementById('register-popup');
const loginLink = document.getElementById('login-link');
const loginHome = document.getElementById('login-heading');
const registerHome = document.getElementById('register-heading');

// Close buttons of popup forms
const closeClientPopup = document.getElementById('close-popup');
const closeForgotPopup = document.getElementById('close-forgot-password-popup');
const closeAdminPopup = document.getElementById('close-admin-popup');
const closeRegisterPopup = document.getElementById('close-register-popup');

/* ------ End Variables ------ */





/* ------ Script for Popup Forms (Client Login, Admin Login, and Registration form) ------ */

// Function to disable scrolling
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Function to enable scrolling
function enableScroll() {
    document.body.style.overflow = 'auto';
}

// Function to hide the hamburger menu
function hideHamburgerMenu() {
    navLinks.classList.remove('active');
    enableScroll(); // Enable scrolling
}

// Function to open a popup with a sliding effect from the top
function openPopup(popup) {
    popup.style.display = 'block';
    hideHamburgerMenu();
    disableScroll();
    setTimeout(() => {
        popup.classList.add('active');
    }, 10);
    setTimeout(() => {
        popup.classList.add('bgcolor');
    }, 900);
}

// Function to close a popup with a sliding effect to the top
function closePopup(popup) {
    popup.classList.remove('active');
    enableScroll();
    setTimeout(() => {
        popup.style.display = 'none';
    }, 900);
    popup.classList.remove('bgcolor');
}

// Book Appointment Button -> Open Client Login Form
bookAppointment.addEventListener('click', () => {
    alert("Please login first before booking an appointment!");
    openPopup(clientPopup);
});

// "Login as Admin" link -> Open Admin Login Form
adminLoginLink.addEventListener('click', () => {
    closePopup(clientPopup);
    openPopup(adminPopup);
});

// "Login as a Client" link -> Get back to Client Login Form
loginAsClientLink.addEventListener('click', () => {
    closePopup(adminPopup);
    openPopup(clientPopup);
});

// "Login as Client" link -> Open Forgot Password Form
forgotLink.addEventListener('click', () => {
    closePopup(clientPopup);
    openPopup(forgotPopup);
});

// "Back to Login" link -> Get back to Client Login Form
backForgotLink.addEventListener('click', () => {
    document.getElementById("forgot-username").value = "";
    document.getElementById("code").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("container2").style.display = "none";
    document.getElementById("container3").style.display = "none";
    document.getElementById("container4").style.display = "none";
    document.getElementById("s2").style.display = "none";
    document.getElementById("s3").style.display = "none";
    document.getElementById("s4").style.display = "none";
    document.getElementById("container1").style.display = "block";
    document.getElementById("s1").style.display = "block";
    closePopup(forgotPopup);
    openPopup(clientPopup);
});

// "Register" link -> Open Registration Form
registerLink.addEventListener('click', () => {
    closePopup(clientPopup);
    openPopup(registerPopup);
});

// "Login" link -> Get back to Client Login Form
loginLink.addEventListener('click', () => {
    closePopup(registerPopup);
    openPopup(clientPopup);
});

// Home Login Button -> Open Client Login Form
loginHome.addEventListener('click', () => {
    openPopup(clientPopup);
    event.preventDefault();
});

// Sign Up Button -> Open Registration Form
registerHome.addEventListener('click', () => {
    closePopup(clientPopup);
    openPopup(registerPopup);
    event.preventDefault();
});

// Close Button -> Close Client Login Form
closeClientPopup.addEventListener('click', () => {
    closePopup(clientPopup);
});

// Close Button -> Close Forgot Password Form
closeForgotPopup.addEventListener('click', () => {
    document.getElementById("forgot-username").value = "";
    document.getElementById("code").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("container2").style.display = "none";
    document.getElementById("container3").style.display = "none";
    document.getElementById("container4").style.display = "none";
    document.getElementById("s2").style.display = "none";
    document.getElementById("s3").style.display = "none";
    document.getElementById("s4").style.display = "none";
    document.getElementById("container1").style.display = "block";
    document.getElementById("s1").style.display = "block";
    closePopup(forgotPopup);
});

// Close Button -> Close Admin Login Form
closeAdminPopup.addEventListener('click', () => {
    closePopup(adminPopup);
});

// Close Button -> Close Registration Form
closeRegisterPopup.addEventListener('click', () => {
    closePopup(registerPopup);
});


/* --------------------------------------------------------------------------------------- */