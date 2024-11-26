var firebaseConfig = {
  apiKey: "AIzaSyCrih2yzDn4-ADl9vOOMcRUzBl3GFEjGdg",
            authDomain: "booking-b8486.firebaseapp.com",
            databaseURL: "https://booking-b8486-default-rtdb.firebaseio.com",
            projectId: "booking-b8486",
            storageBucket: "booking-b8486.appspot.com",
            messagingSenderId: "811552146571",
            appId: "1:811552146571:web:a133cb091615ae060b808e"
}; 

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
firebase.initializeApp(firebaseConfig);

var loggedusername = sessionStorage.getItem("passValueUser");

function SelectAllData() {
    firebase.database().ref('finishedappointments').once('value',
        function(AllRecords) {
            var recordsArray = []; // Array to store records
            AllRecords.forEach(function(CurrentRecord) {
                var record = CurrentRecord.val();
                if (loggedusername === record.username) {
                    recordsArray.push(record); // Push each record into the array
                }
            });

            // Sort records array by date
            recordsArray.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            var tbody = document.getElementById("history");
            tbody.innerHTML = ""; // Clear the table body

            // Check if there are no records found
            if (recordsArray.length === 0) {
                const noRecordRow = document.createElement("tr");
                const noRecordCell = document.createElement("td");
                noRecordCell.colSpan = 5;
                noRecordCell.innerText = "No records found.";
                noRecordCell.style.textAlign = "center";
                noRecordRow.appendChild(noRecordCell);
                tbody.appendChild(noRecordRow);
            } else {
                // Add sorted records to the table
                recordsArray.forEach(function(record) {
                    AddItemsToTable(record.doctor, record.services, record.date, record.time, record.lastname, record.firstname, record.remarks, record.price );
                });
                $("#hide").DataTable({
                    "responsive": false,
                    "lengthChange": false,
                    "autoWidth": false,
                    "order": [[2, "asc"]],
                    "pageLength": 10,
                    "columns": [
                      { "searchable": true },
                      { "searchable": true },
                      { "searchable": true },
                      { "searchable": true },
                      { "searchable": true },
                    ]
                  });
            }
        });
}



function AddItemsToTable(doctor, services, date, time, lastname, firstname, remarks, price) {
  var tbody = document.getElementById("history");
  var trow = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
 

  td1.innerHTML = date;
  td2.innerHTML = services;
  td3.innerHTML = doctor;
  td4.innerHTML = remarks;
  td5.innerHTML = price;

  
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);

  tbody.appendChild(trow);

}

window.onload = SelectAllData;


 // In your afterlog.html page
 document.addEventListener("DOMContentLoaded", function () {
    // Check if the user is logged in
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      // If not logged in, redirect to login page
      window.location.href = 'index.html';
    }
  });

  
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