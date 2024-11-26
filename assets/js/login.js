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

var userApp = firebase.initializeApp(userAppConfig);

function login(event) {

  showLoading();

  // Prevent form submission
  event.preventDefault();
  var username = document.getElementById("client-username").value;
  var password = document.getElementById("client-password").value;

  // Validation checks for empty fields and specific characters
  if (!username || !password || /[.#$\[\]]/.test(username) || /[.#$\[\]]/.test(password)) {
    alert("Invalid Username or Password!");
    document.getElementById('client-username').value = '';
    document.getElementById('client-password').value = '';
    hideLoading();
    return;
  }

  var userRef = user.database().ref("user");

  userRef.child(username).once("value")
    .then(function (snapshot) {
      var userData = snapshot.val();

      if (userData && userData.Password === password) {

        var userRef2 = userdb.ref('user/' + username);

        userRef2.once('value').then(function (snapshot) {

          var userinfo = snapshot.val();

          var getemail = userinfo.Email;
          var getpazz = userinfo.dumpP;

          console.log("email ng username na inenter : " + getemail);
          console.log("dump ng : " + getpazz);

                    // Sign in with email and password
          firebase.auth().signInWithEmailAndPassword(getemail, getpazz)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;

              // Check if the user's email is verified
              if (user.emailVerified) {
                console.log("Email is verified. Logged in:", user);
                // Add your logic for what happens after successful login
                // Login successful
                sessionStorage.setItem("isLoggedIn", "true");
                

                document.getElementById('client-username').value = '';
                document.getElementById("client-password").value = '';
                alert("Login successful!");
                hideLoading();

                sessionStorage.setItem("passValueUser", username);
                sessionStorage.setItem("passValuePass", password);
                sessionStorage.setItem('dumpP',getpazz);
   
                setTimeout(() => {
                  window.location.href = 'clientafterlog.html';
                }, 500);
              } else {
                console.log("Email is not verified. Please check your email for verification.");
                alert("Please verify your email address first! (check your email inbox)");
                hideLoading();
              }
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;

              if (errorCode === 'auth/user-not-found') {
                console.log("Email not registered.");
                hideLoading();
              } else {
                console.error("Login Error:", errorCode, errorMessage);
                hideLoading();
              }
            });
        });




      } else {
        // Login failed
        alert("Invalid Username or Password!");
        hideLoading();
        document.getElementById('client-username').value = '';
        document.getElementById('client-password').value = '';
      }
    })
    .catch(function (error) {
      console.error("Error retrieving data:", error);
    });
}

function confirmLogout() {
  // Ask the user for confirmation
  var logoutConfirmed = confirm("Are you sure you want to logout?");

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