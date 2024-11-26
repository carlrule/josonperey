var firebaseConfig = {
    apiKey: "AIzaSyAIuhoDPPtPqAGED_dhKToec-3TA2uxNNI",
    authDomain: "admin-ba01b.firebaseapp.com",
    databaseURL: "https://admin-ba01b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "admin-ba01b",
    storageBucket: "admin-ba01b.appspot.com",
    messagingSenderId: "329600031166",
    appId: "1:329600031166:web:afb170b0baff0d29aac1ef"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  var adminAuth = firebase.auth();
  
  
  // Function for admin login
  function adminLogin(event) {
    // Prevent form submission
    event.preventDefault(); // Pass 'event' as a parameter to the function
  
    var adminUsername = document.getElementById("admin-username").value;
    var adminPassword = document.getElementById("admin-password").value;
  
    adminAuth.signInWithEmailAndPassword(adminUsername, adminPassword)
      .then(function(userCredential) {
        // Admin login successful
        document.getElementById('admin-username').value = '';
        document.getElementById('admin-password').value = '';

        alert("Admin Login successful!");

        // Redirect to adminafterlog.html
        window.location.href = 'adminafterlog.html';
      })
      .catch(function(error) {
        // Admin login failed
        console.error("Error:", error);
        alert("Invalid Admin Username or Password!");
        document.getElementById('admin-username').value = '';
        document.getElementById('admin-password').value = '';
      });
  }
  





  document.getElementById("forgotPasswordLink").addEventListener("click", function (event) {
    event.preventDefault();

    resetAdminPassword();
});
  
  function resetAdminPassword() {
    var adminEmail = prompt("Enter the email address associated with the admin account:");
  
    if (adminEmail === "tarangdominic@gmail.com" || adminEmail === "sheeeshcapstone@gmail.com") {
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