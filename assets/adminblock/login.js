
var userAppConfig = {
  apiKey: "AIzaSyBmpCcjkE7SbBAJMXBA113q0k2GycBVpKY",
  authDomain: "patient-35f7e.firebaseapp.com",
  databaseURL: "https://patient-35f7e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "patient-35f7e",
  storageBucket: "patient-35f7e.appspot.com",
  messagingSenderId: "392977055504",
  appId: "1:392977055504:web:3b175a57cb7b8874bcaf95",
  measurementId: "G-KKQJJY5EK8"
};
// Initialize Firebase with your Firebase project's config
var userApp = firebase.initializeApp(userAppConfig, "userApp");

//////////////code para mabasa niya yng firebase datase ng USER LANG ////////////////////////////
function login() {





  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  console.log("Trying to log in with username:", username, "and password:", password);

  // Query the Firebase database for the given username and password
  var userRef = userApp.database().ref("user");
  userRef.child(username).once("value",function(snapshot){
      var userData = snapshot.val();

     //console.log(userData);

     if (userData && userData.Password === password) {
      // Login successful, redirect to the new page.
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
      
      var getUser = username;
      sessionStorage.setItem("passValueUser", getUser);
      var getPass = password;
      sessionStorage.setItem("passValuePass", getPass);
  
      // Redirect to the new HTML page after a successful login
      window.location.href = "book_appointment.html"; // Change "afterlog.html" to the actual filename of the new page
    } else {
      // Login failed, show an error message.
      var errorMessageElement = document.getElementById("error-message");
      alert("Invalid Username Or Password!");
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    }
    })
    .catch(function(error) {
      console.log("Error retrieving data:", error);
    });
}
//////////////////////////////////////////////////////////////////////// 





//////////////CODE PARA MABASA NIYA YUNG FIREBASE NA DATABASE FOR ADMIN LANG////////////////////////////
function adminLogin() {
  var adminAppConfig  = {
  apiKey: "AIzaSyCGUnQqJvgD0lekQlxnPqbXijv9avCiEEo",
  authDomain: "admin-4a11a.firebaseapp.com",
  databaseURL: "https://admin-4a11a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-4a11a",
  storageBucket: "admin-4a11a.appspot.com",
  messagingSenderId: "604926853022",
  appId: "1:604926853022:web:b7168c7dcc6b035613208f"
};

var adminApp = firebase.initializeApp(adminAppConfig, "adminApp");

var adminUsername = document.getElementById("admin_username").value;
var adminPassword = document.getElementById("admin_password").value;

console.log("Trying to log in with admin username:", adminUsername, "and admin password:", adminPassword);

// Query the Firebase database for the given admin username and password
var adminRef = adminApp.database().ref("user");
adminRef.child(adminUsername).once("value")
  .then(function(snapshot) {
      var adminData = snapshot.val();

      if (adminData && adminData.password === adminPassword) {
          // Admin login successful, redirect to the admin dashboard or other authenticated pages.
          // For this example, let's just display a success message.
          document.getElementById('admin_username').value = ''; 
          document.getElementById('admin_password').value = ''; 


          setTimeout(() => {
            window.location.href = "C:/Users/erltu/OneDrive/Documents/Schooollss/CAPSTONE/try/managerecord/managerecord.html";
          }, 500); // delay transition 


          alert("Admin Login successful!");
      } else {
          // Admin login failed, show an error message.
          var adminErrorMessageElement = document.getElementById("admin-error-message");
          document.getElementById('admin_username').value = ''; 
          document.getElementById('admin_password').value = ''; 
          alert("Invalid Admin Username Or Password!");
      }
  })
  .catch(function(error) {
      console.log("Error retrieving admin data:", error);
  });
}
//////////////////////////////////////////////////////////////////////// 





//para gumana yung back at admin log in////////////////////////////////////

function showAdminLogin() {
const container = document.querySelector(".container");
const adminContainer = document.querySelector(".admin-container");

container.style.opacity = "0";
container.style.pointerEvents = "none"; // Disable interaction during the transition
adminContainer.style.display = "block";

setTimeout(() => {
  container.style.display = "none";
  adminContainer.style.opacity = "1";
  adminContainer.style.pointerEvents = "auto"; // Enable interaction after the transition
}, 500); // Adjust the transition duration as needed
}

function showNormalUserLogin() { //open normal login
const container = document.querySelector(".container");
const adminContainer = document.querySelector(".admin-container");

adminContainer.style.opacity = "0";
adminContainer.style.pointerEvents = "none"; // Disable interaction during the transition
container.style.display = "block";

setTimeout(() => {
  adminContainer.style.display = "none";
  container.style.opacity = "1";
  container.style.pointerEvents = "auto"; // Enable interaction after the transition
}, 500); // Adjust the transition duration as needed
}
////////////////////////////////////////////////////////////////////////



function showRegistrationPage() { //open registration.html
const wrapper = document.querySelector(".wrapper");
wrapper.classList.add("fade-out");

setTimeout(() => {
  window.location.href = "C:/Users/erltu/OneDrive/Documents/Schooollss/CAPSTONE/try/registration/registration.html";
}, 500); // Adjust the transition duration as needed
}