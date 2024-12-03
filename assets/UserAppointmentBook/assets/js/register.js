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
firebase.initializeApp(signupConfig,"usersign");
var db = firebase.database();


let dagdag = 0;

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
  return db.ref("user").orderByChild("Username").equalTo(username).once("value");
}

function registerUser() {
    showLoading();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
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
        checkUsernameExists(username)
          .then(snapshot => {
            if (!snapshot.exists()) {
              getLastGeneratedId().then(lastIdSnapshot => {
                // Get the last generated ID
                const lastGeneratedId = lastIdSnapshot.val() || 0;
                // Increment the ID
                dagdag = lastGeneratedId + 1;
                // Set the last generated ID in the database
                setLastGeneratedId(dagdag);
                // Set user data
                db.ref('user/' + username).set({
                  Username: username,
                  Password: password,
                  LastName: lastName,
                  FirstName: firstName,
                  MiddleName: middleName,
                  BirthDate: birth,
                  Gender: gender,
                  CivilStatus: civilStatus,
                  Email: email,
                  PhoneNum: phoneNum,
                  Province: province,
                  CityMunicipality: CM,
                  Barangay: barangay,
                  AUTOID: dagdag,
                });
                testing();
                alert('Sign Up Successful!');
                location.reload();
                hideLoading();
              });
            } else {
                hideLoading();
                document.getElementById('username').value = '';
                alert('Username already exists. Please choose a different username.');
            }
          })
          .catch(error => {
            hideLoading();
            console.error('Error checking username:', error);
          });
      } else {
        hideLoading();
        alert('Passwords do not match. Please try again.');
        document.getElementById('password').value = '';
        document.getElementById('confirm_password').value = '';
      }
    } else {
        hideLoading();
        alert('Please fill all the text fields!');
    }
  }
  


document.getElementById('register-button').addEventListener('click', function(e) {
  e.preventDefault();
  registerUser();
});
