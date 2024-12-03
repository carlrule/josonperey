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
  
  
  
  //firebase para sa records
  
  var RecordsfirebaseConfig = {
    apiKey: "AIzaSyByJBalWucjSD4prQT79psUbf3rSAN1zoI",
    authDomain: "patients-record.firebaseapp.com",
    databaseURL: "https://patients-record-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "patients-record",
    storageBucket: "patients-record.appspot.com",
    messagingSenderId: "800020403699",
    appId: "1:800020403699:web:1aa45bd692fa9bb672ae86"
  };
  
  // Initialize Firebase
  var records = firebase.initializeApp(RecordsfirebaseConfig, "recorddb");
  var recorddb = records.database();
  
  
  // // firebase ng announcement 
  // var announcementfirebaseConfig = {
  //   apiKey: "AIzaSyBpViFEd8hd8lDKTwOqIB_g2J6oGzKsXOg",
  //   authDomain: "announcement-5858d.firebaseapp.com",
  //   databaseURL: "https://announcement-5858d-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   projectId: "announcement-5858d",
  //   storageBucket: "announcement-5858d.appspot.com",
  //   messagingSenderId: "354580980041",
  //   appId: "1:354580980041:web:14cfdc1244070f97043a98"
  // }
  
  // // Initialize Firebase
  // var ann = firebase.initializeApp(announcementfirebaseConfig, "announcementdb");
  // var anndb = ann.database();
  
  
  

  
  
  
  
  /////////////////////////////// FIREBASE CONNECTION ////////////////////////////////////
  
  
  
  
  
  /////////////// pang store lang ng data para malipat sa kabilang form//////////////////
  
  var GetUsername = sessionStorage.getItem("passValueUser");
  // var Getpass = sessionStorage.getItem("passValuePass");
  // var Getewan = sessionStorage.getItem("isLoggedIn")
  
  
  /////////////// pang store lang ng data para malipat sa kabilang form//////////////////
  
  
  
  var userRef = user.database().ref("user");
  var username = GetUsername;
  var getid;
  userRef.child(username).once("value")
    .then(function (snapshot) {
      var userData = snapshot.val();
      for (let i in userData) {
  
        // dump();
        // document.getElementById('confirm_password').value = snapshot.val().Password;
        // document.getElementById('lastname').value = snapshot.val().LastName;
        // document.getElementById('firstname').value = snapshot.val().FirstName;
        // document.getElementById('middlename').value = snapshot.val().MiddleName;
        // document.getElementById('birth').value = snapshot.val().BirthDate;
        // document.getElementById('email').value = snapshot.val().Email;
        // document.getElementById('gender').value = snapshot.val().Gender;
        // document.getElementById('civilstatus').value = snapshot.val().CivilStatus;
        // document.getElementById('province').value = snapshot.val().Province;
        // document.getElementById('CM').value = snapshot.val().CityMunicipality;
        // document.getElementById('barangay').value = snapshot.val().Barangay;
        // document.getElementById('phonenum').value = snapshot.val().PhoneNum;
        // document.getElementById('username').value = snapshot.val().Username;
        // document.getElementById('password').value = snapshot.val().Password;
        getid = snapshot.val().AUTOID;
        console.log(getid);
        //console.log("laman ko " + previousDatausername);
        //console.log("laman ko den " + username);
  
      }
    })
    .catch(function (error) {
      console.log("Error retrieving data:", error);
    });
  
  
  
  
  
  // function dump() {
  //   previousDatausername = GetUsername;
  //   previousDatapassword = Getpass;
  //   // Store other fields' previous values here as needed
  // }
  
  
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // function checkUsernameExists(username) {
  //   return userdb.ref("user").orderByChild("Username").equalTo(username).once("value");
  // }
  
  
  // var currentUsername = GetUsername; // Replace with the current username
  
  // function UpdateDetails() {
  
  //   dump();
  
  //   var confirmPassword = document.getElementById('confirm_password').value;
  //   var lastName = document.getElementById('lastname').value;
  //   var firstName = document.getElementById('firstname').value;
  //   var middleName = document.getElementById('middlename').value;
  //   var birth = document.getElementById('birth').value;
  //   var email = document.getElementById('email').value;
  //   var gender = document.getElementById('gender').value;
  //   var civilStatus = document.getElementById('civilstatus').value;
  //   var province = document.getElementById('province').value;
  //   var CM = document.getElementById('CM').value;
  //   var barangay = document.getElementById('barangay').value;
  //   var phoneNum = document.getElementById('phonenum').value;
  //   var username = document.getElementById('username').value;
  //   var password = document.getElementById('password').value;
  
  //   console.log(" ito yung dating laman ng login user at user " + previousDatausername + "  " + currentUsername);
  //   console.log("laman ng current username " + username);
  
  //   if (
  //     lastName != '' &&
  //     firstName != '' &&
  //     middleName != '' &&
  //     birth != '' &&
  //     email != '' &&
  //     gender != '' &&
  //     province != '' &&
  //     CM != '' &&
  //     barangay != '' &&
  //     phoneNum != '' &&
  //     username != '' &&
  //     password != '' &&
  //     confirmPassword != ''
  //   ) {
  
  //     if (previousDatausername === username) {
  //       if (password == confirmPassword) {
  //         userdb.ref('user/' + currentUsername).remove();
  //         userdb.ref('user/' + username).set({
  //           LastName: lastName,
  //           FirstName: firstName,
  //           MiddleName: middleName,
  //           BirthDate: birth,
  //           Email: email,
  //           Gender: gender,
  //           Province: province,
  //           CivilStatus: civilStatus,
  //           CityMunicipality: CM,
  //           Barangay: barangay,
  //           PhoneNum: phoneNum,
  //           Username: username,
  //           Password: password,
  //           AUTOID: getid,
  
  //         })
  //           .then(() => {
  //             if ((previousDatausername != username) || (previousDatapassword != password)) {
  //               console.log("laman ko " + previousDatausername);
  //               console.log("laman ko den " + username);
  
  //               alert("Details Updated Successfully!");
  //               alert("you need to sign in again, because you change your username or password ");
  //               window.history.back();
  //               logout();
  //             } else {
  //               alert("Details Updated Successfully!");
  //             }
  //           })
  //           .catch((error) => {
  //             alert("unsuccessful, error " + error);
  //           });
  
  //       } else {
  //         alert("Password and Confirm Password does not match !");
  //       }
  
  //     } else {
  //       checkUsernameExists(username)
  //         .then(snapshot => {
  //           if (!snapshot.exists()) {
  //             // Username doesn't exist, proceed with registration
  //             userdb.ref('user/' + currentUsername).remove();
  //             userdb.ref('user/' + username).set({
  //               LastName: lastName,
  //               FirstName: firstName,
  //               MiddleName: middleName,
  //               BirthDate: birth,
  //               Email: email,
  //               Gender: gender,
  //               CivilStatus: civilStatus,
  //               Province: province,
  //               CityMunicipality: CM,
  //               Barangay: barangay,
  //               PhoneNum: phoneNum,
  //               Username: username,
  //               Password: password,
  //               AUTOID: getid,
  //             });
  //             if (true) {
  
  //               alert("Details Updated Successfully! sa baba dito ata error");
  //               alert("you need to sign in again, because you change your username or password ");
  //               logout();
  //             }
  
  //           } else {
  //             document.getElementById('username').value = previousDatausername;
  //             alert("Username already exists. Please choose a different username.");
  //           }
  //         })
  
  
  //     }
  
  
  
  
  
  
  
  
  //   } else {
  //     alert("Please fill all textbox");
  //   }
  
  // }// end ng function
  
  var recordtbody = document.getElementById('tbody2');
  
  function RecordAddItemToTable(AUTOID, DATE, DASR, Doctor, Amount, Deposit, Bal) {
    let trow = document.createElement("tr");
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
  
    td1.innerHTML = AUTOID;
    td2.innerHTML = DATE;
    td3.innerHTML = DASR;
    td4.innerHTML = Doctor;
    td5.innerHTML = Amount;
    td6.innerHTML = Deposit;
    td7.innerHTML = Bal;
  
  
  
    td1.hidden = true;
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
  
    recordtbody.appendChild(trow);
  }
  
  function RecordAddAllItemsToTable(patientsrec) {
    recordtbody.innerHTML = "";
    if (patientsrec.length === 0) {
      var noRecordRow = document.createElement("tr");
      var noRecordCell = document.createElement("td");
      noRecordCell.colSpan = 7; // Adjust the colspan based on the number of columns
      noRecordCell.textContent = "No Record";
      noRecordRow.appendChild(noRecordCell);
      recordtbody.appendChild(noRecordRow);
    } else {
      patientsrec.forEach(record => {
        RecordAddItemToTable(record.AUTOID, record.Date, record.DASR, record.Doctor, record.Amount, record.Deposit, record.Bal);
      });
    }
  }
  
  
  var getIDz;//para matawag papunta sa searchterm 
  
  function RecordGetAllDataOnce() {
    const dbRef = recorddb.ref("record/");
  
    dbRef.once("value")
      .then((snapshot) => {
        //console.log("Snapshot data:", snapshot.val());
  
        var recpatient = [];
  
        snapshot.forEach((parentSnapshot) => {
          parentSnapshot.forEach((childSnapshot) => {
            var record = childSnapshot.val();
  
            // Check if the AUTOID matches getid
            if (record.AUTOID == getid) { //== not ===
              recpatient.push(record);
              getIDz = record.AUTOID;//para ilipat sa global variable
            }
          });
        });
  
        RecordAddAllItemsToTable(recpatient);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  
  
  ///////////code for searchbar///////////////////////////////////
  
  var searchInput = document.getElementById('searchInput');
  var searchcriteria = document.getElementById('searchCriteria');
  searchInput.addEventListener('input', function () {
    var searchTerm = searchInput.value.trim().toLowerCase();
    var searchcri = searchcriteria.value.trim().toLowerCase();
  
    // Clear the table
    recordtbody.innerHTML = "";
  
    // Iterate through the data and filter by username
    // Replace 'record' with your database node
    recorddb.ref('record/' + getIDz).once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var record = childSnapshot.val();
        var diagnosis = record.DASR.toLowerCase();
        var datez = record.Date.toLowerCase();
  
        if (searchcri === 'diagnosis' && diagnosis.includes(searchTerm)) {
          RecordAddItemToTable(record.AUTOID, record.Date, record.DASR, record.Doctor, record.Amount, record.Deposit, record.Bal);
        }
        else if (searchcri === 'date' && datez.includes(searchTerm)) {
          RecordAddItemToTable(record.AUTOID, record.Date, record.DASR, record.Doctor, record.Amount, record.Deposit, record.Bal);
  
        }
      });
    });
  });
  ///////////code for searchbar///////////////////////////////////
  
  //////////////////////////////////////////////////////
  // Call the function to populate the table when needed
  RecordGetAllDataOnce();
  
  
  
  
  