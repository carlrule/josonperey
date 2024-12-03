var firebaseConfig = {
    apiKey: "AIzaSyCrih2yzDn4-ADl9vOOMcRUzBl3GFEjGdg",
    authDomain: "booking-b8486.firebaseapp.com",
    databaseURL: "https://booking-b8486-default-rtdb.firebaseio.com",
    projectId: "booking-b8486",
    storageBucket: "booking-b8486.appspot.com",
    messagingSenderId: "811552146571",
    appId: "1:811552146571:web:a133cb091615ae060b808e"
}; 
firebase.initializeApp(firebaseConfig);

var usernameadmin = sessionStorage.getItem("adminUsername");









function clearTableBody() {
    var tbody = document.getElementById("tbodyservice");
    tbody.innerHTML = ""; // This will remove all child elements inside the tbody
}

function SelectDataBetweenDatesAndDropdown(startDate, endDate, selectedValue) {
    if ($.fn.DataTable.isDataTable("#fulltbody")) {
        $("#fulltbody").DataTable().destroy();
    }
    clearTableBody();
    var foundRecords = false; // Flag to track if any records were found
    
    firebase.database().ref('finishedappointments')
    .orderByChild('date')
    .startAt(startDate)
    .endAt(endDate)
    .once('value', function(AllRecords) {
        var sortedRecords = []; // Array to store sorted records

        AllRecords.forEach(function(CurrentRecord) {
            sortedRecords.push(CurrentRecord.val()); // Push each record into the array
        });

        // Sort records array by date
        sortedRecords.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        var foundRecords = false;

        sortedRecords.forEach(function(record) {
            var services = record.services;
            if (services.startsWith(selectedValue)) {
                var doctor = record.doctor;
                var date = record.date;
                var time = record.time;
                var lastname = record.lastname;
                var firstname = record.firstname;
                var remarks = record.remarks;

                if ((usernameadmin === "divina.josonperey@gmail.com" && doctor === "Dr Divina P Joson") ||
                    (usernameadmin === "rachelle.josonperey@gmail.com" && doctor === "Dr Rachelle May P Joson")) {
                    AddItemsToServiceTable(doctor, services, date, time, lastname, firstname, remarks);
                    foundRecords = true;
                }
            }
        });
        
        $("#fulltbody").DataTable({
            "responsive": false,
            "lengthChange": false,
            "autoWidth": false,
            "order": [[2, "asc"]],
            "pageLength": 10, // Default number of entries per page
            "columns": [
              { "searchable": true },
              { "searchable": true },
              { "searchable": true },
              { "searchable": true },
              { "searchable": true },
              { "searchable": true },
              { "searchable": false } // Make the "ACTION" column not searchable
            ]
          });
        if (!foundRecords) {
            var tbody = document.getElementById("tbodyservice");
            var trow = document.createElement("tr");
            var td = document.createElement("td");

            td.colSpan = 6;
            td.innerHTML = "No record found";
            td.style.textAlign = "center";

            trow.appendChild(td);
            // tbody.appendChild(trow);
        }
    });

}
function SelectDataBetweenDatesAndDropdown_accepted(startDate, endDate, selectedValue) {
    
    if ($.fn.DataTable.isDataTable("#fulltbody_accepted")) {
        $("#fulltbody_accepted").DataTable().destroy();
    }
    clearTableBody();
    var foundRecords = false; // Flag to track if any records were found
    
    firebase.database().ref('acceptedappointments')
    .orderByChild('date')
    .startAt(startDate)
    .endAt(endDate)
    .once('value', function(AllRecords) {
        var sortedRecords = []; // Array to store sorted records

        AllRecords.forEach(function(CurrentRecord) {
            sortedRecords.push(CurrentRecord.val()); // Push each record into the array
        });

        // Sort records array by date
        sortedRecords.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        
        var foundRecords = false;
        console.log(sortedRecords);
        $("#tbodyservice_accepted").html('')
        sortedRecords.forEach(function(record) {
            var services = record.services;
            if (services.startsWith(selectedValue)) {
                console.log(record);
                var doctor = record.doctor;
                var date = record.date;
                var time = record.time;
                var lastname = record.lastname;
                var firstname = record.firstname;
                var remarks = record.remarks;
                
                if ((usernameadmin === "divina.josonperey@gmail.com" && doctor === "Dr Divina P Joson") ||
                (usernameadmin === "rachelle.josonperey@gmail.com" && doctor === "Dr Rachelle May P Joson")) {
                    AddItemsToServiceTable_accepted(doctor, services, date, time, lastname, firstname, remarks);
                    foundRecords = true;
                }
            }
        });
        
        $("#fulltbody_accepted").DataTable({
            "responsive": false,
            "lengthChange": false,
            "autoWidth": false,
            "order": [[2, "asc"]],
            "pageLength": 10, // Default number of entries per page
            "columns": [
              { "searchable": true },
              { "searchable": true },
              { "searchable": true },
              { "searchable": true },
              { "searchable": true },
              { "searchable": false } // Make the "ACTION" column not searchable
            ]
          });
        if (!foundRecords) {
            var tbody = document.getElementById("tbodyservice_accepted");
            var trow = document.createElement("tr");
            var td = document.createElement("td");
            
            td.colSpan = 6;
            td.innerHTML = "No record found";
            td.style.textAlign = "center";
            
            trow.appendChild(td);
            // tbody.appendChild(trow);
        }
    });

}

function AddItemsToServiceTable(doctor, services, date, time, lastname, firstname, remarks) {
var tbody = document.getElementById("tbodyservice");
var trow = document.createElement("tr");
var td1 = document.createElement("td");
var td2 = document.createElement("td");
var td3 = document.createElement("td");
// var td4 = document.createElement("td");
var td4 = document.createElement("td");
var td5 = document.createElement("td");
var td6 = document.createElement("td");
var td7 = document.createElement("td");

td1.innerHTML = lastname;
td2.innerHTML = firstname;
td3.innerHTML = services;
// td4.innerHTML = remarks;
td4.innerHTML = remarks;
td5.innerHTML = date;
td6.innerHTML = time;
td7.innerHTML = doctor;

trow.appendChild(td1);
trow.appendChild(td2);
trow.appendChild(td3);
// trow.appendChild(td4);
trow.appendChild(td4);
trow.appendChild(td5);
trow.appendChild(td6);
trow.appendChild(td7);

tbody.appendChild(trow);
}
function AddItemsToServiceTable_accepted(doctor, services, date, time, lastname, firstname, remarks) {
var tbody = document.getElementById("tbodyservice_accepted");
var trow = document.createElement("tr");
var td1 = document.createElement("td");
var td2 = document.createElement("td");
var td3 = document.createElement("td");
// var td4 = document.createElement("td");
var td5 = document.createElement("td");
var td6 = document.createElement("td");
var td7 = document.createElement("td");

td1.innerHTML = lastname;
td2.innerHTML = firstname;
td3.innerHTML = services;
// td4.innerHTML = remarks;
td5.innerHTML = date;
td6.innerHTML = time;
td7.innerHTML = doctor;

trow.appendChild(td1);
trow.appendChild(td2);
trow.appendChild(td3);
// trow.appendChild(td4);
trow.appendChild(td5);
trow.appendChild(td6);
trow.appendChild(td7);

tbody.appendChild(trow);

}

function applyFilters() {

    var adminUsername = sessionStorage.getItem("adminUsername");
    const cutAfterPeriod = inputString => inputString.split('.')[0] + '.';
     const result = cutAfterPeriod(adminUsername);
     const currentDateFormatted = new Date().toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

 
     


var startDate = document.getElementById("startDate").value;
var endDate = document.getElementById("endDate").value;
var service = document.getElementById("sortFilter").value;

if((startDate == "" ) || (endDate == "") || (service == ""))
{   
    alert("Please fill all the details!");
}else{

    // Show the table with id "fulltbody"
    var fullTable = document.getElementById("service-table");
    if (fullTable) {
        fullTable.style.display = "block";
    }

    document.getElementById("hide").hidden = false;
    document.getElementById("Prereport").hidden = true;
    clearTableBody(); 

   

  var newstartDate =  new Date(Date.parse(startDate)).toLocaleString('en-US', { month: 'long',day:"2-digit" ,year: 'numeric' });
  var newendDate =  new Date(Date.parse(endDate)).toLocaleString('en-US', { month: 'long',day:"2-digit" ,year: 'numeric' });

var selectedValue = document.getElementById("sortFilter").value;
document.getElementById("report").innerHTML = "All the patient/s that undergo <strong>" + selectedValue + "</strong> from <strong>" + newstartDate + "</strong> to <strong>" + newendDate + "</strong>." ;


document.getElementById("Prereport").innerHTML = " This report has been prepared by  <strong> the secretary of Dr " + result + "</strong> on <strong>" + currentDateFormatted +"</strong>.";
SelectDataBetweenDatesAndDropdown(startDate, endDate, selectedValue);
}



}
function applyFilters_accepted() {

    var adminUsername = sessionStorage.getItem("adminUsername");
    const cutAfterPeriod = inputString => inputString.split('.')[0] + '.';
     const result = cutAfterPeriod(adminUsername);
     const currentDateFormatted = new Date().toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });

 
     


var startDate = document.getElementById("startDate_accepted").value;
var endDate = document.getElementById("endDate_accepted").value;
var service = document.getElementById("sortFilter_accepted").value;

if((startDate == "" ) || (endDate == "") || (service == ""))
{   
    alert("Please fill all the details!");
}else{

    // Show the table with id "fulltbody"
    var fullTable = document.getElementById("service-table_accepted");
    if (fullTable) {
        fullTable.style.display = "block";
    }

    document.getElementById("hide_accepted").hidden = false;
    document.getElementById("Prereport_accepted").hidden = true;
    clearTableBody(); 

   

  var newstartDate =  new Date(Date.parse(startDate)).toLocaleString('en-US', { month: 'long',day:"2-digit" ,year: 'numeric' });
  var newendDate =  new Date(Date.parse(endDate)).toLocaleString('en-US', { month: 'long',day:"2-digit" ,year: 'numeric' });

var selectedValue = document.getElementById("sortFilter_accepted").value;
document.getElementById("report_accepted").innerHTML = "All the patient/s that undergo <strong>" + selectedValue + "</strong> from <strong>" + newstartDate + "</strong> to <strong>" + newendDate + "</strong>." ;


document.getElementById("Prereport_accepted").innerHTML = " This report has been prepared by  <strong> the secretary of Dr " + result + "</strong> on <strong>" + currentDateFormatted +"</strong>.";
SelectDataBetweenDatesAndDropdown_accepted(startDate, endDate, selectedValue);
}



}

function resetAcceptedFilters() {
    // Hide the table with id "fulltbody"
    var fullTable = document.getElementById("service-table_accepted");
    if (fullTable) {
        fullTable.style.display = "none";
    }

    document.getElementById("sortFilter").selectedIndex = 0;
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("report").value = "";
    document.getElementById("report").hidden=true;
    document.getElementById("Prereport").value = "";
    document.getElementById("Prereport").hidden=true;
    document.getElementById("hide").hidden=true;
    clearTableBody(); 
}

function resetFilters() {
    // Hide the table with id "fulltbody"
    var fullTable = document.getElementById("service-table");
    if (fullTable) {
        fullTable.style.display = "none";
    }

    document.getElementById("sortFilter").selectedIndex = 0;
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("report").value = "";
    document.getElementById("report").hidden=true;
    document.getElementById("Prereport").value = "";
    document.getElementById("Prereport").hidden=true;
    document.getElementById("hide").hidden=true;
    clearTableBody(); 
}

function printTableAccepted() {
    var printWindow = window.open('', '_blank');
    printWindow.document.write(document.getElementById('report_accepted').innerHTML);
    
    printWindow.document.write('<br>');
    printWindow.document.write('<br>');
    printWindow.document.write('<br>');
    
    printWindow.document.write('<table border="1">' + document.getElementById('fulltbody_accepted').innerHTML + '</table>');
    
    printWindow.document.write('<br>');
    printWindow.document.write('<br>');
    
    
    printWindow.document.write(document.getElementById('Prereport_accepted').innerHTML);
    printWindow.print();
    }
    

function printTable() {
var printWindow = window.open('', '_blank');
printWindow.document.write(document.getElementById('report').innerHTML);

printWindow.document.write('<br>');
printWindow.document.write('<br>');
printWindow.document.write('<br>');

printWindow.document.write('<table border="1">' + document.getElementById('fulltbody').innerHTML + '</table>');

printWindow.document.write('<br>');
printWindow.document.write('<br>');


printWindow.document.write(document.getElementById('Prereport').innerHTML);
printWindow.print();
}

document.getElementById("hide").hidden=true;

function dashboardAppointments() {
    var userApp = firebase.initializeApp(firebaseConfig, "userApp");
    var userDatabase = userApp.database();

        Promise.all([
            userDatabase.ref('canceledappointments').once('value'),
            userDatabase.ref('pendingappointments').once('value'),
            userDatabase.ref('rejectedappointments').once('value'),
            userDatabase.ref('acceptedappointments').once('value'),
            userDatabase.ref('finishedappointments').once('value'),
            userDatabase.ref('unfinishedappointments').once('value')
        ])
        .then(snapshots => {
            let totalnumberOfAppointments = 0;
        
            snapshots.forEach(snapshot => {
                snapshot.forEach(childSnapshot => {
                    const appointment = childSnapshot.val();
                    
                    if (usernameadmin === "divina.josonperey@gmail.com"){
                        if (appointment.doctor === "Dr Divina P Joson") {
                            totalnumberOfAppointments++;
                        }
                    }
                    else if (usernameadmin === "rachelle.josonperey@gmail.com"){
                        if (appointment.doctor === "Dr Rachelle May P Joson") {
                            totalnumberOfAppointments++;
                        }
                    }

                });
            });
 
    
            const totalAppointmentsElement = document.getElementById('totalAppointments');
            totalAppointmentsElement.innerText = totalnumberOfAppointments++;
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
        

        const currentDate = new Date().toISOString().split('T')[0];
        const todayRef = userDatabase.ref('acceptedappointments');
        
        todayRef.orderByChild('date').equalTo(currentDate).once('value', function(snapshot) {
            let numberOfAppointments = 0;
        
            snapshot.forEach(function(childSnapshot) {
                const appointment = childSnapshot.val();
                if (usernameadmin === "divina.josonperey@gmail.com"){
                    if (appointment.doctor === "Dr Divina P Joson") {
                        numberOfAppointments++;
                    }
                }
                else if (usernameadmin === "rachelle.josonperey@gmail.com"){
                    if (appointment.doctor === "Dr Rachelle May P Joson") {
                        numberOfAppointments++;
                    }
                }
            });
        
            const todayAppointmentsElement = document.getElementById('todaysAppointments');
            if (numberOfAppointments > 0) {
                todayAppointmentsElement.innerText = numberOfAppointments;
            } else {
                todayAppointmentsElement.innerText = 'No appointments today';
            }
        });
}

  
  
  
var usernameadmin = sessionStorage.getItem("adminUsername");

function filterAppointments() {
    var selectedOption = document.getElementById("filterDropdown").value;
    if (selectedOption === "today") {
        document.getElementById("tbodyaccepted").innerHTML = "";
        SelectAllPendingToday();
    } else if (selectedOption === "all") {
        document.getElementById("tbodyaccepted").innerHTML = "";
        // SelectAllPendingData();
    }
}
function moveAppointmentToReference(appointment, destinationRef, appointmentKey) {
    const dbRef = firebase.database().ref(destinationRef); // Initialize Firebase database reference
    const newAppointmentRef = dbRef.child(appointmentKey); // Create a child reference using appointmentKey
    newAppointmentRef.set(appointment).then(() => { // Set appointment data
        console.log("Appointment moved successfully");
        filterAppointments();
        SelectAllDataAccepted();
        dashboardAppointments();
    }).catch((error) => {
        console.error("Error moving appointment:", error);
    });
}


function removeAppointmentFromPending(appointmentKey) {
    const dbRef = firebase.database().ref("pendingappointments");
    const appointmentToDeleteRef = dbRef.child(appointmentKey);
    
    appointmentToDeleteRef.remove()
        .then(() => {
            console.log("Appointment removed successfully");

    
        })
        .catch((error) => {
            console.error("Error removing appointment:", error);
        });
}
function sendMessage(message, phoneNumber) {
    const apikey = "5b469cdc4556e213de6021e680e28d69";
    console.log("Phone Number:", phoneNumber); // Check if the phone number is correct
    const parameters = {
        apikey,
        number: phoneNumber,
        message,
    };

    fetch('https://api.semaphore.co/api/v4/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(parameters),
    })
    .then(response => response.text())
    .then(output => {
        console.log("API Response:", output); // Log the response from the API
    })
    .catch(error => {
        console.error("Fetch Error:", error); // Log any errors that occur
    });
}

function sendMail(email, message) {
    var params = {
        email: email,
        message: message,
    };

    const serviceID = "service_8ou463i";
    const templateID = "template_eu8jguc";

        emailjs.send(serviceID, templateID, params)
        .then(res=>{
            console.log(res);

        })
        .catch(err=>console.log(err));

    }
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function moveAcceptedToReference(appointment, destinationRef, appointmentKey) {
    const dbRef = firebase.database().ref(destinationRef);
    const newAppointmentRef = dbRef.child(appointmentKey);
    newAppointmentRef.set(appointment).then(() => { 
        console.log("Appointment moved successfully");
        filterDate();
        SelectAllFinishedData();
        dashboardAppointments();
    }).catch((error) => {
        console.error("Error moving appointment:", error);
    });
}


function removeAppointmentFromAccepted(appointmentKey) {
    const dbRef = firebase.database().ref("acceptedappointments");
    const appointmentToDeleteRef = dbRef.child(appointmentKey);
    
    appointmentToDeleteRef.remove()
        .then(() => {
            console.log("Appointment removed successfully");
            // window.location='adminafterlog.html'
        })
        .catch((error) => {
            console.error("Error removing appointment:", error);
        });

        
}

function filterDate() {
    var selectedOption = document.getElementById("filterDate").value;
    
    if (selectedOption === "today") {
        document.getElementById("tbodyaccept").innerHTML = "";
        SelectAllDataAcceptedToday();
    } else if (selectedOption === "all") {
        document.getElementById("tbodyaccept").innerHTML = "";
        SelectAllDataAccepted();
    }
}
function SelectAllDataAccepted() {
    var recordsAcceptedFound = false;
    document.getElementById("tbodyaccept").innerHTML = "";
    firebase.database().ref('acceptedappointments').once('value',
        function(AllRecords) {
            AllRecords.forEach(function(CurrentRecord) { 
                var address = CurrentRecord.val().address;
                var birthday = CurrentRecord.val().birthday;
                var civilstatus = CurrentRecord.val().civilstatus;
                var date = CurrentRecord.val().date;
                var doctor = CurrentRecord.val().doctor;
                var email = CurrentRecord.val().email;
                var gender = CurrentRecord.val().gender;
                var lastname = CurrentRecord.val().lastname;
                var middlename = CurrentRecord.val().middlename;
                var firstname = CurrentRecord.val().firstname;
                var number = CurrentRecord.val().number;
                var services = CurrentRecord.val().services;
                var time = CurrentRecord.val().time;
                var username = CurrentRecord.val().username;
                var visitby = CurrentRecord.val().visitby; 
                var price = CurrentRecord.val().price; 

                if(doctor === "Dr Divina P Joson" && usernameadmin === "divina.josonperey@gmail.com"){
                    AddItemsToAccepted(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, price, firstname, number, services, time, username, visitby);
                    recordsAcceptedFound  = true;
                }
                else if(doctor === "Dr Rachelle May P Joson" && usernameadmin === "rachelle.josonperey@gmail.com"){
                    AddItemsToAccepted(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, price, firstname, number, services, time, username, visitby);
                    recordsAcceptedFound  = true;
                }
            });
            // Destroy previous DataTable instance, if it exists
if ($.fn.DataTable.isDataTable("#accepted_patients")) {
    $("#accepted_patients").DataTable().destroy();
}

// Initialize new DataTable
$("#accepted_patients").DataTable({
    "responsive": false,
    "lengthChange": false,
    "autoWidth": false,
    "order": [[2, "asc"]],
    "pageLength": 10, // Default number of entries per page
    "columns": [
        { "searchable": true },
        { "searchable": true },
        { "searchable": true },
        { "searchable": true },
        { "searchable": true },
        { "searchable": true },
        { "searchable": false } // Make the "ACTION" column not searchable
    ]
});

            if (!recordsAcceptedFound) {
                var tbody = document.getElementById("tbodyaccept");
                var trow = document.createElement("tr");
                var tdNoRecords = document.createElement("td");
                tdNoRecords.colSpan = 7;
                tdNoRecords.innerText = "";
                tdNoRecords.style.textAlign = "center";
                trow.appendChild(tdNoRecords);
                tbody.appendChild(trow);
            }
        });
        
}
function SelectAllDataAcceptedToday() {
    var recordsAcceptedFound = false;
    var currentDate = new Date().toISOString().slice(0, 10);
    document.getElementById("tbodyaccept").innerHTML = "";
    firebase.database().ref('acceptedappointments').once('value',
        function(AllRecords) {
            AllRecords.forEach(function(CurrentRecord) { 
                var address = CurrentRecord.val().address;
                var birthday = CurrentRecord.val().birthday;
                var civilstatus = CurrentRecord.val().civilstatus;
                var date = CurrentRecord.val().date;
                var doctor = CurrentRecord.val().doctor;
                var email = CurrentRecord.val().email;
                var gender = CurrentRecord.val().gender;
                var lastname = CurrentRecord.val().lastname;
                var middlename = CurrentRecord.val().middlename;
                var firstname = CurrentRecord.val().firstname;
                var number = CurrentRecord.val().number;
                var services = CurrentRecord.val().services;
                var time = CurrentRecord.val().time;
                var username = CurrentRecord.val().username;  
                var visitby = CurrentRecord.val().visitby; 
                var price = CurrentRecord.val().price; 

                if(doctor === "Dr Divina P Joson" && usernameadmin === "divina.josonperey@gmail.com" && date === currentDate){
                    AddItemsToAccepted(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, price, firstname, number, services, time, username, visitby);
                    recordsAcceptedFound  = true;
                }
                else if(doctor === "Dr Rachelle May P Joson" && usernameadmin === "rachelle.josonperey@gmail.com" && date === currentDate){
                    AddItemsToAccepted(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, price, firstname, number, services, time, username, visitby);
                    recordsAcceptedFound  = true;
                }
        
            });
            if (!recordsAcceptedFound) {
                // var tbody = document.getElementById("tbodyaccept");
                // var trow = document.createElement("tr");
                // var tdNoRecords = document.createElement("td");
                // tdNoRecords.colSpan = 7;
                // tdNoRecords.innerText = "";
                // tdNoRecords.style.textAlign = "center";
                // trow.appendChild(tdNoRecords);
                // tbody.appendChild(trow);
            }
        });
        
}

function AddItemsToAccepted(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, price, firstname, number, services, time, username, visitby) {
    const appointmentKey = `${username} ${doctor} ${date} ${time}`;
    const appointmentKey_ = `${username} ${doctor} ${date} ${time} ${services}`;
    
    let tbody = document.getElementById("tbodyaccept");
    let trow = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    let td7 = document.createElement("td");
    let td8 = document.createElement("td");

    td1.innerHTML = lastname;
    td2.innerHTML = firstname;
    td3.innerHTML = services;
    td4.innerHTML = date;
    td5.innerHTML = time;
    td6.innerHTML = doctor;
    td7.innerHTML = visitby;
    
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    
    var ControlDiv = document.createElement("div");

        var acceptButton = document.createElement("button");
        acceptButton.className = "btn btn-primary";
        acceptButton.innerText = "Finished";
        acceptButton.onclick = function() {
            document.querySelector(".popup-accept").style.display = "flex";
            document.getElementById("remarks").addEventListener("click", function(){
               const remarks_value = document.getElementById("remarks_value").value;
               if (remarks_value  === ""){
                   document.getElementById("errorMsg").textContent = "Text field should not be empty.";
                   return;
               } else {
                   document.getElementById("errorMsg").textContent = "";
                   moveAcceptedToReference(
                       {
                           doctor, services, date, time, lastname, firstname,
                           email, number, price, middlename, gender, address, civilstatus, birthday, visitby, username, remarks: remarks_value 
                       },
                       "finishedappointments",
                       appointmentKey_
                   );
                   document.getElementById("remarks_value").value = "";
                   document.querySelector(".popup-accept").style.display = "none";
                   trow.style.display = "none";
                //    removeAppointmentFromAccepted(appointmentKey);

               }
           });
        };


        var rejectButton = document.createElement("button");
        
        rejectButton.className = "btn btn-danger";
        rejectButton.innerText = "Patient did not arrive";
        rejectButton.onclick = function() {
            sendMessage(`Hi ${firstname} ${lastname},

We regret to inform you that you missed your scheduled appointment. Unfortunately, the reservation fee for your appointment will not be refunded.

If you have any questions or concerns, please don't hesitate to contact us.

Best regards,
Joson-Perey Dental Clinic`, number);
sendMail(email, `Hi ${firstname} ${lastname},

We regret to inform you that you missed your scheduled appointment. Unfortunately, the reservation fee for your appointment will not be refunded.

If you have any questions or concerns, please don't hesitate to contact us.

Best regards,
Joson-Perey Dental Clinic`);

         
            moveAcceptedToReference(
                {
                    doctor, services, date, time, lastname, firstname,
                    email, number, middlename, gender, address, civilstatus, birthday , username
                },
                "unfinishedappointments",
                appointmentKey
            );
            trow.style.display = "none";
            removeAppointmentFromAccepted(appointmentKey);
        };
        document.getElementById("back").addEventListener("click", function(){
            document.querySelector(".popup-accept").style.display = "none";
            document.getElementById("errorMsg").textContent = "";
        });
        ControlDiv.appendChild(acceptButton);
        ControlDiv.appendChild(rejectButton);
        td8.setAttribute('style', 'white-space: nowrap;');
        td8.appendChild(ControlDiv);
        trow.appendChild(td8);


        tbody.appendChild(trow);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function filterFinished() {
    var selectedOption = document.getElementById("filterFinished").value;
    
    if (selectedOption === "today") {
        document.getElementById("tbodyfinished").innerHTML = "";
        SelectAllFinishedDataToday();
    } else if (selectedOption === "all") {
        document.getElementById("tbodyfinished").innerHTML = "";
        SelectAllFinishedData();
    }
}

function SelectAllFinishedData() {

    
    var usernameadmin = sessionStorage.getItem("adminUsername");
    
    document.getElementById("tbodyfinished").innerHTML = "";
    var recordsCompletedFound = false;
    
    firebase.database().ref('finishedappointments').once('value',
        function(AllRecords) {
            AllRecords.forEach(function(CurrentRecord) { 
                var address = CurrentRecord.val().address;
                var birthday = CurrentRecord.val().birthday;
                var civilstatus = CurrentRecord.val().civilstatus;
                var date = CurrentRecord.val().date;
                var doctor = CurrentRecord.val().doctor;
                var email = CurrentRecord.val().email;
                var gender = CurrentRecord.val().gender;
                var lastname = CurrentRecord.val().lastname;
                var middlename = CurrentRecord.val().middlename;
                var firstname = CurrentRecord.val().firstname;
                var number = CurrentRecord.val().number;
                var services = CurrentRecord.val().services;
                var time = CurrentRecord.val().time;
                var username = CurrentRecord.val().username;
                var remarks = CurrentRecord.val().remarks;
                
                if(doctor === "Dr Divina P Joson" && usernameadmin === "divina.josonperey@gmail.com"){
                    AddItemsToFinished(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, firstname, number, services, time, username, remarks);
                    recordsCompletedFound = true;
                }
                else if(doctor === "Dr Rachelle May P Joson" && usernameadmin === "rachelle.josonperey@gmail.com"){
                    AddItemsToFinished(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, firstname, number, services, time, username, remarks);
                    recordsCompletedFound = true;
                }
                
            });
            if ($.fn.DataTable.isDataTable("#completed_patients")) {
                $("#completed_patients").DataTable().destroy();
            }
            $("#completed_patients").DataTable({
                "responsive": false,
                "lengthChange": false,
                "autoWidth": false,
                "order": [[2, "asc"]],
                "pageLength": 10, // Default number of entries per page
                "columns": [
                  { "searchable": true },
                  { "searchable": true },
                  { "searchable": true },
                  { "searchable": true },
                  { "searchable": true },
                  { "searchable": true },
                  { "searchable": false } // Make the "ACTION" column not searchable
                ]
              });
            if (!recordsCompletedFound) {
                // var tbody = document.getElementById("tbodyfinished");
                // var trow = document.createElement("tr");
                // var tdNoRecords = document.createElement("td");
                // tdNoRecords.colSpan = 7;
                // tdNoRecords.innerText = "";
                // tdNoRecords.style.textAlign = "center";
                // trow.appendChild(tdNoRecords);
                // tbody.appendChild(trow);
            }
        });
        
}
function SelectAllFinishedDataToday() {
    document.getElementById("tbodyfinished").innerHTML = "";
    var recordsCompletedFound = false;

    var currentDate = new Date().toISOString().slice(0, 10);
    firebase.database().ref('finishedappointments').once('value',
        function(AllRecords) {
            AllRecords.forEach(function(CurrentRecord) { 
                var address = CurrentRecord.val().address;
                var birthday = CurrentRecord.val().birthday;
                var civilstatus = CurrentRecord.val().civilstatus;
                var date = CurrentRecord.val().date;
                var doctor = CurrentRecord.val().doctor;
                var email = CurrentRecord.val().email;
                var gender = CurrentRecord.val().gender;
                var lastname = CurrentRecord.val().lastname;
                var middlename = CurrentRecord.val().middlename;
                var firstname = CurrentRecord.val().firstname;
                var number = CurrentRecord.val().number;
                var services = CurrentRecord.val().services;
                var time = CurrentRecord.val().time;
                var username = CurrentRecord.val().username;
                var remarks = CurrentRecord.val().remarks;
               

                if(doctor === "Dr Divina P Joson" && usernameadmin === "divina.josonperey@gmail.com" && date === currentDate){
                    AddItemsToFinished(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, firstname, number, services, time, username, remarks);
                    recordsCompletedFound = true;
                }
                else if(doctor === "Dr Rachelle May P Joson" && usernameadmin === "rachelle.josonperey@gmail.com" && date === currentDate){
                    
                    AddItemsToFinished(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, firstname, number, services, time, username, remarks);
                    recordsCompletedFound = true;
                }
              
            });
            if (!recordsCompletedFound) {
                var tbody = document.getElementById("tbodyfinished");
                var trow = document.createElement("tr");
                var tdNoRecords = document.createElement("td");
                tdNoRecords.colSpan = 7;
                tdNoRecords.innerText = "";
                tdNoRecords.style.textAlign = "center";
                trow.appendChild(tdNoRecords);
                tbody.appendChild(trow);
            }
        });
       
        
}

function AddItemsToFinished(address, birthday, civilstatus, date, doctor, email, gender, lastname, middlename, firstname, number, services, time, username, remarks) {
    const appointmentKey = `${username} ${doctor} ${date} ${time}`;
    
    var tbody = document.getElementById("tbodyfinished");
    var trow = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");


    td1.innerHTML = lastname;
    td2.innerHTML = firstname;
    td3.innerHTML = services;
    td4.innerHTML = remarks;
    td5.innerHTML = date;
    td6.innerHTML = time;
    td7.innerHTML = doctor;
    
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    tbody.appendChild(trow);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const circles = document.querySelectorAll(".circle"),
progressBar = document.querySelector(".indicator"),
buttons = document.querySelectorAll("button");

const step1 = "assets/adminblock/step1.html"
const step2 = "assets/adminblock/step2.html"
const step3 = "assets/adminblock/calendar.php";
const step3b = "assets/adminblock/calendarb.php";
const step4 = "assets/adminblock/step4.html"; 
const step5 = "assets/adminblock/payment.html"; 
const step6 = "assets/adminblock/step5.html"; 

const iframe = document.getElementById("myIframe");

const textstep1 = document.getElementById("doctor_step1");
const textstep2 = document.getElementById("services_step2");
const textstep3a = document.getElementById("date_step3");
const textstep3b = document.getElementById("time_step3");

const textstep4a = document.getElementById("last_name");
const textstep4b = document.getElementById("first_name");
const textstep4c = document.getElementById("email");
const textstep4d = document.getElementById("phone_number");
const textstep4e = document.getElementById("middle_name");
const textstep4f = document.getElementById("gender");
const textstep4g = document.getElementById("address");
const textstep4h = document.getElementById("civil_status");
const textstep4i = document.getElementById("birthday");

var username = sessionStorage.getItem("passValueUser");

let priceElement = document.getElementById("price");

let currentStep = 1;
iframe.classList.add('medium3'); 
// function that updates the current step and updates the DOM
window.addEventListener("message", (event) =>  { //Event listener para mga iframe
// Ensure the message is from the iframe's origin

if (event.origin === window.location.origin) { // Kung saan manggagaling yung event
const receivedValue = event.data; //Data na marereceived 
if (currentStep === 1) {
document.getElementById("doctor_step1").value = receivedValue; 
}
else if (currentStep === 2){
document.getElementById("services_step2").value = receivedValue; //Data na marereceived 
if (document.getElementById("services_step2").value == "Oral Prophylaxis (₱1,650)") {
    priceElement = "825";
} 
else if (document.getElementById("services_step2").value == "Extraction (₱2,000)") {
    priceElement = "1000";
} 
else if (document.getElementById("services_step2").value == "Light Curing (₱3,500)") {
    priceElement = "1750";
} 
else if (document.getElementById("services_step2").value == "Pits and Fissure (₱3,500)") {
    priceElement = "1750";
}
else if (document.getElementById("services_step2").value == "Diastema Closure (₱8,500)") {
    priceElement = "4250";
}
else if (document.getElementById("services_step2").value == "Flouride Application (₱7,500)") {
    priceElement = "3750";
}  
else if (document.getElementById("services_step2").value == "Periodontal Treatment (₱10,000)") {
    priceElement = "5000";
}
else if (document.getElementById("services_step2").value == "Endodotontic Treatment (₱4,200)") {
    priceElement = "2100";
} 
else if (document.getElementById("services_step2").value == "Orthodontic Attachment (₱38,000)") {
    priceElement= "19000";
}   
else if (document.getElementById("services_step2").value == "Orthodontic Adjustment (₱1,200)") {
    priceElement = "600";
}
else if (document.getElementById("services_step2").value == "Removable Patial Denture (₱28,000)") {
    priceElement = "14000";
}
else if (document.getElementById("services_step2").value == "Complete Denture (₱20,000)") {
    priceElement= "10000";
}
else if (document.getElementById("services_step2").value == "Crown and Bridges (₱10,000)") {
    priceElement = "5000";
}
else if (document.getElementById("services_step2").value == "Flexite Denture (₱30,000)") {
    priceElement = "15000";
}
else if (document.getElementById("services_step2").value == "Laminate Veneer (₱10,350)") {
    priceElement = "5175";
}
else if (document.getElementById("services_step2").value == "Teeth Whitening (₱7,000)") {
    priceElement = "3500";
}          
}  

else if (currentStep === 3){
if (receivedValue){

    iframe.classList.add('medium2'); 
    iframe.classList.remove('large');
}
 
if (Array.isArray(receivedValue) && receivedValue.length === 2) {
  
    document.getElementById("date_step3").value = receivedValue[0];
    document.getElementById("time_step3").value  = receivedValue[1];
    iframe.classList.add('mediumsmall'); // Add large class
    iframe.classList.remove('medium2');
    document.getElementById("errorMsg").textContent = "";
}
const dateStep3 = document.getElementById("date_step3").value;
const timeStep3 = document.getElementById("time_step3").value;




var iframeSrc;
if (dateStep3 && timeStep3) {

  iframeSrc = `${step3}?date=${encodeURIComponent(dateStep3)}&time=${encodeURIComponent(timeStep3)}`;
  iframe.src = iframeSrc;
}

}
else if (currentStep === 4){
textstep4a.value = receivedValue.LastName;
textstep4b.value = receivedValue.FirstName;
textstep4c.value = receivedValue.Email;
textstep4d.value = receivedValue.PhoneNum;
textstep4e.value = receivedValue.MiddleName;
textstep4f.value = receivedValue.Gender;
textstep4g.value = receivedValue.Address;
textstep4h.value = receivedValue.CivilStatus;
textstep4i.value = receivedValue.BirthDate;
}
}
});
const updateSteps = (e) => {
window.scrollTo({
    top: 0,
    behavior: 'smooth'
});
if (currentStep === 1) {

const textValue1 = textstep1.value.trim();
if (textValue1 === "") {

  // Display an error message and prevent the "Next" button from working
  document.getElementById("errorMsg").textContent = "Please select your preferred doctor to proceed.";

  return;
  
} else {
  // Clear the error message and enable the "Next" button
  document.getElementById("errorMsg").textContent = "";

}

}

if (currentStep === 2 && e.target.id === "next") {
const textValue2 = textstep2.value.trim();

if (textValue2 === "") {
document.getElementById("errorMsg").textContent = "Please select your preferred service to proceed.";
return;
} else {
document.getElementById("errorMsg").textContent = "";

}
}
else if (currentStep === 2 && e.target.id === "prev") {
document.getElementById("errorMsg").textContent = "";
}

if (currentStep === 3 && e.target.id === "next") {


const textValue3 = textstep3a.value.trim();
const textValue4 = textstep3b.value.trim();



if (textValue3 === "" || textValue4 === "") {

  // Display an error message and prevent the "Next" button from working
  document.getElementById("errorMsg").textContent = "Please select your preferred date and time to proceed.";

  return;
  
} else {
  // Clear the error message and enable the "Next" button
  document.getElementById("errorMsg").textContent = "";
  
  
}
}
else if (currentStep === 3 && e.target.id === "prev") {
document.getElementById("errorMsg").textContent = "";
}



if (currentStep === 4 && e.target.id === "next") {


const textValue5 = textstep4a.value.trim();
const textValue6 = textstep4b.value.trim();
const textValue7 = textstep4c.value.trim();
const textValue8 = textstep4d.value.trim();
const textValue9 = textstep4e.value.trim();
const textValue10 = textstep4f.value.trim();
const textValue11 = textstep4g.value.trim();
const textValue12 = textstep4h.value.trim();
const textValue13 = textstep4i.value.trim();
if (textValue5 === "" || textValue6 === "" || textValue7 === "" || textValue8 === "" || textValue9 === "" || textValue10 === "" || textValue11 === "" || textValue12 === "" || textValue13 === "") {

  // Display an error message and prevent the "Next" button from working
  document.getElementById("errorMsg").textContent = "Text field should not be empty.";

  sessionStorage.setItem("someone_else1", textValue5);
  sessionStorage.setItem("someone_else2", textValue6);
  sessionStorage.setItem("someone_else3", textValue7);
  sessionStorage.setItem("someone_else4", textValue8);
  sessionStorage.setItem("someone_else5", textValue9);
  sessionStorage.setItem("someone_else7", textValue10);
  sessionStorage.setItem("someone_else7", textValue11);
  sessionStorage.setItem("someone_else8", textValue12);
  sessionStorage.setItem("someone_else9", textValue13);

  return;
  
} else {
  // Clear the error message and enable the "Next" button
  document.getElementById("errorMsg").textContent = "";
  
}
}  else if (currentStep === 4 && e.target.id === "prev") {
document.getElementById("errorMsg").textContent = "";
}


// Update current step based on the button clicked
currentStep = e.target.id === "next" ? ++currentStep : --currentStep;

// Loop through all circles and add/remove "active" class based on their index and current step
circles.forEach((circle, index) => {
  circle.classList[`${index < currentStep ? "add" : "remove"}`]("active");
});

// Update progress bar width based on current step
progressBar.style.width = `${((currentStep - 1) / (circles.length - 1)) * 100}%`;


// Check if current step is last step or first step and disable corresponding buttons
if (currentStep === 2) {
document.getElementById("doctor_step1").style.display = "none";
document.getElementById("services_step2").type = "text";
document.getElementById("services_step2").style.display = "block";
document.getElementById("date_step3").style.display = "none";
document.getElementById("time_step3").style.display = "none";


iframe.src = step2;

iframe.classList.add('small'); // Add large class
iframe.classList.remove('large');
iframe.classList.remove('medium3');
iframe.classList.remove('medium2');
iframe.classList.remove('mediumsmall');




} else if (currentStep === 3) {

document.getElementById("services_step2").style.display = "none";
document.getElementById("date_step3").type = "text";
document.getElementById("time_step3").type = "text";
document.getElementById("date_step3").style.display = "block";
document.getElementById("time_step3").style.display = "block";

document.getElementById("last_name").style.display = "none";
document.getElementById("first_name").style.display = "none";
document.getElementById("email").style.display = "none";
document.getElementById("phone_number").style.display = "none";
document.getElementById("middle_name").style.display = "none";
document.getElementById("gender").style.display = "none";
document.getElementById("address").style.display = "none";
document.getElementById("civil_status").style.display = "none";
document.getElementById("birthday").style.display = "none";

const selectedService = document.getElementById("services_step2").value;

const dateStep3 = document.getElementById("date_step3").value;
const timeStep3 = document.getElementById("time_step3").value;

if(dateStep3 !== ""&& timeStep3 !== ""){
  iframe.classList.add('mediumsmall'); // Add large class
  iframe.classList.remove('small')
iframe.classList.remove('medium4');
} else {
  iframe.classList.add('large'); // Add large class
  iframe.classList.remove('small')
  iframe.classList.remove('medium4');
}

var blockdateValue = localStorage.getItem("blockdate");
var iframeSrc;

const textValue1 = textstep1.value.trim();

if (textValue1 === 'Dr Divina P Joson'){
  if (blockdateValue && dateStep3 && timeStep3) {
    iframeSrc = `${step3}?service=${encodeURIComponent(selectedService)}&blockedDate=${encodeURIComponent(blockdateValue)}&date=${encodeURIComponent(dateStep3)}&time=${encodeURIComponent(timeStep3)}`;
  }
  else if (dateStep3 && timeStep3) {

    iframeSrc = `${step3}?service=${encodeURIComponent(selectedService)}&date=${encodeURIComponent(dateStep3)}&time=${encodeURIComponent(timeStep3)}`;
  }
  else if (blockdateValue) {
    iframeSrc = `${step3}?service=${encodeURIComponent(selectedService)}&blockedDate=${encodeURIComponent(blockdateValue)}`;
  } else {
    iframeSrc = `${step3}?service=${encodeURIComponent(selectedService)}`;
  }
} else if (textValue1 === 'Dr Rachelle May P Joson'){
  if (blockdateValue && dateStep3 && timeStep3) {
    iframeSrc = `${step3b}?service=${encodeURIComponent(selectedService)}&blockedDate=${encodeURIComponent(blockdateValue)}&date=${encodeURIComponent(dateStep3)}&time=${encodeURIComponent(timeStep3)}`;
  }
  else if (dateStep3 && timeStep3) {

    iframeSrc = `${step3b}?service=${encodeURIComponent(selectedService)}&date=${encodeURIComponent(dateStep3)}&time=${encodeURIComponent(timeStep3)}`;
  }
  else if (blockdateValue) {
    iframeSrc = `${step3b}?service=${encodeURIComponent(selectedService)}&blockedDate=${encodeURIComponent(blockdateValue)}`;
  } else {
    iframeSrc = `${step3b}?service=${encodeURIComponent(selectedService)}`;
  }
}

iframe.src = iframeSrc;
}
else if (currentStep === 4) {
document.getElementById("date_step3").style.display = "none";
document.getElementById("time_step3").style.display = "none";
  document.getElementById("last_name").type = "text";
  document.getElementById("first_name").type = "text";
  document.getElementById("email").type = "text";
  document.getElementById("phone_number").type = "text";
  document.getElementById("middle_name").type = "text";
  document.getElementById("gender").type = "text";
  document.getElementById("address").type = "text";
  document.getElementById("civil_status").type = "text";
  document.getElementById("birthday").type = "text";

  document.getElementById("last_name").style.display = "none";
  document.getElementById("first_name").style.display = "none";
  document.getElementById("email").style.display = "none";
  document.getElementById("phone_number").style.display = "none";
  document.getElementById("middle_name").style.display = "none";
  document.getElementById("gender").style.display = "none";
  document.getElementById("address").style.display = "none";
  document.getElementById("civil_status").style.display = "none";
  document.getElementById("birthday").style.display = "none";

  iframe.classList.add('medium4'); // Add large class
  iframe.classList.remove('medium3');


  iframe.src = step4;
} else if (currentStep === 1) {
iframe.classList.add('medium3'); // Add large class
iframe.classList.remove('small');
document.getElementById("doctor_step1").style.display = "block";
document.getElementById("services_step2").style.display = "none";
  iframe.src = step1;

} 
else if (currentStep === 5) {
window.scrollTo({
  top: 0,
  behavior: 'smooth'
});
iframe.src = step6;
var doctor =  document.getElementById("doctor_step1").value;
var services = document.getElementById("services_step2").value;
var date = document.getElementById("date_step3").value;
var time = document.getElementById("time_step3").value
var lastname = document.getElementById("last_name").value;
var firstname = document.getElementById("first_name").value;
var email = document.getElementById("email").value;
var number = document.getElementById("phone_number").value;
var middlename = document.getElementById("middle_name").value;
var gender = document.getElementById("gender").value;
var address = document.getElementById("address").value;
var civilstatus = document.getElementById("civil_status").value;
var birthday = document.getElementById("birthday").value;

document.getElementById("prev").style.display = "none";
document.getElementById("next").style.display = "none";
let visit_type = "Walkin"; 

username ="Walk-in";

firebase.database().ref('acceptedappointments/' + username + " " + doctor + " " + date + " " + time).set({
 username: username,
  doctor : doctor,
  services: services,
  date : date,
  time : time,
  lastname : lastname,
  firstname : firstname,
  email : email,
  number : number,
  middlename : middlename,
  gender : gender,
  address : address,
  civilstatus : civilstatus,
  birthday : birthday,
  visitby: visit_type,
  price : priceElement
  
})
}


if (currentStep === circles.length) {
  buttons[1].disabled = true;
} else if (currentStep === 1) {
  buttons[0].disabled = true;
} 
else {
  buttons.forEach((button) => (button.disabled = false));
}

window.addEventListener('beforeunload', function () {
sessionStorage.removeItem('someone_else_lname');
sessionStorage.removeItem('someone_else_fname');
sessionStorage.removeItem('someone_else_email');
sessionStorage.removeItem('someone_else_pnum');
sessionStorage.removeItem('someone_else_mname');
sessionStorage.removeItem('someone_else_sex');
sessionStorage.removeItem('someone_else_address');
sessionStorage.removeItem('someone_else_status');
sessionStorage.removeItem('someone_else_birthday');
sessionStorage.removeItem('lastCheckedRadio');

if (currentStep === 1 || currentStep === 2 || currentStep === 3 || currentStep === 4){
  const date = document.getElementById("date_step3").value;
  const time = document.getElementById("time_step3").value;
  const doctor = document.getElementById("doctor_step1").value;
  if (doctor === 'Dr Divina P Joson'){
    if(date && time){
      performSpecificActions(time, date);
      }
  } else if (doctor === 'Dr Rachelle May P Joson'){
    if(date && time){

      performSpecificActionsb(time, date);
      }
  }
}
});
};




buttons.forEach((button) => {
button.addEventListener("click", updateSteps);
});
function getDurationInMinutes(time) {

const [startTime, endTime] = time.split('-').map(str => str.trim());

const startDate = new Date(`2000-01-01 ${startTime}`);
const endDate = new Date(`2000-01-01 ${endTime}`);

const durationMs = endDate - startDate;

const durationMinutes = durationMs / (1000 * 60);

return durationMinutes;
}

function performSpecificActions(time, date) {
const durationMinutes = getDurationInMinutes(time);
const name = time;

if (durationMinutes === 30) {
const data = new URLSearchParams();
    data.append('date', date);
    data.append('timeslot', time);
    data.append('name', name);


    fetch('delete_booking.php', {
        method: 'POST',
        body: data,
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); 
    })
    .catch(error => {
        console.error(error);
    });


} else if (durationMinutes === 60) {
const data = new URLSearchParams();
    data.append('date', date);
    data.append('timeslot', time);
    data.append('name', name);
    fetch('delete_booking2.php', {
        method: 'POST',
        body: data,
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); 
    })
    .catch(error => {
        console.error(error);
    });

} else if (durationMinutes === 120) {
    const data = new URLSearchParams();
    data.append('date', date);
    data.append('timeslot', time);
    data.append('name', name);
    fetch('delete_booking3.php', {
        method: 'POST',
        body: data,
    })
    .then(response => response.text())
    .then(result => {
        console.log(result); 
    })
    .catch(error => {
        console.error(error);
    });

 }
}

function getDurationInMinutesb(time) {

const [startTime, endTime] = time.split('-').map(str => str.trim());

const startDate = new Date(`2000-01-01 ${startTime}`);
const endDate = new Date(`2000-01-01 ${endTime}`);

const durationMs = endDate - startDate;

const durationMinutes = durationMs / (1000 * 60);

return durationMinutes;
}

function performSpecificActionsb(time, date) {
const durationMinutes = getDurationInMinutesb(time);
const name = time;

if (durationMinutes === 30) {
    const data = new URLSearchParams();
        data.append('date', date);
        data.append('timeslot', time);
        data.append('name', name);
        fetch('delete_bookingb.php', {
            method: 'POST',
            body: data,
        })
        .then(response => response.text())
        .then(result => {
            console.log(result); 
        })
        .catch(error => {
            console.error(error);
        });


} else if (durationMinutes === 60) {
    const data = new URLSearchParams();
        data.append('date', date);
        data.append('timeslot', time);
        data.append('name', name);
        fetch('delete_booking2b.php', {
            method: 'POST',
            body: data,
        })
        .then(response => response.text())
        .then(result => {
            console.log(result); 
        })
        .catch(error => {
            console.error(error);
        });

} else if (durationMinutes === 120) {
        const data = new URLSearchParams();
        data.append('date', date);
        data.append('timeslot', time);
        data.append('name', name);
        fetch('delete_booking3b.php', {
            method: 'POST',
            body: data,
        })
        .then(response => response.text())
        .then(result => {
            console.log(result); 
        })
        .catch(error => {
            console.error(error);
        });

     }
   }



window.onload = function() {
    dashboardAppointments();
    SelectAllFinishedData();
    SelectAllDataAccepted();
    // SelectAllPendingData();
};
