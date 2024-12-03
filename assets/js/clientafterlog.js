var userAppConfig = {
    apiKey: "AIzaSyBmpCcjkE7SbBAJMXBA113q0k2GycBVpKY",
    authDomain: "patient-35f7e.firebaseapp.com",
    databaseURL: "https://patient-35f7e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "patient-35f7e",
    storageBucket: "patient-35f7e.appspot.com",
    messagingSenderId: "392977055504",
    appId: "1:392977055504:web:feedaf7d90fe84e9bcaf95",
    measurementId: "G-SCEENWBZV7"
  };
  

  var user = firebase.initializeApp(userAppConfig, "userdb");
  var userdb = user.database();
  


/* ------ Update the username indicator based on the currently logged in user ------ */

function updateUsernameIndicator() {
    var GetUsername = sessionStorage.getItem("passValueUser");
    var userRef = user.database().ref("user");
    var username = GetUsername;
    var getid;
    var first  
    var last;
  
    userRef.child(username).once("value")
      .then(function (snapshot) {
        var userData = snapshot.val();
        for (let i in userData) {
          first = snapshot.val().FirstName;
          last = snapshot.val().LastName;
          getid = snapshot.val().AUTOID;
        }
        sessionStorage.setItem("id",getid);
        var usernameSpan = document.getElementById("username-span");
        var loggedInUsername = first + " " +  last;
      
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
  
      })
      .catch(function (error) {
        console.log("Error retrieving data:", error);
      });
  }
  
  // Call this function to update the username indicator whenever needed
  updateUsernameIndicator();
  
  /* --------------------------------------------------------------------------------- */


function bookAppointment() {
    window.location.href = 'book_appointment.html';
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
        }else{
            alert("not logged in");
        }
    }

// Call the function to check the login status when the page loads
document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});


// Scroll to the top of the page when the website is refreshed
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});
