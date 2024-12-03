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
var user = firebase.initializeApp(userAppConfig, "userdb");
var userdb = user.database();





// Access admin-username from sessionStorage in another file
var adminUsername = sessionStorage.getItem("adminUsername");
// Update username
document.getElementById('admin-name-id').innerText = adminUsername;








let isSidebarVisible = window.innerWidth > 768;

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    isSidebarVisible = !isSidebarVisible;

    if (isSidebarVisible) {
        sidebar.style.display = 'block';
        document.querySelector('.header').style.top = '300px';
    } else {
        sidebar.style.display = 'none';
        document.querySelector('.header').style.top = '0';
    }
}

function changeContent(contentId) {
    // Hide all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected content
    const selectedContent = document.getElementById(contentId);
    selectedContent.style.display = 'block';

    // Update the header text based on the selected content
    const headerText = document.querySelector('.header-text');
    switch (contentId) {
        case 'dashboard':
            headerText.textContent = 'Dashboard';
            break;
        case 'accepted-appointment':
            headerText.textContent = 'Accepted Appointment';
            break;
        case 'completed-appointment':
            headerText.textContent = 'Completed Appointment';
            break;
        case 'manage-record':
            headerText.textContent = 'Manage Patients';
            break;
        case 'schedule-blocking':
            headerText.textContent = 'Walk-in Appointment';
            break;
        default:
            break;
    }

    // Remove the 'selected' class from all list items
    const listItems = document.querySelectorAll('ul li');
    listItems.forEach(item => {
        item.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked list item
    const selectedListItem = document.querySelector(`li[data-content="${contentId}"]`);
    if (selectedListItem) {
        selectedListItem.classList.add('selected');
    }
}

// Set default content and header text to be displayed
changeContent('dashboard');

// Check screen width on resize
window.addEventListener('resize', function() {
    const newScreenWidth = window.innerWidth;

    if (newScreenWidth > 768) {
        isSidebarVisible = true;

        // Show sidebar and reset header margin
        document.querySelector('.sidebar').style.display = 'block';
        document.querySelector('.header').style.marginLeft = '0';
    } else {
        isSidebarVisible = false;

        // Hide sidebar and adjust header margin
        document.querySelector('.sidebar').style.display = 'none';
        document.querySelector('.header').style.marginLeft = '0';
    }
});

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function toggleSublist(sublistId) {
    const sublist = document.getElementById(sublistId + "-sublist");
    // sublist.style.display = sublist.style.display === 'block' ? 'none' : 'block';

    // Toggle arrow icon rotation only for the "Manage Appointment" sublist
    if (sublistId === 'manage-appointment') {
        const arrowIcon = document.querySelector('#' + sublistId + ' .arrow-icon');
        arrowIcon.classList.toggle('rotate');
    }
}
let currentCardIndex = 0;
const cardsPerPage = 6;

function showNextCards() {
    currentCardIndex++;

    const cityCards = document.querySelectorAll('.city-cards .card');
    const lastIndex = cityCards.length - cardsPerPage;

    if (currentCardIndex > lastIndex) {
        currentCardIndex = 0;
    }

    showCityCards('next'); // Pass direction as 'next'
}

function showPreviousCards() {
    currentCardIndex--;

    const cityCards = document.querySelectorAll('.city-cards .card');
    const lastIndex = cityCards.length - cardsPerPage;

    if (currentCardIndex < 0) {
        currentCardIndex = lastIndex;
    }

    showCityCards('prev'); // Pass direction as 'prev'
}


function showCityCards(direction) {
    const cityCardsContainer = document.querySelector('.city-cards');

// Define specific colors for each city card
const cardColors = [
    '#3498db', // Alfonso
    '#e74c3c', // Amadeo
    '#2ecc71', // Bacoor
    '#f39c12', // Carmona
    '#8e44ad', // Cavite City
    '#16a085', // Dasmarinas
    '#c0392b', // Gen. Mariano Alvarez
    '#2980b9', // General Emilio Aguinaldo
    '#d35400', // General Trias
    '#7f8c8d', // Imus
    '#34495e', // Indang
    '#d35400', // Kawit
    '#27ae60', // Magallanes
    '#9b59b6', // Maragondon
    '#1abc9c', // Mendez-Nunez
    '#3498db', // Naic
    '#e74c3c', // Noveleta
    '#3498db', // Rosario
    '#2ecc71', // Silang
    '#f39c12', // Tagaytay
    '#c0392b', // Tanza
    '#16a085', // Ternate
    '#34495e', // Trece Martires
];

    // Retrieve all city cards
    const cityCards = Array.from(document.querySelectorAll('.city-cards .card'));

    // Update the order of city cards in the DOM
    cityCards.forEach(card => cityCardsContainer.appendChild(card));

    cityCards.forEach((card, index) => {
        if (index >= currentCardIndex && index < currentCardIndex + cardsPerPage) {
            card.style.display = 'block';

            // Set the transform property based on direction
            if (direction === 'next') {
                card.style.transform = 'translateX(100%)';
            } else if (direction === 'prev') {
                card.style.transform = 'translateX(-100%)';
            }

            // Set background color for each city card
            card.style.backgroundColor = cardColors[index];

            // Allow time for the browser to apply initial positioning before transitioning
            setTimeout(() => {
                card.style.transform = 'translateX(0)';
            }, 50);
        } else {
            card.style.display = 'none';
        }
    });
}

//dashboard
document.addEventListener("DOMContentLoaded", function () {
    var ITctr = 0, Cctr = 0, Adoctr = 0, LTYActr = 0, MAActr = 0, SENctr = 0; 
    var Mctr = 0, Fctr = 0;
    var Cavitecount = 0;  var OutCavitecount = 0;
    userdb.ref('user').once('value', function (snapshot) {
        snapshot.forEach(function (userSnapshot) {
            var count = snapshot.numChildren();
            document.getElementById('TP').innerHTML = count;
           
            var user = userSnapshot.val();
            var birthDate = user.BirthDate;
            var year = birthDate.substring(0, 4);
            var today = new Date();
            var date = today.getFullYear();
            var agez = date - year;
            
            //
            if (user.Province === "Cavite") {
                Cavitecount++;
            }
            if (user.Province === "Outside Cavite") {
                OutCavitecount++;
            }
            //
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

            //for gender
            if (user.Gender === 'female') {
                Fctr++;

            } else {
                Mctr++;
            }

        });

        //Totalcav//
        document.getElementById('TPC').innerHTML = Cavitecount;
        //Totalcav//
          
        //TotalOutC//
        document.getElementById('TPOC').innerHTML = OutCavitecount;
        //TotalOutC//


        // Gender Chart

        const genderData = {
            labels: ["Male", "Female"],
            data: [Mctr, Fctr], 
          };
          
          const genderChart = document.querySelector(".gender-chart");
          const ulgender = document.querySelector(".gender-stats .genderdetails ul");
          
          new Chart(genderChart, {
            type: "doughnut",
            data: {
              labels: genderData.labels,
              datasets: [
                {
                  label: "  Population ",
                  data: genderData.data,
                },
              ],
            },
            options: {
              borderWidth: 10,
              borderRadius: 2,
              hoverBorderWidth: 0,
              plugins: {
                legend: {
                  display: false,
                },
              },
            },
          });
          
          const populateUlgender = () => {
            genderData.labels.forEach((l, i) => {
              let ligender = document.createElement("li");
              ligender.innerHTML = `${l}: <span class='count'>${genderData.data[i]}</span>`;
              ulgender.appendChild(ligender);
            });
          };
          
          populateUlgender();
          

          // Age Chart

          const ageData = {
            labels: ["Infant Todler (0-2)", "Children (3-12)", "Adolescent (13-17)", "Late Teens and Young Adult (18-35)", "Middle-Aged Adults (36-64)", "Senior Citizen (65+)"],
            data: [ITctr, Cctr, Adoctr, LTYActr, MAActr, SENctr],
            };
    
            const ageChart = document.querySelector(".age-chart");
            const ulage = document.querySelector(".age-stats .agedetails ul");
    
            new Chart(ageChart, {
            type: "bar", // Change the chart type to "bar"
            data: {
                labels: ageData.labels,
                datasets: [
                {
                    label: " Population ",
                    data: ageData.data,
                    backgroundColor: ["blue", "pink", "red", "yellow", "orange", "green"], // Add custom colors if needed
                },
                ],
            },
            options: {
                scales: {
                y: {
                    beginAtZero: true,
                },
                },
                plugins: {
                legend: {
                    display: false,
                },
                },
            },
            });
    
            const populateUlage = () => {
            ageData.labels.forEach((l, i) => {
                let liage = document.createElement("li");
                liage.innerHTML = `${l}: <span class='count'>${ageData.data[i]}</span>`;
                ulage.appendChild(liage);
            });
            };
    
            populateUlage();

    });

/////per municpality

userdb.ref('user').once('value', function (snapshot) {
    var Alfonso = 0, Carmona = 0, GenMarianoAlvarez = 0, Imus = 0, Magallanes = 0, Naic = 0, Silang = 0, Tanza = 0, Ternate = 0;
    var Amadeo = 0, CaviteCity = 0, GeneralEmilioAguinaldo = 0, Indang = 0, Maragondon = 0, Noveleta = 0, Tagaytay = 0, TreceMartires = 0; 
    var Bacoor = 0, Dasmarinas = 0, GeneralTrias = 0, Kawit = 0, MendezNunez = 0, Rosario = 0;

    snapshot.forEach(function (userSnapshot) {
        var user = userSnapshot.val();
        var convert = user.CityMunicipality;

        switch (convert) {
            case 'Alfonso':
                Alfonso++;
                break;
            case 'Amadeo':
                Amadeo++;
                break;
            case 'Bacoor':
                Bacoor++;
                break;
            case 'Carmona':
                Carmona++;
                break;
            case 'Cavite City':
                CaviteCity++;
                break;
            case 'Dasmariñas':
                Dasmarinas++;
                break;
            case 'General Emilio Aguinaldo':
                GeneralEmilioAguinaldo++;
                break;
            case 'General Mariano Alvarez':
                GenMarianoAlvarez++;
                break;
            case 'General Trias':
                GeneralTrias++;
                break;
            case 'Imus':
                Imus++;
                break;
            case 'Indang':
                Indang++;
                break;
            case 'Kawit':
                Kawit++;
                break;
            case 'Magallanes':
                Magallanes++;
                break;
            case 'Maragondon':
                Maragondon++;
                break;
            case 'Mendez-Nunez':
                MendezNunez++;
                break;
            case 'Naic':
                Naic++;
                break;
            case 'Noveleta':
                Noveleta++;
                break;
            case 'Rosario':
                Rosario++;
                break;
            case 'Silang':
                Silang++;
                break;
            case 'Tagaytay':
                Tagaytay++;
                break;
            case 'Tanza':
                Tanza++;
                break;
            case 'Ternate':
                Ternate++;
                break;
            case 'Trece Martires':
                TreceMartires++;
                break;
            default:
                
        }
    });
    var cities = [
        { name: 'Alfonso', count: Alfonso },
        { name: 'Amadeo', count: Amadeo },
        { name: 'Bacoor', count: Bacoor },
        { name: 'Carmona', count: Carmona },
        { name: 'CaviteCity', count: CaviteCity },
        { name: 'Dasmarinas', count: Dasmarinas },
        { name: 'GeneralEmilioAguinaldo', count: GeneralEmilioAguinaldo },
        { name: 'GenMarianoAlvarez', count: GenMarianoAlvarez },
        { name: 'GeneralTrias', count: GeneralTrias },
        { name: 'Imus', count: Imus },
        { name: 'Indang', count: Indang },
        { name: 'Kawit', count: Kawit },
        { name: 'Magallanes', count: Magallanes },
        { name: 'Maragondon', count: Maragondon },
        { name: 'MendezNunez', count: MendezNunez },
        { name: 'Naic', count: Naic },
        { name: 'Noveleta', count: Noveleta },
        { name: 'Rosario', count: Rosario },
        { name: 'Silang', count: Silang },
        { name: 'Tagaytay', count: Tagaytay },
        { name: 'Tanza', count: Tanza },
        { name: 'Ternate', count: Ternate },
        { name: 'TreceMartires', count: TreceMartires }
    ];
    // Sorting the cities array in descending order based on count
cities.sort((a, b) => b.count - a.count);

// console.log(cities);
var data_card='';
var i=1;
cities.forEach(city => {
    var j=i++;
    // console.log(`${city.count}=`+j)
    document.getElementById('a'+j+'_h2').innerHTML =  `${city.name}` ;
    document.getElementById('a'+j).innerHTML =  `${city.count}` ;
});

});




});




// Call showCityCards to display the initial set of cards
showCityCards();




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
  
      
      td1.innerHTML = AUTOID;
      td2.innerHTML = username;
      td3.innerHTML = firstname;
      td4.innerHTML = middleName;
      td5.innerHTML = lastName;
      td6.innerHTML = birthdate;
      td7.innerHTML = '<button type="button" class="btn btn-primary updates_data" onclick="Update()" id="Updates">Edit Information</button>'; // Action button
  

      td1.hidden = true;
      trow.appendChild(td1);
      trow.appendChild(td2);
      trow.appendChild(td3);
      trow.appendChild(td4);
      trow.appendChild(td5);
      trow.appendChild(td6); 
      trow.appendChild(td7);

  
      tbody.appendChild(trow);
      
  }
  
  function addAllItemsToTable(patients) {
      tbody.innerHTML = "";
      patients.forEach(element => {
          AddItemToTable(element.AUTOID, element.Username, element.FirstName, element.MiddleName, element.LastName, element.BirthDate);
      });
      $("#manage_patients").DataTable({
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
  var dumpP; //need to para makuha yung authnetication
  
  
  // Attach a click event listener to the tbody element to handle clicks on "Updates" buttons
  tbody.addEventListener('click', function (event) {
      var target = event.target;
      if (target.tagName === 'BUTTON' && target.id === 'Updates') {
         //document.getElementById('balik2').hidden=false;
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
                  filter()
                  document.getElementById('barangay').value = userData.Barangay;
                  filter_1()
                  document.getElementById('Civilstat').value = userData.CivilStatus;
                 
                 dumpP = document.getElementById('dumpP').value = userData.dumpP;
                  
  
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

 GetAllDataOnce();
  sortTableByAscendingID();
  
  /////////////////para lang to sa table 1 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  var haha;

  
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
            if(province=='Outside Cavite'){
                CM='N/A';
                barangay='N/A';
            }

            
        
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
                        dumpP:dumpP
                    })
                        .then(() => {
                            alert("Details Updated Successfully!");
                            const edit_information_pop = document.getElementById('edit-information-popup');
                            edit_information_pop.classList.remove('active');
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
                              dumpP:dumpP
                            })
                                .then(() => {
                                    alert("Details Updated Successfully!");
                                    window.location.reload();
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






        function Update(){
            document.getElementById("PID").disabled = true;

        }


        function showP() {
            var y = document.getElementById("Pass")
            if (y.type === "password") {
              y.type = "text";
            } else {
              y.type = "password";
            }
          
          }

    document.getElementById("update").hidden = true;


 document.addEventListener("DOMContentLoaded", function () {

    var isLoggedIn = sessionStorage.getItem("isLoggedIn2");
    if (!isLoggedIn || isLoggedIn !== "true") {
      // If not logged in, redirect to login page
      window.location.href = 'index.html';
    }
  });
  function filter_1() {
    if ($('#province').val() == 'Cavite') {
      $('#CM').prop('disabled', false).show();
      $('#barangay').show();
      $('#city-municipality_div').show();
      $('#barangay_div').show();
    } else {
      $('#CM').hide().prop('disabled', true);
      $('#barangay').hide().prop('disabled', true);
      $('#city-municipality_div').hide();
      $('#barangay_div').hide();
    }
  }
  function filter() {
    var city = $('#CM').val();
    var barangayDropdown = $("#barangay");
    if (city === "Alfonso") {
      enableBarangayDropdown(barangayDropdown, [
        "Amuyong",
        "Barangay I (Pob.)",
        "Barangay Ii (Pob.)",
        "Barangay Iii (Pob.)",
        "Barangay Iv (Pob.)",
        "Barangay V (Pob.)",
        "Bilog",
        "Buck Estate",
        "Esperanza Ibaba",
        "Esperanza Ilaya",
        "Kaysuyo",
        "Kaytitinga I",
        "Kaytitinga Ii",
        "Kaytitinga Iii",
        "Luksuhin",
        "Luksuhin Ilaya",
        "Mangas I",
        "Mangas Ii",
        "Marahan I",
        "Marahan Ii",
        "Matagbak I",
        "Matagbak Ii",
        "Pajo",
        "Palumlum",
        "Santa Teresa",
        "Sikat",
        "Sinaliw Malaki",
        "Sinaliw Na Munti",
        "Sulsugin",
        "Taywanak Ibaba",
        "Taywanak Ilaya",
        "Upli"
      ]);
    } else if (city === "Amadeo") {
      enableBarangayDropdown(barangayDropdown, [
        "Banaybanay",
        "Barangay I (Pob.)",
        "Barangay II (Pob.)",
        "Barangay III (Pob.)",
        "Barangay IV (Pob.)",
        "Barangay IX (Pob.)",
        "Barangay V (Pob.)",
        "Barangay VI (Pob.)",
        "Barangay VII (Pob.)",
        "Barangay VIII (Pob.)",
        "Barangay X (Pob.)",
        "Barangay XI (Pob.)",
        "Barangay XII (Pob.)",
        "Bucal",
        "Buho",
        "Dagatan",
        "Halang",
        "Loma",
        "Maitim I",
        "Maymangga",
        "Minantok Kanluran",
        "Minantok Silangan",
        "Pangil",
        "Salaban",
        "Talon",
        "Tamacan"
      ]);
    } else if (city === "Bacoor") {
      enableBarangayDropdown(barangayDropdown, [
        "Alima",
        "Aniban I",
        "Aniban Ii",
        "Aniban Iii",
        "Aniban Iv",
        "Aniban V",
        "Banalo",
        "Bayanan",
        "Campo Santo",
        "Daang Bukid",
        "Digman",
        "Dulong Bayan",
        "Habay I",
        "Habay Ii",
        "Kaingin (Pob.)",
        "Ligas I",
        "Ligas Ii",
        "Ligas Iii",
        "Mabolo I",
        "Mabolo Ii",
        "Mabolo Iii",
        "Maliksi I",
        "Maliksi Ii",
        "Maliksi Iii",
        "Mambog I",
        "Mambog Ii",
        "Mambog Iii",
        "Mambog Iv",
        "Mambog V",
        "Molino I",
        "Molino Ii",
        "Molino Iii",
        "Molino Iv",
        "Molino V",
        "Molino Vi",
        "Molino Vii",
        "Niog I",
        "Niog Ii",
        "Niog Iii",
        "P.f. Espiritu I (Panapaan)",
        "P.f. Espiritu Ii",
        "P.f. Espiritu Iii",
        "P.f. Espiritu Iv",
        "P.f. Espiritu V",
        "P.f. Espiritu Vi",
        "P.f. Espiritu Vii",
        "P.f. Espiritu Viii",
        "Queens Row Central",
        "Queens Row East",
        "Queens Row West",
        "Real I",
        "Real Ii",
        "Salinas I",
        "Salinas Ii",
        "Salinas Iii",
        "Salinas Iv",
        "San Nicolas I",
        "San Nicolas Ii",
        "San Nicolas Iii",
        "Sineguelasan",
        "Tabing Dagat",
        "Talaba I",
        "Talaba Ii",
        "Talaba Iii",
        "Talaba Iii-a",
        "Talaba Iv",
        "Talaba V",
        "Talaba Vi",
        "Zapote I",
        "Zapote Ii",
        "Zapote Iii",
        "Zapote Iv",
        "Zapote V",
        "Zapote Vi",
        "Zapote Vii"
      ]);
    } else if (city === "Carmona") {
      enableBarangayDropdown(barangayDropdown, [
        "Bancal",
        "Barangay 1 (Pob.)",
        "Barangay 2 (Pob.)",
        "Barangay 3 (Pob.)",
        "Barangay 4 (Pob.)",
        "Barangay 5 (Pob.)",
        "Barangay 6 (Pob.)",
        "Barangay 7 (Pob.)",
        "Barangay 8 (Pob.)",
        "Cabilang Baybay",
        "Lantic",
        "Mabuhay",
        "Maduya",
        "Milagrosa",
        "Alima",
        "Zapote Vii"
      ]);
    } else if (city === "Cavite City") {
      enableBarangayDropdown(barangayDropdown, [
        "Barangay 1 (Hen. M. Alvarez)",
        "Barangay 10 (Kingfisher)",
        "Barangay 10-A (Kingfisher-A)",
        "Barangay 10-B (Kingfisher-B)",
        "Barangay 11 (Lawin)",
        "Barangay 12 (Love Bird)",
        "Barangay 13 (Aguila)",
        "Barangay 14 (Loro)",
        "Barangay 15 (Kilyawan)",
        "Barangay 16 (Martines)",
        "Barangay 17 (Kalapati)",
        "Barangay 18 (Maya)",
        "Barangay 19 (Gemini)",
        "Barangay 2 (C. Tirona)",
        "Barangay 20 (Virgo)",
        "Barangay 21 (Scorpio)",
        "Barangay 22 (Leo)",
        "Barangay 22-A (Leo A)",
        "Barangay 23 (Aquarius)",
        "Barangay 24 (Libra)",
        "Barangay 25 (Capricorn)",
        "Barangay 26 (Cancer)",
        "Barangay 27 (Sagitarius)",
        "Barangay 28 (Taurus)",
        "Barangay 29 (Lao-lao)",
        "Barangay 29-A (Lao-lao A)",
        "Barangay 3 (Hen. E. Aguinaldo)",
        "Barangay 30 (Bid-bid)",
        "Barangay 31 (Maya-maya)",
        "Barangay 32 (Salay-salay)",
        "Barangay 33 (Buwan-buwan)",
        "Barangay 34 (Lapu-lapu)",
        "Barangay 35 (Hasa-hasa)",
        "Barangay 36 (Sap-sap)",
        "Barangay 36-A (Sap-sap A)",
        "Barangay 37 (Cadena De Amor)",
        "Barangay 37-A (Cadena de Amor A)",
        "Barangay 38 (Sampaguita)",
        "Barangay 38-A (Sampaguita A)",
        "Barangay 39 (Jasmin)",
        "Barangay 4 (Hen. M. Trias)",
        "Barangay 40 (Gumamela)",
        "Barangay 41 (Rosal)",
        "Barangay 42 (Pinagbuklod)",
        "Barangay 42-A (Pinagbuklod A)",
        "Barangay 42-B (Pinagbuklod B)",
        "Barangay 42-C (Pinagbuklod C)",
        "Barangay 43 (Pinagpala)",
        "Barangay 44 (Maligaya)",
        "Barangay 45 (Kaunlaran)",
        "Barangay 45-A (Kaunlaran A)",
        "Barangay 46 (Sinagtala)",
        "Barangay 47 (Pagkakaisa)",
        "Barangay 47-A (Pagkakaisa A)",
        "Barangay 47-B (Pagkakaisa B)",
        "Barangay 48 (Narra)",
        "Barangay 48-A (Narra A)",
        "Barangay 49 (Akasya)",
        "Barangay 49-A (Akasya A)",
        "Barangay 5 (Hen. E. Evangelista)",
        "Barangay 50 (Kabalyero)",
        "Barangay 51 (Kamagong)",
        "Barangay 52 (Ipil)",
        "Barangay 53 (Yakal)",
        "Barangay 53-A (Yakal A)",
        "Barangay 53-B (Yakal B)",
        "Barangay 54 (Pechay)",
        "Barangay 54-A (Pechay A)",
        "Barangay 55 (Ampalaya)",
        "Barangay 56 (Labanos)",
        "Barangay 57 (Repolyo)",
        "Barangay 58 (Patola)",
        "Barangay 58-A (Patola A)",
        "Barangay 59 (Sitaw)",
        "Barangay 6 (Diego Silang)",
        "Barangay 60 (Letsugas)",
        "Barangay 61 (Talong)",
        "Barangay 61-A (Talong A)",
        "Barangay 62 (Kangkong)",
        "Barangay 62-A (Kangkong A)",
        "Barangay 62-B (Kangkong B)",
        "Barangay 7 (Kapitan Kong)",
        "Barangay 8 (Manuel S. Rojas)",
        "Barangay 9 (Kanaway)"
      ]);
    } else if (city === "Dasmarinas") {
      enableBarangayDropdown(barangayDropdown, [
        "Burol",
        "Burol I",
        "Burol II",
        "Burol III",
        "Datu Esmael (Bago-a-ingud)",
        "Emmanuel Bergado I",
        "Emmanuel Bergado II",
        "Fatima I",
        "Fatima II",
        "Fatima III",
        "H-2",
        "Langkaan I",
        "Langkaan II",
        "Luzviminda I",
        "Luzviminda II",
        "Paliparan I",
        "Paliparan II",
        "Paliparan III",
        "Sabang",
        "Saint Peter I",
        "Saint Peter II",
        "Salawag",
        "Salitran I",
        "Salitran II",
        "Salitran III",
        "Salitran IV",
        "Sampaloc I",
        "Sampaloc II",
        "Sampaloc III",
        "Sampaloc IV",
        "Sampaloc V",
        "San Agustin I",
        "San Agustin II",
        "San Agustin III",
        "San Andres I",
        "San Andres II",
        "San Antonio De Padua I",
        "San Antonio De Padua II",
        "San Dionisio (Barangay 1)",
        "San Esteban (Barangay 4)",
        "San Francisco I",
        "San Francisco II",
        "San Isidro Labrador I",
        "San Isidro Labrador II",
        "San Jose",
        "San Juan (San Juan I)",
        "San Lorenzo Ruiz I",
        "San Lorenzo Ruiz II",
        "San Luis I",
        "San Luis II",
        "San Manuel I",
        "San Manuel II",
        "San Mateo",
        "San Miguel",
        "San Miguel II",
        "San Nicolas I",
        "San Nicolas II",
        "San Roque (Sta. Cristina II)",
        "San Simon (Barangay 7)",
        "Santa Cristina I",
        "Santa Cristina II",
        "Santa Cruz I",
        "Santa Cruz II",
        "Santa Fe",
        "Santa Lucia (San Juan II)",
        "Santa Maria (Barangay 20)",
        "Santo Cristo (Barangay 3)",
        "Santo Nino I",
        "Santo Nino II",
        "Victoria Reyes",
        "Zone I (Pob.)",
        "Zone I-B",
        "Zone II (Pob.)",
        "Zone III (Pob.)",
        "Zone IV (Pob.)"
      ]);
    } else if (city === "Gen. Mariano Alvarez") {
      enableBarangayDropdown(barangayDropdown, [
        "Aldiano Olaes",
        "Barangay 1 Poblacion (Area I)",
        "Barangay 2 Poblacion",
        "Barangay 3 Poblacion",
        "Barangay 4 Poblacion",
        "Barangay 5 Poblacion",
        "Benjamin Tirona (Area D)",
        "Bernardo Pulido (Area H)",
        "Epifanio Malia",
        "Fiorello Calimag (Area C)",
        "Francisco De Castro (Sunshine Vill.)",
        "Francisco Reyes",
        "Gavino Maderan",
        "Gregoria De Jesus",
        "Inocencio Salud",
        "Jacinto Lumbreras",
        "Kapitan Kua (Area F)",
        "Koronel Jose P. Elises (Area E)",
        "Macario Dacon",
        "Marcelino Memije",
        "Nicolasa Virata (San Jose)",
        "Pantaleon Granados (Area G)",
        "Ramon Cruz (Area J)",
        "San Gabriel (Area K)",
        "San Jose",
        "Severino De Las Alas",
        "Tiniente Tiago"
      ]);
    } else if (city === "General Emilio Aguinaldo") {
      enableBarangayDropdown(barangayDropdown, [
        "A. Dalusag",
        "Batas Dao",
        "Castanos Cerca",
        "Castanos Lejos",
        "Kabulusan",
        "Kaymisas",
        "Kaypaaba",
        "Lumipa",
        "Narvaez",
        "Poblacion I",
        "Poblacion II",
        "Poblacion III",
        "Poblacion IV",
        "Tabora"
      ]);
    } else if (city === "General Trias") {
      enableBarangayDropdown(barangayDropdown, [
        "Alingaro",
        "Arnaldo Pob. (Bgy. 7)",
        "Bacao I",
        "Bacao II",
        "Bagumbayan Pob. (Bgy. 5)",
        "Biclatan",
        "Buenavista I",
        "Buenavista II",
        "Buenavista III",
        "Corregidor Pob. (Bgy. 10)",
        "Dulong Bayan Pob. (Bgy. 3)",
        "Gov. Ferrer Pob. (Bgy. 1)",
        "Javalera",
        "Manggahan",
        "Navarro",
        "Ninety Sixth Pob. (Bgy. 8)",
        "Panungyanan",
        "Pasong Camachile I",
        "Pasong Camachile II",
        "Pasong Kawayan I",
        "Pasong Kawayan II",
        "Pinagtipunan",
        "Prinza Pob. (Bgy. 9)",
        "Sampalucan Pob. (Bgy. 2)",
        "San Francisco",
        "San Gabriel Pob. (Bgy. 4)",
        "San Juan I",
        "San Juan II",
        "Santa Clara",
        "Santiago",
        "Tapia",
        "Tejero",
        "Vibora Pob. (Bgy. 6)"
      ]);
    } else if (city === "Imus") {
      enableBarangayDropdown(barangayDropdown, [
        "Alapan I-A",
        "Alapan I-B",
        "Alapan I-C",
        "Alapan II-A",
        "Alapan II-B",
        "Anabu I-A",
        "Anabu I-B",
        "Anabu I-C",
        "Anabu I-D",
        "Anabu I-E",
        "Anabu I-F",
        "Anabu I-G",
        "Anabu II-A",
        "Anabu II-B",
        "Anabu II-C",
        "Anabu II-D",
        "Anabu II-E",
        "Anabu II-F",
        "Bagong Silang (Bahayang Pag-Asa)",
        "Bayan Luma I",
        "Bayan Luma II",
        "Bayan Luma III",
        "Bayan Luma IV",
        "Bayan Luma IX",
        "Bayan Luma V",
        "Bayan Luma VI",
        "Bayan Luma VII",
        "Bayan Luma VIII",
        "Bucandala I",
        "Bucandala II",
        "Bucandala III",
        "Bucandala IV",
        "Bucandala V",
        "Buhay Na Tubig",
        "Carsadang Bago I",
        "Carsadang Bago II",
        "Magdalo",
        "Maharlika",
        "Malagasang I-A",
        "Malagasang I-B",
        "Malagasang I-C",
        "Malagasang I-D",
        "Malagasang I-E",
        "Malagasang I-F",
        "Malagasang I-G",
        "Malagasang II-A",
        "Malagasang II-B",
        "Malagasang II-C",
        "Malagasang II-D",
        "Malagasang II-E",
        "Malagasang II-F",
        "Malagasang II-G",
        "Mariano Espeleta I",
        "Mariano Espeleta II",
        "Mariano Espeleta III",
        "Medicion I-A",
        "Medicion I-B",
        "Medicion I-C",
        "Medicion I-D",
        "Medicion II-A",
        "Medicion II-B",
        "Medicion II-C",
        "Medicion II-D",
        "Medicion II-E",
        "Medicion II-F",
        "Pag-Asa I",
        "Pag-Asa II",
        "Pag-Asa III",
        "Palico I",
        "Palico II",
        "Palico III",
        "Palico IV",
        "Pasong Buaya I",
        "Pasong Buaya II",
        "Pinagbuklod",
        "Poblacion I-A (Pob.)",
        "Poblacion I-B",
        "Poblacion I-C",
        "Poblacion II-A (Pob.)",
        "Poblacion II-B",
        "Poblacion III-A (Pob.)",
        "Poblacion III-B",
        "Poblacion IV-A (Pob.)",
        "Poblacion IV-B",
        "Poblacion IV-C",
        "Poblacion IV-D",
        "Tanzang Luma I",
        "Tanzang Luma II",
        "Tanzang Luma III",
        "Tanzang Luma IV (Southern City)",
        "Tanzang Luma V",
        "Tanzang Luma VI",
        "Toclong I-A",
        "Toclong I-B",
        "Toclong I-C",
        "Toclong II-A",
        "Toclong II-B"
      ]);
    } else if (city === "Indang") {
      enableBarangayDropdown(barangayDropdown, [
        "Agus-us",
        "Alulod",
        "Banaba Cerca",
        "Banaba Lejos",
        "Bancod",
        "Barangay 1 (Pob.)",
        "Barangay 2 (Pob.)",
        "Barangay 3 (Pob.)",
        "Barangay 4 (Pob.)",
        "Buna Cerca",
        "Buna Lejos I",
        "Buna Lejos II",
        "Calumpang Cerca",
        "Calumpang Lejos I",
        "Carasuchi",
        "Daine I",
        "Daine II",
        "Guyam Malaki",
        "Guyam Munti",
        "Harasan",
        "Kayquit I",
        "Kayquit II",
        "Kayquit III",
        "Kaytambog",
        "Kaytapos",
        "Limbon",
        "Lumampong Balagbag",
        "Lumampong Halayhay",
        "Mahabangkahoy Cerca",
        "Mahabangkahoy Lejos",
        "Mataas Na Lupa (Checkpoint)",
        "Pulo",
        "Tambo Balagbag",
        "Tambo Ilaya",
        "Tambo Kulit",
        "Tambo Malaki"
      ]);
    } else if (city === "Kawit") {
      enableBarangayDropdown(barangayDropdown, [
        "Balsahan-Bisita",
        "Batong Dalig",
        "Binakayan-Aplaya",
        "Binakayan-Kanluran",
        "Congbalay-Legaspi",
        "Gahak",
        "Kaingen",
        "Magdalo (Putol)",
        "Manggahan-Lawin",
        "Marulas",
        "Panamitan",
        "Poblacion",
        "Pulvorista",
        "Samala-Marquez",
        "San Sebastian",
        "Santa Isabel",
        "Tabon I",
        "Tabon II",
        "Tabon III",
        "Toclong",
        "Tramo-Bantayan",
        "Wakas I",
        "Wakas II"
      ]);
    } else if (city === "Magallanes") {
      enableBarangayDropdown(barangayDropdown, [
        "Baliwag",
        "Barangay 1 (Pob.)",
        "Barangay 2 (Pob.)",
        "Barangay 3 (Pob.)",
        "Barangay 4 (Pob.)",
        "Barangay 5 (Pob.)",
        "Bendita I",
        "Bendita II",
        "Caluangan",
        "Kabulusan",
        "Medina",
        "Pacheco",
        "Ramirez",
        "San Agustin",
        "Tua",
        "Urdaneta"
      ]);
    } else if (city === "Maragondon") {
      enableBarangayDropdown(barangayDropdown, [
        "Bucal I",
        "Bucal II",
        "Bucal III A",
        "Bucal III B",
        "Bucal IV A",
        "Bucal IV B",
        "Caingin Pob. (Barangay 3)",
        "Garita I A",
        "Garita I B",
        "Layong Mabilog",
        "Mabato",
        "Pantihan I (Balayungan)",
        "Pantihan II (Sagbat)",
        "Pantihan III (Pook Na Munti)",
        "Pantihan IV (Pook Ni Sara)",
        "Patungan",
        "Pinagsanhan I A",
        "Pinagsanhan I B",
        "Poblacion I A",
        "Poblacion I B",
        "Poblacion II A",
        "Poblacion II B",
        "San Miguel I A (Caputatan)",
        "San Miguel I B",
        "Talipusngo",
        "Tulay Kanluran",
        "Tulay Silangan"
      ]);
    } else if (city === "Mendez-Nunez") {
      enableBarangayDropdown(barangayDropdown, [
        "Anuling Cerca I",
        "Anuling Cerca II",
        "Anuling Lejos I (Anuling)",
        "Anuling Lejos II",
        "Asis I",
        "Asis II",
        "Asis III",
        "Banayad",
        "Bukal",
        "Galicia I",
        "Galicia II",
        "Galicia III",
        "Miguel Mojica",
        "Palocpoc I",
        "Palocpoc II",
        "Panungyan I",
        "Panungyan II",
        "Poblacion I (Barangay I)",
        "Poblacion II (Barangay II)",
        "Poblacion III (Barangay III)",
        "Poblacion IV (Barangay IV)",
        "Poblacion V (Barangay V)",
        "Poblacion VI (Barangay VI)",
        "Poblacion VII (Barangay VII)"
      ]);
    } else if (city === "Naic") {
      enableBarangayDropdown(barangayDropdown, [
        "Bagong Karsada",
        "Balsahan",
        "Bancaan",
        "Bucana Malaki",
        "Bucana Sasahan",
        "Calubcob",
        "Capt. C. Nazareno (Pob.)",
        "Gomez-Zamora (Pob.)",
        "Halang",
        "Humbac",
        "Ibayo Estacion",
        "Ibayo Silangan",
        "Kanluran",
        "Labac",
        "Latoria",
        "Mabolo",
        "Makina",
        "Malainen Bago",
        "Malainen Luma",
        "Molino",
        "Munting Mapino",
        "Muzon",
        "Palangue 1",
        "Palangue 2 & 3",
        "Sabang",
        "San Roque",
        "Santulan",
        "Sapa",
        "Timalan Balsahan",
        "Timalan Concepcion"
      ]);
    } else if (city === "Noveleta") {
      enableBarangayDropdown(barangayDropdown, [
        "Magdiwang",
        "Poblacion",
        "Salcedo I",
        "Salcedo Ii",
        "San Antonio I",
        "San Antonio Ii",
        "San Jose I",
        "San Jose Ii",
        "San Juan I",
        "San Juan Ii",
        "San Rafael I",
        "San Rafael Ii",
        "San Rafael Iii",
        "San Rafael Iv",
        "Santa Rosa I",
        "Santa Rosa Ii"
      ]);
    } else if (city === "Rosario") {
      enableBarangayDropdown(barangayDropdown, [
        "Bagbag I",
        "Bagbag Ii",
        "Kanluran",
        "Ligtong I",
        "Ligtong Ii",
        "Ligtong Iii",
        "Ligtong Iv",
        "Muzon I",
        "Muzon Ii",
        "Poblacion",
        "Sapa I",
        "Sapa Ii",
        "Sapa Iii",
        "Sapa Iv",
        "Silangan I",
        "Silangan Ii",
        "Tejeros Convention",
        "Wawa I",
        "Wawa Ii",
        "Wawa Iii"
      ]);
    } else if (city === "Silang") {
      enableBarangayDropdown(barangayDropdown, [
        "Acacia",
        "Adlas",
        "Anahaw I",
        "Anahaw Ii",
        "Balite I",
        "Balite Ii",
        "Balubad",
        "Banaba",
        "Barangay I (Pob.)",
        "Barangay Ii (Pob.)",
        "Barangay Iii (Pob.)",
        "Barangay Iv (Pob.)",
        "Barangay V (Pob.)",
        "Batas",
        "Biga I",
        "Biga Ii",
        "Biluso",
        "Bucal",
        "Buho",
        "Bulihan",
        "Cabangaan",
        "Carmen",
        "Hoyo",
        "Hukay",
        "Iba",
        "Inchican",
        "Ipil I",
        "Ipil Ii",
        "Kalubkob",
        "Kaong",
        "Lalaan I",
        "Lalaan Ii",
        "Litlit",
        "Lucsuhin",
        "Lumil",
        "Maguyam",
        "Malabag",
        "Malaking Tatyao",
        "Mataas Na Burol",
        "Munting Ilog",
        "Narra I",
        "Narra Ii",
        "Narra Iii",
        "Paligawan",
        "Pasong Langka",
        "Pooc I",
        "Pooc Ii",
        "Pulong Bunga",
        "Pulong Saging",
        "Puting Kahoy",
        "Sabutan",
        "San Miguel I",
        "San Miguel Ii",
        "Santol",
        "San Vicente I",
        "San Vicente Ii",
        "Tartaria",
        "Tibig",
        "Toledo",
        "Tubuan I",
        "Tubuan Ii",
        "Tubuan Iii",
        "Ulat",
        "Yakal"
      ]);
    } else if (city === "Tagaytay") {
      enableBarangayDropdown(barangayDropdown, [
        "Asisan",
        "Bagong Tubig",
        "Calabuso (Calabuso South & North)",
        "Dapdap East",
        "Dapdap West",
        "Francisco (San Francisco)",
        "Guinhawa North",
        "Guinhawa South",
        "Iruhin East",
        "Iruhin South",
        "Iruhin West",
        "Kaybagal East",
        "Kaybagal North",
        "Kaybagal South (Pob.)",
        "Mag-Asawang Ilat",
        "Maharlika East",
        "Maharlika West",
        "Maitim 2Nd Central",
        "Maitim 2Nd East",
        "Maitim 2Nd West",
        "Mendez Crossing East",
        "Mendez Crossing West",
        "Neogan",
        "Patutong Malaki North",
        "Patutong Malaki South",
        "Sambong",
        "San Jose",
        "Silang Junction North",
        "Silang Junction South",
        "Sungay North",
        "Sungay South",
        "Tolentino East",
        "Tolentino West",
        "Zambal"
      ]);
    } else if (city === "Tanza") {
      enableBarangayDropdown(barangayDropdown, [
        "Amaya I",
        "Amaya Ii",
        "Amaya Iii",
        "Amaya Iv",
        "Amaya V",
        "Amaya Vi",
        "Amaya Vii",
        "Bagtas",
        "Barangay I (Pob.)",
        "Barangay Ii (Pob.)",
        "Barangay Iii (Pob.)",
        "Barangay Iv (Pob.)",
        "Biga",
        "Biwas",
        "Bucal",
        "Bunga",
        "Calibuyo",
        "Capipisa",
        "Daang Amaya I",
        "Daang Amaya Ii",
        "Daang Amaya Iii",
        "Halayhay",
        "Julugan I",
        "Julugan Ii",
        "Julugan Iii",
        "Julugan Iv",
        "Julugan V",
        "Julugan Vi",
        "Julugan Vii",
        "Julugan Viii",
        "Lambingan",
        "Mulawin",
        "Paradahan I",
        "Paradahan Ii",
        "Punta I",
        "Punta Ii",
        "Sahud Ulan",
        "Sanja Mayor",
        "Santol",
        "Tanauan",
        "Tres Cruses"
      ]);
    } else if (city === "Ternate") {
      enableBarangayDropdown(barangayDropdown, [
        "Bucana",
        "Poblacion I (Barangay I)",
        "Poblacion I A",
        "Poblacion Ii (Barangay Ii)",
        "Poblacion Iii (Barangay Iii)",
        "San Jose",
        "San Juan I",
        "San Juan Ii",
        "Sapang I",
        "Sapang Ii"
      ]);
    } else if (city === "Trece Martires") {
      enableBarangayDropdown(barangayDropdown, [
        "Aguado (Piscal Mundo)",
        "Cabezas",
        "Cabuco",
        "Conchu (Lagundian)",
        "De Ocampo",
        "Gregorio (Aliang)",
        "Inocencio (B. Pook)",
        "Lallana",
        "Lapidario (Bayog)",
        "Luciano (Bitangan)",
        "Osorio",
        "Perez (Lucbanan)",
        "San Agustin (Pob.)"
      ]);
    } else {
      disableBarangayDropdown(barangayDropdown);
    }
  }

  function enableBarangayDropdown($dropdown, options) {
    $dropdown.empty();
    $dropdown.append($('<option value="" disabled selected>Barangay</option>'));
    options.forEach(function (option) {
      $dropdown.append($('<option>', {
        value: option,
        text: option
      }));
    });
    $dropdown.prop("disabled", false);
  }

  function disableBarangayDropdown($dropdown) {
    $dropdown.empty();
    $dropdown.prop("disabled", true);
  }


