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





/* ------ My Appointment Toggle (Pending, To Pay, and Accepted Appointment Navigation) ------ */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.myappointment-nav-item');
    const formRows = document.querySelectorAll('.form-row');

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');

            formRows.forEach(formRow => formRow.style.display = 'none');
            formRows[index].style.display = 'flex';
        });
    });
});
 // In your afterlog.html page
 document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      // If not logged in, redirect to login page
      window.location.href = 'index.html';
    }
  });
/* ------------------------------------------------------------------------------------------------ */
