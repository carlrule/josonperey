const adminFirebaseConfig = {
  apiKey: "AIzaSyAIuhoDPPtPqAGED_dhKToec-3TA2uxNNI",
  authDomain: "admin-ba01b.firebaseapp.com",
  databaseURL: "https://admin-ba01b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-ba01b",
  storageBucket: "admin-ba01b.appspot.com",
  messagingSenderId: "329600031166",
  appId: "1:329600031166:web:afb170b0baff0d29aac1ef"
};


var adm = firebase.initializeApp(adminFirebaseConfig ,'adminAuth');
// var adminAuth = firebase.auth();
var adminAuth = adm.auth();

  
  
// Function for admin login
function adminLogin(event) {
  showLoading();

  // Prevent form submission
  event.preventDefault();

  var adminUsername = document.getElementById("admin-username").value;
  var adminPassword = document.getElementById("admin-password").value;

  adminAuth.signInWithEmailAndPassword(adminUsername, adminPassword)
    .then(function(userCredential) {
      // Admin login successful
      document.getElementById('admin-username').value = '';
      document.getElementById('admin-password').value = '';

      // Store admin-username in sessionStorage
      sessionStorage.setItem("adminUsername", adminUsername);
      sessionStorage.setItem("isLoggedIn2", "true");

      alert("Admin Login successful!");
      hideLoading();

      // Redirect to adminafterlog.html
      window.location.href = 'adminafterlog.html';
    })
    .catch(function(error) {
      // Admin login failed
      console.error("Error:", error);
      alert("Invalid Admin Username or Password!");
      hideLoading();
      document.getElementById('admin-username').value = '';
      document.getElementById('admin-password').value = '';
    });
}


  function adminLogout() {
    // Ask the user for confirmation
    var logoutConfirmed = confirm("Are you sure you want to logout?");
  
    // If the user confirms, proceed with logout
    if (logoutConfirmed) {
      sessionStorage.clear();
      window.location.replace("index.html");
    }
  }




  
  function resetAdminPassword() {
    var adminEmail = prompt("Enter the email address associated with the admin account:");
  
    if (adminEmail === "divina.josonperey@gmail.com" || adminEmail === "rachelle.josonperey@gmail.com") {
      adminAuth.sendPasswordResetEmail(adminEmail)
        .then(function () {
          alert("Password reset email SENT! Check your email for further instructions.");
        })
        .catch(function (error) {
          console.error("Error sending password reset email:", error);
          alert("Error sending password reset email. Please try again.");
        });
    } else {
      alert("Invalid email address. Password reset email not sent.");
    }
  }

  function resetAdminPassword2() {
    var adminUsername = sessionStorage.getItem("adminUsername");
  
    if (adminUsername) {
      adminAuth.sendPasswordResetEmail(adminUsername)
        .then(function () {
          alert("Password reset email SENT! Check your email for further instructions.");
        })
        .catch(function (error) {
          console.error("Error sending password reset email:", error);
          alert("Error sending password reset email. Please try again.");
        });
    } else {
      alert("Invalid email address. Password reset email not sent.");
    }
  }















