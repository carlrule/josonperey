function showContent(contentId) {
    // Hide all content divs
    document.getElementById('dashboard-content').style.display = 'none';
    document.getElementById('appointment-content').style.display = 'none';
    document.getElementById('records-content').style.display = 'none';

    // Show the selected content div
    document.getElementById(contentId + '-content').style.display = 'block';
}

// Toggle the side nav and container width on small screens
window.onresize = function () {
    if (window.innerWidth <= 768) {
        document.querySelector('nav').style.width = '100px';
        document.querySelector('.container').style.marginLeft = '100px';
    } else {
        document.querySelector('nav').style.width = '250px';
        document.querySelector('.container').style.marginLeft = '250px';
    }
};







/* ------ Manage Appointment Toggle ------ */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.appointment-status-nav-item');
    const formRows = document.querySelectorAll('.form-row');

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');

            formRows.forEach(formRow => formRow.style.display = 'none');
            formRows[index].style.display = 'flex';
        });
    });
});

/* ------------------------------------------------------------------------------------------------ */





// // Prevent back after logout
// function preventBack() { window.history.forward(); }
//         setTimeout("preventBack()", 0);
//         window.onunload = function () { null };





function adminLogout() {
    // Redirect the user to index.html
    window.location.replace("index.html");
  }


































  

//firebase para sa user
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
  var user = firebase.initializeApp(userAppConfig,"userdb");
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
    var records = firebase.initializeApp(RecordsfirebaseConfig,"recorddb");
    var recorddb = records.database();
  



    var announcementfirebaseConfig = {
        apiKey: "AIzaSyBpViFEd8hd8lDKTwOqIB_g2J6oGzKsXOg",
        authDomain: "announcement-5858d.firebaseapp.com",
        databaseURL: "https://announcement-5858d-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "announcement-5858d",
        storageBucket: "announcement-5858d.appspot.com",
        messagingSenderId: "354580980041",
        appId: "1:354580980041:web:14cfdc1244070f97043a98"
    }

        // Initialize Firebase
        var ann = firebase.initializeApp(announcementfirebaseConfig,"announcementdb");
        var anndb = ann.database();
      
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////para lang to sa table 1 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  var tbody = document.getElementById('tbody1');
  
  function AddItemToTable(AUTOID,username, firstname, middleName, lastName, birthdate) {
  
  
      let trow = document.createElement("tr");
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      let td5 = document.createElement('td');
      let td6 = document.createElement('td');
      let td7 = document.createElement('td');
      let td8 = document.createElement('td');
  
      
      td1.innerHTML = AUTOID;
      td2.innerHTML = username;
      td3.innerHTML = firstname;
      td4.innerHTML = middleName;
      td5.innerHTML = lastName;
      td6.innerHTML = birthdate;
      td7.innerHTML = '<button type="button" class="btn btn-primary" onclick="Update()" id="Updates">Edit Information</button>'; // Action button
      td8.innerHTML = '<button type="button" class="btn btn-primary" onclick="Records()"id="Erecords">Add Record</button>'; // Action button
  

      td1.hidden = true;
      trow.appendChild(td1);
      trow.appendChild(td2);
      trow.appendChild(td3);
      trow.appendChild(td4);
      trow.appendChild(td5);
      trow.appendChild(td6); 
      trow.appendChild(td7);
      trow.appendChild(td8); 
  
      tbody.appendChild(trow);
  }
  
  function addAllItemsToTable(patients) {
      tbody.innerHTML = "";
      patients.forEach(element => {
          AddItemToTable(element.AUTOID, element.Username, element.FirstName, element.MiddleName, element.LastName, element.BirthDate);
      });
  }
  
    function GetAllDataOnce() {
      const dbRef = userdb.ref("user/");
  
      dbRef.once("value")
          .then((snapshot) => {
              var patient = [];
  
              snapshot.forEach((childSnapshot) => {
                  patient.push(childSnapshot.val());
              });
  
              addAllItemsToTable(patient);
  
              // Call the sort function after populating the table
              sortTableByAscendingID();
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }
  
  
  

  var currentusernamengtable; 
  var kuhaid;
  var transferkuhaid;
  
  
  // Attach a click event listener to the tbody element to handle clicks on "Updates" buttons
  tbody.addEventListener('click', function (event) {
      var target = event.target;
      if (target.tagName === 'BUTTON' && target.id === 'Updates') {
         document.getElementById('balik2').hidden=false;
         //document.getElementById('Medical').hidden=true;
         document.getElementById('update').hidden=false;
          var row = target.closest('tr');
          if (row) {
            
  
              var username = row.cells[1].textContent;
              var userRef = userdb.ref('user/' +  username);
              userRef.once('value').then(function (snapshot) {
                  var userData = snapshot.val();
                  document.getElementById('PID').value = userData.AUTOID;
                  document.getElementById('Uname').value = userData.Username;
                  document.getElementById('Pass').value = userData.Password;
                  document.getElementById('Fname').value = userData.FirstName;
                  document.getElementById('Mname').value = userData.MiddleName;
                  document.getElementById('Lname').value = userData.LastName;
                  document.getElementById('Gender').value = userData.Gender;
                  document.getElementById('Bdate').value = userData.BirthDate;
                  document.getElementById('Email').value = userData.Email;
                  document.getElementById('Number').value = userData.PhoneNum;
                  document.getElementById('province').value = userData.Province;
                  document.getElementById('CM').value = userData.CityMunicipality;
                  document.getElementById('barangay').value = userData.Barangay;
                  document.getElementById('Civilstat').value = userData.CivilStatus;
                  
  
                  currentusernamengtable = document.getElementById('Uname').value = userData.Username;
                 kuhaid = userData.AUTOID;
                 transferkuhaid = kuhaid;
                // console.log("kuhaid inside event listener: " + kuhaid);
               
                  
              });
          }
      } else {
          // Handle other cases
      }
  });
  
  
  var table = document.getElementById('tbody1');
  
  
  var haha;
  
  
  
     
  var searchInput = document.getElementById('searchInput');
  var searchcriteria = document.getElementById('searchCriteria');
  
  
  searchInput.addEventListener('input', function () {
      
  var searchTerm = searchInput.value.trim().toLowerCase();
  var criteria = searchcriteria.value.trim().toLowerCase();
      
      // Clear the table
      table.innerHTML = '';
  
      // Iterate through the data and filter by username
      // Replace 'users' with your database node
      userdb.ref('user').once('value').then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
              var userData = childSnapshot.val();
              var username = userData.Username.toLowerCase();
              var firstname = userData.FirstName.toLowerCase();
              var lastname = userData.LastName.toLowerCase();
              
              //console.log(criteria);
              
              if (criteria === 'username' && username.includes(searchTerm)) {
                  AddItemToTable(userData.AUTOID, userData.Username, userData.FirstName, userData.MiddleName, userData.LastName, userData.BirthDate);
                 // console.log(searchTerm)
              }
              else if (criteria ==='first_name' && firstname.includes(searchTerm)){
                AddItemToTable(userData.AUTOID, userData.Username, userData.FirstName, userData.MiddleName, userData.LastName, userData.BirthDate);
              }
              else if(criteria == 'last_name' && lastname.includes(searchTerm)){
                AddItemToTable(userData.AUTOID, userData.Username, userData.FirstName, userData.MiddleName, userData.LastName, userData.BirthDate);
              }
        
              
          });
      });
  });
  
  
  
  
  
  /////////////////para lang to sa table 1 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  
  
  
  
  
  
  
  
  
  ///////////////////////////////////    TABLE 2 //////////////////////////////////////////////////////////////////////////
  var recordtbody = document.getElementById('tbody2');
  
  function RecordAddItemToTable(AUTOID,DATE,DASR,Doctor,Amount,Deposit,Bal) {
  
  
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
  function RecordaddAllItemsToTable(patientsrec) {
      recordtbody.innerHTML = "";
      patientsrec.forEach(element => {
          RecordAddItemToTable(element.AUTOID,element.DATE, element.DASR, element.Doctor, element.Amount, element.Deposit, element.BAL);
      });
  }
  function RecordGetAllDataOnce() {
      const dbRef = recorddb.ref("record/");
  
      dbRef.once("value")
          .then((snapshot) => {
              var recpatient = [];
  
              snapshot.forEach((childSnapshot) => {
                  recpatient.push(childSnapshot.val());
              });
  
              RecordaddAllItemsToTable(recpatient);
  
              // Call the sort function after populating the table
              sortTableByAscendingID();
          })
          .catch((error) => {
              console.error("Error fetching data:", error);
          });
  }

  var emez;
  

  
  var tryrecord2;
  var transfer;//assignment value ng RPID na textbox para mapasok ko sa if statement
  var transfer2;//same lang sa transfer pero inulit ko dahil need ko siya ng dalawang
  
 // Attach a click event listener to the tbody element to handle clicks on "Add Record" buttons
tbody.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName === 'BUTTON' && target.id === 'Erecords') {
        // Find the parent row element of the button that was clicked
        var row = target.closest('tr');
        if (row) {
            
            
            var AUTOID = row.cells[0].textContent;
            var userRef = recorddb.ref('record/' + AUTOID);

            userRef.once('value').then(function (snapshot) {
                // Retrieve the records data from the snapshot
                var recordsData = snapshot.val();
                
                
                // Populate the recordtbody with the records data
                recordtbody.innerHTML = ''; // Clear the table first
                for (var key in recordsData) {
                    var record = recordsData[key];
                    
                    
                  transfer = document.getElementById('RPID').value = record.AUTOID;
                  transfer2 = document.getElementById('RPID').value = AUTOID;

            
                    if (transfer === undefined){ // kasi undefined lalabas jan eh dahil hindi niya makita kung sino dahil walang laman 
                      
                       var noRecordRow = document.createElement("tr");
                       var noRecordCell = document.createElement("td");
                        noRecordCell.colSpan = 7;
                        noRecordCell.textContent = "No Record";
                        noRecordRow.appendChild(noRecordCell);
                        recordtbody.appendChild(noRecordRow);
                        break; //para di na ulit mag run kasi minsan ang laman sa firebase is dalawa bydefault
                    }
                    else{
                        RecordAddItemToTable(record.AUTOID, record.Date, record.DASR, record.Doctor , record.Amount, record.Deposit, record.Bal);
                        
                    }
          
                   
                }

                
              document.getElementById('information').hidden = true;
              document.getElementById('records').hidden = false;
            });
        }
    } else {
        // Handle other cases
    }
});

var recordsearchInput = document.getElementById('recordsearchInput');
var recordcriteria = document.getElementById('recordsearchCriteria');

recordsearchInput.addEventListener('input', function () {
    var recordcri = recordcriteria.value.trim().toLowerCase();
    var recordsearchTerm = recordsearchInput.value.trim().toLowerCase();


    // Clear the table
    recordtbody.innerHTML = "";

    // Iterate through the data and filter by username
    // Replace 'record' with your database node
    recorddb.ref('record/' + transfer2).once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var record = childSnapshot.val();
            var diagnosis = record.DASR.toLowerCase();
            var datez = record.Date.toLowerCase();

             
            if (recordcri === 'diagnosis' && diagnosis.includes(recordsearchTerm)) {
                RecordAddItemToTable(record.AUTOID, record.Date, record.DASR, record.Doctor, record.Amount, record.Deposit, record.Bal);
            }
            else if (recordcri ==='date' && datez.includes(recordsearchTerm)){
                RecordAddItemToTable(record.AUTOID, record.Date, record.DASR, record.Doctor, record.Amount, record.Deposit, record.Bal);
              }
        });
    });
});


  ///////////////////////////////////    TABLE 2 //////////////////////////////////////////////////////////////////////////




  
  
  
  

  

  
  function balik(){
      document.getElementById('information').hidden = false;
      document.getElementById('records').hidden=true;
  }

  function balik2(){
    document.getElementById('information').hidden = false;
    document.getElementById('records').hidden=true;
    document.getElementById('update').hidden=true;
    document.getElementById('balik2').hidden=true;
    
}
  
  
  
  
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  
  function dump() {
      previousDatausername = haha;
     
   }
   
  
  //////////////////////////////////////////////// NAG UUPDATE LANG SIYA PAG NAG PALIT NG USERNAME MALI LANG YUNG SA IF STATEMENT!!!
  
      function checkUsernameExists(username) {
          return userdb.ref("user").orderByChild("Username").equalTo(username).once("value");
          }
  
          function UpdateDetails() {
  
              document.getElementById("update").style.display = '';
  
            
              
              dump();
              var newUsername = document.getElementById('Uname').value;
              var password = document.getElementById('Pass').value;
              var firstName = document.getElementById('Fname').value;
              var middleName = document.getElementById('Mname').value;
              var lastName = document.getElementById('Lname').value;
              var gender = document.getElementById('Gender').value;
              var birth = document.getElementById('Bdate').value;
              var email = document.getElementById('Email').value;
              var phoneNum = document.getElementById('Number').value;
              var province = document.getElementById('province').value;
              var CM = document.getElementById('CM').value;
              var barangay = document.getElementById('barangay').value;
              var civilStatus = document.getElementById('Civilstat').value;
              var ID2 =document.getElementById('PID').value;
  
              
          
              // Check if all required fields are filled
              if (
                  lastName != '' && firstName != '' && middleName != '' && birth != '' &&
                  email != '' && gender != '' && province != '' && CM != '' &&  barangay != '' && phoneNum != '' &&
                  newUsername != '' && password != ''
              ) {
                  var currentUsername = currentusernamengtable; // Replace with the current username
          
                  // Check if the newUsername is different from the currentUsername
                  if (newUsername === currentUsername) {
                      
                      userdb.ref('user/' + currentUsername).remove();
                      userdb.ref('user/' + newUsername).set({
                          LastName: lastName,
                          FirstName: firstName,
                          MiddleName: middleName,
                          BirthDate: birth,
                          Email: email,
                          Gender: gender,
                          CivilStatus: civilStatus,
                          Province: province,
                          CityMunicipality:CM,
                          Barangay:barangay,
                          PhoneNum: phoneNum,
                          Username: newUsername, // Use the newUsername here
                          Password: password,
                          AUTOID: ID2,
                      })
                          .then(() => {
                              alert("Details Updated Successfully!");
                              
                          })
                      //alert("Details Updated Successfully!");
                  } else {
                      checkUsernameExists(newUsername)
                      .then(snapshot => {
                          if (!snapshot.exists()) {
                              // Username doesn't exist, proceed with the update
                              userdb.ref('user/' + currentUsername).remove();
                              userdb.ref('user/' + newUsername).set({
                                LastName: lastName,
                                FirstName: firstName,
                                MiddleName: middleName,
                                BirthDate: birth,
                                Email: email,
                                Gender: gender,
                                CivilStatus: civilStatus,
                                Province: province,
                                CityMunicipality:CM,
                                Barangay:barangay,
                                PhoneNum: phoneNum,
                                Username: newUsername, // Use the newUsername here
                                Password: password,
                                AUTOID: ID2,
                              })
                                  .then(() => {
                                      alert("Details Updated Successfully!");
                                  })
                                  .catch((error) => {
                                      alert("Unsuccessful, error: " + error);
                                  });
                          } else {
                              // New username already exists, show an error message
                              alert("Username already exists. Please choose a different username.");
                          }
                      });
                      
                  }
              } else {
                  alert("Please fill in all required fields.");
              }
          }     
  
          
  
  
  
  
  
  
  
  
  
          
  
          function blankdate() {  //To check if yung "DATE" sa database ay laman.
            
            return recorddb.ref("record/" + transfer2 + "/Date").once("value"); //error dito mukhang ewan // pero naisip ko lagyan nalang ng value para di na nag kakaron ng blank space
          }
          
  
  
          
          function AddR(){
          
          
  
              var id2 = transfer2;
              console.log("na lipat ko si " + transfer);
  
                var Date = document.getElementById('Date').value;
                var Amount = document.getElementById('Amount').value;
                var Deposit = document.getElementById('Deposit').value;
                var Bal = document.getElementById('Bal').value;
                var DASR = document.getElementById('DASR').value;
                var DR = document.getElementById('Doctor').value;
   
               if ( Date != '' && Amount != '' && Deposit != '' && Bal != '' && DASR != ''){

              blankdate().then(function(snapshot){//if may "DATE" sa database na walang laman iddelete niya yun
                console.log("ano bako : "+ snapshot.exists());
                if (snapshot.exists()){ 
                recorddb.ref('record/'+ id2 ).remove();
                recorddb.ref('record/' + id2 +'/'+Date).set({
                    AUTOID:id2,
                    Date:Date,
                    Amount: Amount,
                    Deposit: Deposit,
                    Bal:Bal,
                    DASR:DASR,
                    Doctor:DR,
                 
                });
  
                alert('Record added successfully !');
                alert('The page will be refreshed to ensure your data is securely saved');
                  location.reload();

                document.getElementById('Date').value= '';
                document.getElementById('Amount').value = '';
                document.getElementById('Deposit').value= '';
                document.getElementById('Bal').value='';
                document.getElementById('DASR').value='';


               }else{
                recorddb.ref('record/' + id2 +'/'+Date).set({
                    AUTOID:id2,
                    Date:Date,
                    Amount: Amount,
                    Deposit: Deposit,
                    Bal:Bal,
                    DASR:DASR,
                    Doctor:DR, 
                });
                  
                alert('Record added successfully !!');
                alert('The page will be refreshed to ensure your data is securely saved');
                  location.reload();
                  document.getElementById('Date').value= '';
                  document.getElementById('Amount').value = '';
                  document.getElementById('Deposit').value= '';
                  document.getElementById('Bal').value='';
                  document.getElementById('DASR').value='';

                  

               }

              }).catch(function(error){
                console.error("Error occurred:", error);

              });
              
            }else{
                alert("Please fill all textboxes")
            }
            
              
              
              }
          
              function refreshTable() {
                GetAllDataOnce(); // Assuming GetAllDataOnce() fetches the data and populates the table
            }
          
          
          
          
          











            
          
          //////////////////////////////////////////////////////////////////////
        //  ang silbi nito ay para pag pinindot yung button ay makikita yuung mga table
          function Update(){
              document.getElementById("update").style.display = '';
              document.getElementById("Medical").style.display = 'none';
              document.getElementById("PID").disabled = true;
  
          }
          function Records(){
              document.getElementById("Medical").style.display = '';
              document.getElementById("update").style.display = 'none';
              document.getElementById("RPID").disabled = true;
        
          }
          //////////////////////////////////////////////////////////////////////
  
          //////////////////////////////////////////////////////////////////////
          //HIDE TEXTBOX N SHIRZ BY DEFAULT
          document.getElementById("update").style.display = 'none';
          document.getElementById("Medical").style.display = 'none';
          //////////////////////////////////////////////////////////////////////
  
  
  
          function sortTableByAscendingID() {
              var table = document.getElementById('tbody1');
              var rows = Array.from(table.rows);
              
              // Sort the rows based on the ID column (assuming the ID is in the first <td> of each row)
              rows.sort(function (a, b) {
                  var idA = parseInt(a.cells[1].textContent); // Assuming ID is a number
                  var idB = parseInt(b.cells[1].textContent);
                  return idA - idB;
              });
              
              // Remove existing rows from the table
              table.innerHTML = '';
              
              // Append the sorted rows back to the table
              rows.forEach(function (row) {
                  table.appendChild(row);
              });
          }
          
          
  //////////code para sa total patient ng nasa database////////
     
function Totalp(){
  document.getElementById("cav").hidden=true;
  clearngh5();
  userdb.ref('user').once('value',function(snapshot){
    var count = snapshot.numChildren();

    document.getElementById('a1').innerHTML = "Total Patients : "+ count;
  });

}



function TotalCavite(){
  document.getElementById("cav").hidden=true;
  clearngh5();
    userdb.ref('user').once('value', function(snapshot) {
        var Cavitecount = 0;
        snapshot.forEach(function(userSnapshot) {
            var user = userSnapshot.val();
             var convert = user.Province;
            // var smol = convert.trim().toLowerCase();
             console.log("test proof: "+ convert);
            if (user.Province === "Cavite") {
                Cavitecount++;
            }        
        });
        document.getElementById('a1').innerHTML = "Total patient in Cavite: " + Cavitecount;
    }); 
  }

  function TotaloutCavite(){
    document.getElementById("cav").hidden=true;
    clearngh5();
    userdb.ref('user').once('value', function(snapshot) {
        var OutCavitecount = 0;
        snapshot.forEach(function(userSnapshot) {
            var user = userSnapshot.val();
             var convert = user.Province;
            // var smol = convert.trim().toLowerCase();
             console.log("test proof: "+ convert);
            if (user.Province === "Outside Cavite") {
                OutCavitecount++;
            }        
        });
        document.getElementById('a1').innerHTML = "Total patient outside Cavite: " + OutCavitecount;
    }); 

  }















  function TotalCity() {
    document.getElementById("cav").hidden=false;
    clearngh5();
    var citiesWithCounts = [];

    userdb.ref('user').once('value', function(snapshot) {
        var alfctr = 0, amactr = 0, bacctr = 0, carmctr = 0, ccctr = 0, dasctr = 0, geactr = 0, gmactr = 0, gentctr = 0;
        var imsctr = 0, indctr = 0, kawctr = 0, magactr = 0, maractr = 0, menctr = 0, naicctr = 0, novctr = 0, rosctr = 0;
        var silctr = 0, tagctr = 0, tanctr = 0, terctr = 0, trectr = 0, outctr = 0;

        snapshot.forEach(function(userSnapshot) {
            var user = userSnapshot.val();
            var convert = user.CityMunicipality;

            switch (convert) {
                case 'Alfonso':
                    alfctr++;
                    break;
                case 'Amadeo':
                    amactr++;
                    break;
                case 'Bacoor':
                    bacctr++;
                    break;
                case 'Carmona':
                    carmctr++;
                    break;
                case 'Cavite City':
                    ccctr++;
                    break;
                case 'Dasmariñas':
                    dasctr++;
                    break;
                case 'General Emilio Aguinaldo':
                    geactr++;
                    break;
                case 'General Mariano Alvarez':
                    gmactr++;
                    break;
                case 'General Trias':
                    gentctr++;
                    break;
                case 'Imus':
                    imsctr++;
                    break;
                case 'Indang':
                    indctr++;
                    break;
                case 'Kawit':
                    kawctr++;
                    break;
                case 'Magallanes':
                    magactr++;
                    break;
                case 'Maragondon':
                    maractr++;
                    break;
                case 'Mendez':
                    menctr++;
                    break;
                case 'Naic':
                    naicctr++;
                    break;
                case 'Noveleta':
                    novctr++;
                    break;
                case 'Rosario':
                    rosctr++;
                    break;
                case 'Silang':
                    silctr++;
                    break;
                case 'Tagaytay':
                    tagctr++;
                    break;
                case 'Tanza':
                    tanctr++;
                    break;
                case 'Ternate':
                    terctr++;
                    break;
                case 'Trece Martires':
                    trectr++;
                    break;
                case 'N/A':
                    outctr++;
                    break;
                default:
                    outctr++;
                    console.log("wala sa lahat ng nandito may lumabas | nag type user ng wala sa choice");
            }
        });

        if (alfctr !== 0) {
            console.log("alfctr: " + alfctr);
            citiesWithCounts.push({ city: 'Alfonso', count: alfctr });
        }
        if (amactr !== 0) {
            console.log("amactr: " + amactr);
            citiesWithCounts.push({ city: 'Amadeo', count: amactr });
        }
        if (bacctr !== 0) {
            console.log("bacctr: " + bacctr);
            citiesWithCounts.push({ city: 'Bacoor', count: bacctr });
        }
        if (carmctr !== 0) {
            console.log("carmctr: " + carmctr);
            citiesWithCounts.push({ city: 'Carmona', count: carmctr });
        }
        if (ccctr !== 0) {
            console.log("ccctr: " + ccctr);
            citiesWithCounts.push({ city: 'Cavite City', count: ccctr });
        }
        if (dasctr !== 0) {
            console.log("dasctr: " + dasctr);
            citiesWithCounts.push({ city: 'Dasmariñas', count: dasctr });
        }
        if (geactr !== 0) {
            console.log("geactr: " + geactr);
            citiesWithCounts.push({ city: 'General Emilio Aguinaldo', count: geactr });
        }
        if (gmactr !== 0) {
            console.log("gmactr: " + gmactr);
            citiesWithCounts.push({ city: 'General Mariano Alvarez', count: gmactr });
        }
        if (gentctr !== 0) {
            console.log("gentctr: " + gentctr);
            citiesWithCounts.push({ city: 'General Trias', count: gentctr });
        }
        if (imsctr !== 0) {
            console.log("imsctr: " + imsctr);
            citiesWithCounts.push({ city: 'Imus', count: imsctr });
        }
        if (indctr !== 0) {
            console.log("indctr: " + indctr);
            citiesWithCounts.push({ city: 'Indang', count: indctr });
        }
        if (kawctr !== 0) {
            console.log("kawctr: " + kawctr);
            citiesWithCounts.push({ city: 'Kawit', count: kawctr });
        }
        if (magactr !== 0) {
            console.log("magactr: " + magactr);
            citiesWithCounts.push({ city: 'Magallanes', count: magactr });
        }
        if (maractr !== 0) {
            console.log("maractr: " + maractr);
            citiesWithCounts.push({ city: 'Maragondon', count: maractr });
        }
        if (menctr !== 0) {
            console.log("menctr: " + menctr);
            citiesWithCounts.push({ city: 'Mendez', count: menctr });
        }
        if (naicctr !== 0) {
            console.log("naicctr: " + naicctr);
            citiesWithCounts.push({ city: 'Naic', count: naicctr });
        }
        if (novctr !== 0) {
            console.log("novctr: " + novctr);
            citiesWithCounts.push({ city: 'Noveleta', count: novctr });
        }
        if (rosctr !== 0) {
            console.log("rosctr: " + rosctr);
            citiesWithCounts.push({ city: 'Rosario', count: rosctr });
        }
        if (silctr !== 0) {
            console.log("silctr: " + silctr);
            citiesWithCounts.push({ city: 'Silang', count: silctr });
        }
        if (tagctr !== 0) {
            console.log("tagctr: " + tagctr);
            citiesWithCounts.push({ city: 'Tagaytay', count: tagctr });
        }
        if (tanctr !== 0) {
            console.log("tanctr: " + tanctr);
            citiesWithCounts.push({ city: 'Tanza', count: tanctr });
        }
        if (terctr !== 0) {
            console.log("terctr: " + terctr);
            citiesWithCounts.push({ city: 'Ternate', count: terctr });
        }
        if (trectr !== 0) {
            console.log("trectr: " + trectr);
            citiesWithCounts.push({ city: 'Trece Martires', count: trectr });
        }
        if (outctr !== 0) {
            console.log("outctr: " + outctr);
            citiesWithCounts.push({ city: 'Outside Cavite', count: outctr });
        }

        // Loop through the citiesWithCounts array to populate <tbody id="tbody3">
        var tbody3 = document.getElementById("tbody3");
        tbody3.innerHTML = ""; // Clear existing content

        citiesWithCounts.forEach(function(cityObj) {
            var row = tbody3.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = cityObj.city;
            cell2.innerHTML = cityObj.count;
        });
    });
}


   function clearngh5(){
    document.getElementById('a1').innerHTML = '';
    document.getElementById('a2').innerHTML = '';
    document.getElementById('a3').innerHTML = '';
    document.getElementById('a4').innerHTML = '';
    document.getElementById('a5').innerHTML = '';
    document.getElementById('a6').innerHTML = '';
   }



  function TotalGender(){
    
    document.getElementById("cav").hidden=true;
   clearngh5();
    var Mctr = 0 ,  Fctr = 0 ;
    
       userdb.ref('user').once('value',function(snapshot){
              snapshot.forEach(function(userSnapshot){
                var user = userSnapshot.val();

                if (user.Gender==='Female'){
                  Fctr++;
                  
                }else{
                  Mctr++;
                }
                    
               
              })
              
              document.getElementById('a1').innerHTML = 'Total Female : ' + Fctr;
              document.getElementById('a2').innerHTML = 'Total Male : ' + Mctr;
           
       });
  }

  function AgeD() {
    document.getElementById("cav").hidden=false;
    var ITctr = 0, Cctr = 0, Adoctr = 0, LTYActr = 0, MAActr = 0, SENctr = 0;
    var citiesWithCounts = [];

    userdb.ref('user').once('value', function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
            var user = userSnapshot.val();
            var birthDate = user.BirthDate;
            var year = birthDate.substring(0, 4);
            var today = new Date();
            var date = today.getFullYear();
            var agez = date - year;

            if (agez >= 0 && agez <= 2) {
                ITctr++;
            } else if (agez >= 3 && agez <= 12) {
                Cctr++;
            } else if (agez >= 13 && agez <= 17) {
                Adoctr++;
            } else if (agez >= 18 && agez <= 35) {
                LTYActr++;
            } else if (agez >= 36 && agez <= 64) {
                MAActr++;
            } else if (agez >= 65) {
                SENctr++;
            }
        });

        // Populate the citiesWithCounts array
        citiesWithCounts = [
            { city: 'Infant Todler (Age between 0 to 2)', count: ITctr },
            { city: 'Children (Age between 3 to 12)', count: Cctr },
            { city: 'Adolescent (Age between 13 to 17)', count: Adoctr },
            { city: 'Late Teens and Young Adult (Age between 18 to 35)', count: LTYActr },
            { city: 'Middle-Aged Adults (Age between 36 to 64)', count: MAActr },
            { city: 'Senior Citizen (Age 65+)', count: SENctr }
        ];

        // Loop through the citiesWithCounts array to populate the table
        var tbody3 = document.getElementById("tbody3");
        tbody3.innerHTML = ""; // Clear existing content

        citiesWithCounts.forEach(function (cityObj) {
            var row = tbody3.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = cityObj.city;
            cell2.innerHTML = cityObj.count;
        });
    });
}


  /////////////////////////////////////////////////////////////
          



///// pinag hiwalay ko para pipakita lang kung ano yung gusto ipakita


function showP() {
    var y = document.getElementById("Pass")
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
  
  }
  
  
  //////////////////////////////////////////////////////








  function logout() {
    setTimeout(() => {
      window.location.href = "C:/Users/erltu/OneDrive/Documents/Schooollss/CAPSTONE/try/login/login.html";
    }, 500); // Adjust the transition duration as needed
  }

function getLastGeneratedId() {
  return anndb.ref("lastGeneratedId").once("value");
}

// Function to get the last generated ID
function setLastGeneratedId(id) {
  anndb.ref("lastGeneratedId").set(id);
}


function post() {

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + ' ' + today.toLocaleTimeString()
  
  console.log(date);
  
  var textarea = document.getElementById("postz").value;

  if (textarea !== "") {

  getLastGeneratedId().then(lastIdSnapshot => {
    const lastGeneratedId = lastIdSnapshot.val() || 0;
    // Increment the ID
    dagdag = lastGeneratedId - 1;

    // Set the last generated ID in the database
    setLastGeneratedId(dagdag);
    anndb.ref('announcement/' + dagdag +' announcement').set({
      time:date,
      ann: textarea,

    });
  });



 alert("Announcement successfuly posted !");
 document.getElementById("postz").value = " ";
 
}else{
  alert("TextArea does not have content !");
}
  
 }



 function getpost() {
    document.getElementsByTagName("textarea")[0].readOnly = "true";


  const announcementsContainer = document.getElementById('announcements-container');

  anndb.ref('announcement/').once('value', function(snapshot) {
    let announcements = snapshot.val();

    if (announcements) {
      Object.keys(announcements).forEach(key => {
        const announcement = announcements[key];
        if (announcement && announcement.ann) {
          // Create a new textarea element
          const textarea = document.createElement('textarea');
          textarea.value = announcement.ann;

          // Append the textarea to the container
          announcementsContainer.appendChild(textarea);

          // // Trigger auto-resize logic manually
          // resizeTextarea(textarea);
        }
      });
    }
  });
  
}


// //resize naman matik pag pinindot button
// function resizeTextarea(textarea) {
//   textarea.style.height = '63px'; 
//   let scHeight = textarea.scrollHeight;
//   textarea.style.height = `${scHeight}px`;
// }

// document.getElementById('getz').addEventListener('keyup', function(e) {
//   resizeTextarea(e.target);
// });







    
  //mga shit na dapat naka run na pag ka run ng program
  document.getElementById('balik2').hidden =true;
  document.getElementById('records').hidden=true;
//   document.getElementById("cav").hidden=true;
  window.onload = GetAllDataOnce;

  ///sa textarea to para automatic na yuing sizeshit
  /// para sa unang textarea nna mag autoresize kahit type lang kaya di ko na sinama sa una 
  const textareas = document.querySelectorAll("textarea");

  textareas.forEach(textarea => {
    textarea.addEventListener("keyup", e => {
      textarea.style.height = "63px";
      let scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  });

////////////////////////////////////////////////////
 
  sortTableByAscendingID();
  //window.onload = RecordGetAllDataOnce;
  
  
  
 
  // Add this line to show the update form
document.getElementById('information').classList.add('show-form');

// Add this line to show the Medical form
document.getElementById('records').classList.add('show-form');















/* ------ My Appointment Toggle (Pending, To Pay, and Accepted Appointment Navigation) ------ */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.myappointment-nav-item');
    const formRows = document.querySelectorAll('.form-row');

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');

            formRows.forEach(formRow => formRow.style.display = 'none');
            formRows[index].style.display = 'flex';
        });
    });
});

/* ------------------------------------------------------------------------------------------------ */