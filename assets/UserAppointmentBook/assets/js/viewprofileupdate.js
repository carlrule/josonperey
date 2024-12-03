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


// Initialize Firebase
var user = firebase.initializeApp(userAppConfig, "userdb");
var userdb = user.database();



/////////////////////////////// FIREBASE CONNECTION ////////////////////////////////////




/////////////// pang store lang ng data para malipat sa kabilang form//////////////////

var GetUsername = sessionStorage.getItem("passValueUser");
var Getpass = sessionStorage.getItem("passValuePass");
var Getewan = sessionStorage.getItem("isLoggedIn")


/////////////// pang store lang ng data para malipat sa kabilang form//////////////////



var userRef = user.database().ref("user");
var username = GetUsername;
var getid;
userRef.child(username).once("value")
  .then(function (snapshot) {
    var userData = snapshot.val();
    for (let i in userData) {

      dump();
      document.getElementById('username').value = snapshot.val().Username;
      document.getElementById('password').value = snapshot.val().Password;
      document.getElementById('confirm-password').value = snapshot.val().Password;
      document.getElementById('last-name').value = snapshot.val().LastName;
      document.getElementById('first-name').value = snapshot.val().FirstName;
      document.getElementById('middle-name').value = snapshot.val().MiddleName;
      document.getElementById('date-of-birth').value = snapshot.val().BirthDate;
      document.getElementById('gender').value = snapshot.val().Gender;
      document.getElementById('civil-status').value = snapshot.val().CivilStatus;
      document.getElementById('email').value = snapshot.val().Email;
      document.getElementById('phone-number').value = snapshot.val().PhoneNum;
      document.getElementById('province').value = snapshot.val().Province;
      document.getElementById('city-municipality').value = snapshot.val().CityMunicipality;
      document.getElementById('barangay').value = snapshot.val().Barangay;
      getid = snapshot.val().AUTOID;
      //console.log("laman ko " + previousDatausername);
      //console.log("laman ko den " + username);

    }
  })
  .catch(function (error) {
    console.log("Error retrieving data:", error);
  });





function dump() {
  previousDatausername = GetUsername;
  previousDatapassword = Getpass;
  // Store other fields' previous values here as needed
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkUsernameExists(username) {
  return userdb.ref("user").orderByChild("Username").equalTo(username).once("value");
}


var currentUsername = GetUsername; // Replace with the current username

function UpdateDetails() {

  var editButton = document.getElementById('editProfileButton');
  var cancelButton = document.getElementById('cancelButton');
  var saveButton = document.getElementById('saveProfileButton');
  editButton.removeAttribute('disabled');
  cancelButton.setAttribute('disabled', 'true');
  saveButton.setAttribute('disabled', 'true');

  var enabledElements = document.querySelectorAll('.profile-form [required]');
  
  enabledElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
  });

  dump();

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirm-password').value;
  var lastName = document.getElementById('last-name').value;
  var firstName = document.getElementById('first-name').value;
  var middleName = document.getElementById('middle-name').value;
  var birth = document.getElementById('date-of-birth').value;
  var gender = document.getElementById('gender').value;
  var civilStatus = document.getElementById('civil-status').value;
  var email = document.getElementById('email').value;
  var phoneNum = document.getElementById('phone-number').value;
  var province = document.getElementById('province').value;
  var CM = document.getElementById('city-municipality').value;
  var barangay = document.getElementById('barangay').value;
  

  console.log(" ito yung dating laman ng login user at user " + previousDatausername + "  " + currentUsername);
  console.log("laman ng current username " + username);

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

    if (previousDatausername === username) {
      if (password == confirmPassword) {
        userdb.ref('user/' + currentUsername).remove();
        userdb.ref('user/' + username).set({
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
          AUTOID: getid,

        })
          .then(() => {
            if ((previousDatausername != username) || (previousDatapassword != password)) {
              console.log("laman ko " + previousDatausername);
              console.log("laman ko den " + username);

              alert("Details Updated Successfully!");
              alert("you need to sign in again, because you change your username or password ");
                clientLogout();
            } else {
              alert("Details Updated Successfully!");
            }
          })
          .catch((error) => {
            alert("unsuccessful, error " + error);
          });

      } else {
        alert("Password and Confirm Password does not match !");
      }

    } else {
      checkUsernameExists(username)
        .then(snapshot => {
          if (!snapshot.exists()) {
            // Username doesn't exist, proceed with registration
            userdb.ref('user/' + currentUsername).remove();
            userdb.ref('user/' + username).set({
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
              AUTOID: getid,
            });
            if (true) {

              alert("Details Updated Successfully!");
              alert("you need to sign in again, because you change your username or password ");
              clientLogout();
            }

          } else {
            document.getElementById('username').value = previousDatausername;
            alert("Username already exists. Please choose a different username.");
          }
        })


    }








  } else {
    alert("Please fill all textbox");
  }

}// end ng function

function clientLogout() {
  // Clear the session storage
  sessionStorage.clear();

  // Redirect the user to index.html
  window.location.replace("index.html");
}

