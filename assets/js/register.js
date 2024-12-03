var firstDb;

function testing(){
    recorddb.ref('record/' + dagdag).set({
    AUTOID:dagdag,
    Date:".",
});
 
}


var RecorduserConfig = {
  apiKey: "AIzaSyByJBalWucjSD4prQT79psUbf3rSAN1zoI",
  authDomain: "patients-record.firebaseapp.com",
  databaseURL: "https://patients-record-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "patients-record",
  storageBucket: "patients-record.appspot.com",
  messagingSenderId: "800020403699",
  appId: "1:800020403699:web:1aa45bd692fa9bb672ae86"
};
 // Initialize Firebase
 var recorddb = firebase.initializeApp(RecorduserConfig, "RecordUserDatabase").database();



// Initialize Firebase for user registration
var signupConfig = {
  apiKey: "AIzaSyBmpCcjkE7SbBAJMXBA113q0k2GycBVpKY",
  authDomain: "patient-35f7e.firebaseapp.com",
  databaseURL: "https://patient-35f7e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "patient-35f7e",
  storageBucket: "patient-35f7e.appspot.com",
  messagingSenderId: "392977055504",
  appId: "1:392977055504:web:feedaf7d90fe84e9bcaf95",
  measurementId: "G-SCEENWBZV7"
};

// Initialize Firebase for user registration
var user = firebase.initializeApp(signupConfig, "userdb");
var userdb = firebase.database();



let dagdag; //para to sa lastgenerated sa database para maset yung autoid

// Function to get the last generated ID
function getLastGeneratedId() {
  return recorddb.ref("lastGeneratedId").once("value");
}


// Function to set the last generated ID
function setLastGeneratedId(id) {
  recorddb.ref("lastGeneratedId").set(id);
}

// Function to check if a username exists
// para sa user
function checkUsernameExists(username) {
  return userdb.ref("user").orderByChild("Username").equalTo(username).once("value");
}

// Function to check if a user's email is authenticated
function checkEmailAuthentication(username) {
  userdb.ref('user/' + username).once('value')
    .then(snapshot => {
      var userData = snapshot.val();
      if (userData) {
        if (userData.Activated) {
          alert('Email is authenticated. Proceed to login.'); // Modify this alert message as needed
          // Redirect to the desired page or perform additional actions
        } else {
          alert('Email not yet authenticated. Please check your email for the activation link.');
        }
      } else {
        alert('User not found. Please check your credentials.');
      }
    })
    .catch(error => {
      alert(error.message);
    });
}


function registerUser() {
    showLoading();
    var username = document.getElementById('username').value;
    var password = document.getElementById('passwordz').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var lastName = document.getElementById('last-name').value;
    var firstName = document.getElementById('first-name').value;
    var middleName = document.getElementById('middle-name').value;
    var birth = document.getElementById('datepicker').value;
    var gender = document.getElementById('select-sex').value;
    var civilStatus = document.getElementById('select-civil-status').value;
    var email = document.getElementById('email').value;
    var phoneNum = document.getElementById('phone_number').value;
    var province = document.getElementById('province').value;
    var CM = document.getElementById('city').value;
    var barangay = document.getElementById('barangay').value;
  
    if (province !== 'Cavite') {
      // Set City/Municipality and Barangay to "N/A"
      CM = 'N/A';
      barangay = 'N/A';
    }
  
    if (
      username != '' &&
      password != '' &&
      confirmPassword != '' &&
      lastName != '' &&
      firstName != '' &&
      middleName != '' &&
      birth != '' &&
      gender != '' &&
      civilStatus != '' &&
      email != '' &&
      phoneNum != '' &&
      province != '' &&
      CM != '' &&
      barangay != ''
    ) {
      if (password === confirmPassword) {
       // Check if the username already exists
       checkUsernameExists(username)
       .then(snapshot => {
           if (!snapshot.exists()) {



               firebase.auth().createUserWithEmailAndPassword(email, password)
                   .then(function (userCredential) {
                       // Send email verification
                       return userCredential.user.sendEmailVerification();
                   })
                   .then(function () {

                        
                       getLastGeneratedId().then(lastIdSnapshot => {
                           // Get the last generated ID
                           const lastGeneratedId = lastIdSnapshot.val() || 0;
                           
                           // Increment the ID
                           dagdag = lastGeneratedId + 1;
                           
                           // Set the last generated ID in the database
                           setLastGeneratedId(dagdag);
             
                           // Set user data
                           userdb.ref('user/' + username).set({
                               LastName: lastName,
                               FirstName: firstName,
                               MiddleName: middleName,
                               BirthDate: birth,
                               Email: email,
                               Gender: gender,
                               CivilStatus: civilStatus,
                               Province: province,
                               CityMunicipality: CM,
                               Barangay: barangay,
                               PhoneNum: phoneNum,
                               Username: username,
                               Password: password,
                               AUTOID: dagdag,
                               dumpP: password,
                           });
                             testing();
                           alert("Sign Up Successful!");
                           location.reload();
                         });
               alert('Registration successful! Activation link sent to ' + email);
                   })
                   .catch(function (error) {
                       // Error handling
                       if (error.code === 'auth/email-already-in-use') {
                          hideLoading();
                          alert('Email is already in use. Please choose a different email.');
                          document.getElementById('tar-overlay').style.display = 'none';
                       } else if (error.code === 'auth/invalid-email') {
                          hideLoading();
                          alert('Invalid email address.');
                          document.getElementById('tar-overlay').style.display = 'none';
                       } else if (error.code === 'auth/weak-password') {
                          hideLoading();
                          alert('Weak password. Please choose a stronger password (password must be at least 6 characters).');
                          document.getElementById('tar-overlay').style.display = 'none';
                       } else {
                          // For any other errors
                          hideLoading();
                          alert('Registration failed. Error: ' + error.message);
                          document.getElementById('tar-overlay').style.display = 'none';
                       }
                   });

           } else {
               // Username already exists
               document.getElementById('username').value = '';
               hideLoading();
               alert("Username already exists. Please choose a different username.");
           }
       })
       .catch(error => {
           console.error("Error checking username:", error);
       });
      } else { /// hanggang dito
        hideLoading();
        alert('Passwords do not match. Please try again.');
        document.getElementById('password').value = '';
        document.getElementById('confirm_password').value = '';
      }
    } else {
        hideLoading();
        alert('Please fill all the text fields in the Registration Form!');
        document.getElementById('tar-overlay').style.display = 'none';
    }
  }
  


// document.getElementById('register-button').addEventListener('click', function(e) {
//   e.preventDefault();
//   registerUser();
// });

document.getElementById('register-button').addEventListener('click', function() {
  document.getElementById('tar-overlay').style.display = 'flex';
});

document.getElementById('acceptBtn').addEventListener('click', function() {
  registerUser();
});

document.getElementById('closeBtn').addEventListener('click', function () {
  document.getElementById('tar-overlay').style.display = 'none';
});

document.getElementById('declineBtn').addEventListener('click', function () {
  document.getElementById('tar-overlay').style.display = 'none';
});