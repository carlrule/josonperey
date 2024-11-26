function bookAppointment() {
    // Replace 'path/to/your/file.html' with the actual path to your HTML file
    var url = 'assets/bookanAppointmentweeee/book_appointment.html';
    
    // Open a new tab with the specified URL
    window.open(url, '_blank');
}

function showMyAppointment() {
    window.location.href = 'myappointment.html';
}

function showMyHistory() {
    window.location.href = 'myhistory.html';
}

function showProfileSection() {
    window.location.href = 'viewprofile.html';
}

function showAnnouncement() {
    // wala pa
}

// Prevent back after logout
function preventBack() { window.history.forward(); }
        setTimeout("preventBack()", 0);
        window.onunload = function () { null };


// Check if the user is logged in
function checkLoginStatus() {
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            // User is logged in, hide the login and signup buttons
            document.getElementById('homebutton').style.display = 'none';
            document.getElementById('fivebuttons').style.display = 'block';
        }
    }

// Call the function to check the login status when the page loads
document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

/* ------ Update the username indicator based on the currently logged in user ------ */

function updateUsernameIndicator() {
    var usernameSpan = document.getElementById("username-span");
    var loggedInUsername = sessionStorage.getItem('passValueUser');
  
    if (loggedInUsername) {
        // Update the content of the span element
        if (loggedInUsername.length > 15) {
            // Display only the first 15 characters followed by "..."
            usernameSpan.textContent = loggedInUsername.substring(0, 15) + "...";
        } else {
            usernameSpan.textContent = loggedInUsername;
        }

        // Make the username indicator visible (if it's hidden)
        document.getElementById("username-indicator").style.display = "block";
    } else {
        // No user is logged in, hide the username indicator
        document.getElementById("username-indicator").style.display = "none";
    }
}

// Call this function to update the username indicator whenever needed
updateUsernameIndicator();

/* --------------------------------------------------------------------------------- */

// Scroll to the top of the page when the website is refreshed
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
