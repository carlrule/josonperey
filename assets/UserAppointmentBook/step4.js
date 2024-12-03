
var userAppConfig = {
  apiKey: "AIzaSyBmpCcjkE7SbBAJMXBA113q0k2GycBVpKY",
  authDomain: "patient-35f7e.firebaseapp.com",
  databaseURL: "https://patient-35f7e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "patient-35f7e",
  storageBucket: "patient-35f7e.appspot.com",
  messagingSenderId: "392977055504",
  appId: "1:392977055504:web:3b175a57cb7b8874bcaf95"
};

var userApp = firebase.initializeApp(userAppConfig, "userApp");
var userdb = userApp.database();

var someone_else1 = sessionStorage.getItem("passValueUser");

var username = sessionStorage.getItem("passValueUser");
var userRef = userdb.ref("user/" + username);

  function sendDataToParent(data) {
    if (window.parent) {
        window.parent.postMessage(data, '*');
    }
}

const radio1 = document.getElementById('radio1');
const radio2 = document.getElementById('radio2'); 
var textField1 = document.getElementById('myself');
var textField2 = document.getElementById('someone_else');



  radio1.addEventListener('change', function () {
        document.getElementById("someone_else").style.display = "none"; 
        document.getElementById("myself").style.display = "block"; 
        saveRadioState();
      if (radio1.checked) {
        userRef.once("value")
        .then(function (snapshot) {
          var userData = snapshot.val();
          console.log(userData)
          document.getElementById('myself_lname').value = userData.LastName;
          document.getElementById('myself_fname').value = userData.FirstName;
          document.getElementById('myself_email').value = userData.Email;
          document.getElementById('myself_pnum').value = userData.PhoneNum;
          document.getElementById('myself_mname').value = userData.MiddleName;
          
          document.getElementById('myself_sex').value = userData.Gender;
          document.getElementById('province_my').value = userData.Province;
          document.getElementById('city_my').value = userData.CityMunicipality;
          document.getElementById('barangay_my').value = userData.Barangay;
          document.getElementById('myself_address').value = userData.Province+' '+userData.CityMunicipality+' '+userData.Barangay;
          if (userData.Province == 'Cavite') {
            $('#city_div_my').show();
            $('#barangay_div_my').show();
        } else {
            $('#city_div_my').hide();
            $('#barangay_div_my').hide();
        }
          document.getElementById('myself_status').value = userData.CivilStatus;
          document.getElementById('myself_birthday').value = userData.BirthDate;
          
          sendDataToParent(userData);
        })
        .catch(function (error) {
          console.error("Error fetching user data:", error);
        });

      }
      
  });
  function radio1button() {
    
    userRef.once("value")
.then(function (snapshot) {
var userData = snapshot.val();
// console.log(userData)
document.getElementById('myself_lname').value = userData.LastName;
document.getElementById('myself_fname').value = userData.FirstName;
document.getElementById('myself_email').value = userData.Email;
document.getElementById('myself_pnum').value = userData.PhoneNum;
document.getElementById('myself_mname').value = userData.MiddleName;

document.getElementById('myself_sex').value = userData.Gender;
document.getElementById('province_my').value = userData.Province;
document.getElementById('city_my').value = userData.CityMunicipality;
document.getElementById('barangay_my').value = userData.Barangay;
document.getElementById('myself_address').value = userData.Province+' '+userData.CityMunicipality+' '+userData.Barangay;document.getElementById('myself_status').value = userData.CivilStatus;
document.getElementById('myself_birthday').value = userData.BirthDate;
if (userData.Province == 'Cavite') {
  $('#city_div_my').show();
  $('#barangay_div_my').show();
} else {
  $('#city_div_my').hide();
  $('#barangay_div_my').hide();
}
})
.catch(function (error) {
console.error("Error fetching user data:", error);
});
  document.getElementById("myself").style.display = "block";
  document.getElementById("someone_else").style.display = "none"; 
  const userData = {
  LastName: document.getElementById('myself_lname').value,
  FirstName: document.getElementById('myself_fname').value,
  Email: document.getElementById('myself_email').value,
  PhoneNum: document.getElementById('myself_pnum').value,
  MiddleName: document.getElementById('myself_mname').value,
  Gender: document.getElementById('myself_sex').value,
  Address: document.getElementById('myself_address').value,
  CivilStatus: document.getElementById('myself_status').value,
  BirthDate: document.getElementById('myself_birthday').value
};
sendDataToParent(userData);

  }

  function radio2button() {
    radio1.checked = false;
    document.getElementById("myself").style.display = "none";
    document.getElementById("someone_else").style.display = "block";
    const userData = {
      LastName: document.getElementById('someone_else_lname').value,
      FirstName: document.getElementById('someone_else_fname').value,
      Email: document.getElementById('someone_else_email').value,
      PhoneNum: document.getElementById('someone_else_pnum').value,
      MiddleName: document.getElementById('someone_else_mname').value,
      Gender: document.getElementById('someone_else_sex').value,
      Address: document.getElementById('someone_else_address').value,
      CivilStatus: document.getElementById('someone_else_status').value,
      BirthDate: document.getElementById('someone_else_birthday').value
};
sendDataToParent(userData);        
}

  radio2.addEventListener('change', function () {
    saveRadioState(); 
      if (radio2.checked) {
        document.getElementById("myself").style.display = "none";
        document.getElementById("someone_else").style.display = "block";
        const userData = {
          LastName: document.getElementById('someone_else_lname').value,
          FirstName: document.getElementById('someone_else_fname').value,
          Email: document.getElementById('someone_else_email').value,
          PhoneNum: document.getElementById('someone_else_pnum').value,
          MiddleName: document.getElementById('someone_else_mname').value,
          Gender: document.getElementById('someone_else_sex').value,
          Address: document.getElementById('someone_else_address').value,
          CivilStatus: document.getElementById('someone_else_status').value,
          BirthDate: document.getElementById('someone_else_birthday').value
    };
    sendDataToParent(userData);        

      }
  });
  const text1 = document.getElementById("someone_else_lname");
const text2 = document.getElementById("someone_else_fname");
const text3 = document.getElementById("someone_else_email");
const text4 = document.getElementById("someone_else_pnum");
const text5 = document.getElementById("someone_else_mname");
const text6 = document.getElementById("someone_else_sex");
const text7 = document.getElementById("someone_else_address");
const text8 = document.getElementById("someone_else_status");
const text9 = document.getElementById("someone_else_birthday");

const savedValue1 = sessionStorage.getItem("someone_else_lname");
const savedValue2 = sessionStorage.getItem("someone_else_fname");
const savedValue3 = sessionStorage.getItem("someone_else_email");
const savedValue4 = sessionStorage.getItem("someone_else_pnum");
const savedValue5 = sessionStorage.getItem("someone_else_mname");
const savedValue6 = sessionStorage.getItem("someone_else_sex");
const savedValue7 = sessionStorage.getItem("someone_else_address");
const savedValue8 = sessionStorage.getItem("someone_else_status");
const savedValue9 = sessionStorage.getItem("someone_else_birthday");

if (savedValue1) {
  text1.value = savedValue1;
}
if (savedValue2) {
  text2.value = savedValue2;
}
if (savedValue3) {
  text3.value = savedValue3;
}
if (savedValue4) {
  text4.value = savedValue4;
}
if (savedValue5) {
  text5.value = savedValue5;
}
if (savedValue6) {
  text6.value = savedValue6;
}
if (savedValue6) {
  text1.value = savedValue6;
}
if (savedValue7) {
  text7.value = savedValue7;
}
if (savedValue8) {
  text8.value = savedValue8;
}
if (savedValue9) {
  text9.value = savedValue9;
}


text1.addEventListener("input", function (event) {
  const value = event.target.value;

    sessionStorage.setItem("someone_else_lname", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text2.addEventListener("input", function (event) {
  const value = event.target.value;

  sessionStorage.setItem("someone_else_fname", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text3.addEventListener("input", function (event) {
  const value = event.target.value;

  sessionStorage.setItem("someone_else_email", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text4.addEventListener("input", function (event) {
  const value = event.target.value;

  sessionStorage.setItem("someone_else_pnum", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text5.addEventListener("input", function (event) {

  const value = event.target.value;

  sessionStorage.setItem("someone_else_mname", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text6.addEventListener("input", function (event) {
  const value = event.target.value;

  sessionStorage.setItem("someone_else_sex", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text7.addEventListener("input", function (event) {
  const value = event.target.value;

  sessionStorage.setItem("someone_else_address", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text8.addEventListener("input", function (event) {
  const value = event.target.value;

  sessionStorage.setItem("someone_else_status", value);
  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});
text9.addEventListener("input", function (event) {
  const value = event.target.value;

  sessionStorage.setItem("someone_else_birthday", value);

  const userData = {
    LastName: document.getElementById('someone_else_lname').value,
    FirstName: document.getElementById('someone_else_fname').value,
    Email: document.getElementById('someone_else_email').value,
    PhoneNum: document.getElementById('someone_else_pnum').value,
    MiddleName: document.getElementById('someone_else_mname').value,
    Gender: document.getElementById('someone_else_sex').value,
    Address: document.getElementById('someone_else_address').value,
    CivilStatus: document.getElementById('someone_else_status').value,
    BirthDate: document.getElementById('someone_else_birthday').value
  };
  sendDataToParent(userData);
});


function saveRadioState() {
  if (radio1.checked) {
    sessionStorage.setItem('lastCheckedRadio', 'radio1');
  } else if (radio2.checked) {
    sessionStorage.setItem('lastCheckedRadio', 'radio2');
  }
}
 



// Function to restore the state of the radio buttons from local storage
function restoreRadioState() {
  const lastCheckedRadio = sessionStorage.getItem('lastCheckedRadio');
  if (lastCheckedRadio === 'radio1') {
    radio1.checked = true;
  } else if (lastCheckedRadio === 'radio2') {
    radio2.checked = true;
    radio1.checked = false;
    radio2button();
  }
  
  // Check if the lastCheckedRadio is not equal to 'radio2' before performing radio1 actions
  if (lastCheckedRadio !== 'radio2' && radio1.checked) {
    userRef.once("value")
      .then(function (snapshot) {
        var userData = snapshot.val();
        if (userData.Province == 'Cavite') {
          $('#city_div_my').show();
          $('#barangay_div_my').show();
      } else {
          $('#city_div_my').hide();
          $('#barangay_div_my').hide();
      }
        document.getElementById('myself_lname').value = userData.LastName;
        document.getElementById('myself_fname').value = userData.FirstName;
        document.getElementById('myself_email').value = userData.Email;
        document.getElementById('myself_pnum').value = userData.PhoneNum;
        document.getElementById('myself_mname').value = userData.MiddleName;
        
        document.getElementById('myself_sex').value = userData.Gender;
        document.getElementById('province_my').value = userData.Province;
        document.getElementById('city_my').value = userData.CityMunicipality;
        document.getElementById('barangay_my').value = userData.Barangay;
        document.getElementById('myself_address').value = userData.Province+' '+userData.CityMunicipality+' '+userData.Barangay;
        document.getElementById('myself_status').value = userData.CivilStatus;
        document.getElementById('myself_birthday').value = userData.BirthDate;
        
        sendDataToParent(userData);
      })
      .catch(function (error) {
        console.error("Error fetching user data:", error);
      });
  }
}


radio1.addEventListener('change', saveRadioState);
radio2.addEventListener('change', saveRadioState);

document.addEventListener('DOMContentLoaded', restoreRadioState);
