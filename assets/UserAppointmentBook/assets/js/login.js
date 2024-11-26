  // Firebase configuration for user login
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

  var userApp = firebase.initializeApp(userAppConfig, "userApp");

  // Function for user login
  function login(event) {
    // Show loading spinner
    showLoading();

    // Prevent form submission
    event.preventDefault();
    var username = document.getElementById("client-username").value;
    var password = document.getElementById("client-password").value;

    var userRef = userApp.database().ref("user");

    userRef.child(username).once("value")
      .then(function(snapshot) {
        var userData = snapshot.val();

        if (userData && userData.Password === password) {
          // Login successful
          sessionStorage.setItem("isLoggedIn", "true");

          document.getElementById('client-username').value = '';
          document.getElementById('client-password').value = '';
          alert("Login successful!");
          hideLoading();

          sessionStorage.setItem("passValueUser", username);
          sessionStorage.setItem("passValuePass", password);

          // Redirect to clientafterlog.html
          window.location.href = 'clientafterlog.html';
        } else {
          // Login failed
          alert("Invalid Username or Password!");
          hideLoading();
          document.getElementById('client-username').value = '';
          document.getElementById('client-password').value = '';
        }
      })
      .catch(function(error) {
        console.error("Error retrieving data:", error);
        hideLoading();
      });
}

function confirmLogout() {
  // Ask the user for confirmation
  var logoutConfirmed = confirm("Do you really want to log out?");

  // If the user confirms, proceed with logout
  if (logoutConfirmed) {
    clientLogout();
  }
}

function clientLogout() {
  // Clear the session storage
  sessionStorage.clear();

  // Redirect the user to index.html
  window.location.replace("index.html");
}

function showLoading() {
  document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading-spinner').classList.add('hidden');
}