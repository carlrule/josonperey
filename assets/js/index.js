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
    document.getElementById("container2").style.display = "none";
    document.getElementById("container3").style.display = "none";
    document.getElementById("container4").style.display = "none";
    document.getElementById("s2").style.display = "none";
    document.getElementById("s3").style.display = "none";
    document.getElementById("s4").style.display = "none";
    document.getElementById("container1").style.display = "block";
    document.getElementById("s1").style.display = "block";

    document.getElementById("forgot-username").value = "";
    document.getElementById("code").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("username").value = "";
    document.getElementById("passwordz").value = "";
    document.getElementById("confirm_password").value = "";
    document.getElementById("client-username").value = "";
    document.getElementById("client-password").value = "";
    document.getElementById("admin-username").value = "";
    document.getElementById("admin-password").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("first-name").value = "";
    document.getElementById("middle-name").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("select-sex").value = "";
    document.getElementById("select-civil-status").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone_number").value = "";
    document.getElementById("province").value = "";
    document.getElementById("city").value = "";
    document.getElementById("barangay").value = "";

    closePopup(forgotPopup);
});

// Close Button -> Close Admin Login Form
closeAdminPopup.addEventListener('click', () => {
    document.getElementById("forgot-username").value = "";
    document.getElementById("code").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("username").value = "";
    document.getElementById("passwordz").value = "";
    document.getElementById("confirm_password").value = "";
    document.getElementById("client-username").value = "";
    document.getElementById("client-password").value = "";
    document.getElementById("admin-username").value = "";
    document.getElementById("admin-password").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("first-name").value = "";
    document.getElementById("middle-name").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("select-sex").value = "";
    document.getElementById("select-civil-status").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone_number").value = "";
    document.getElementById("province").value = "";
    document.getElementById("city").value = "";
    document.getElementById("barangay").value = "";

    closePopup(adminPopup);
});

// Close Button -> Close Registration Form
closeRegisterPopup.addEventListener('click', () => {
    document.getElementById("forgot-username").value = "";
    document.getElementById("code").value = "";
    document.getElementById("newpassword").value = "";
    document.getElementById("username").value = "";
    document.getElementById("passwordz").value = "";
    document.getElementById("confirm_password").value = "";
    document.getElementById("client-username").value = "";
    document.getElementById("client-password").value = "";
    document.getElementById("admin-username").value = "";
    document.getElementById("admin-password").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("first-name").value = "";
    document.getElementById("middle-name").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("select-sex").value = "";
    document.getElementById("select-civil-status").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone_number").value = "";
    document.getElementById("province").value = "";
    document.getElementById("city").value = "";
    document.getElementById("barangay").value = "";

    closePopup(registerPopup);
});



/* Contact Form */
function submitForm(event) {
    event.preventDefault(); 

    var name = document.getElementById("name").value;
    var email = document.getElementById("email_contact").value;
    var message = document.getElementById("message").value;

    email_to = 'sheeeshcapstone@gmail.com';
    sendMail(email, `Name: ${name}
    Email: ${email}
    Message: ${message}`);

    document.getElementById("name").value = "";
    document.getElementById("email_contact").value = "";
    document.getElementById("message").value = "";
}

function sendMail(email, message_contact) {
    var params = {
        email: email,
        message: message_contact,
    };

    const serviceID = "service_8ou463i";
    const templateID = "template_qytmkt4";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            console.log(res);
            alert("Message sent successfully!");
        })
        .catch(err => {
            console.error("Error sending email:", err);
            alert("Oops! Something went wrong. Please try again later.");
        });
}



/* --------------------------------------------------------------------------------------- */