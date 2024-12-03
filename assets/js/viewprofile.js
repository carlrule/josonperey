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
  


/* ------ Update the username indicator based on the currently logged in user ------ */

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




/* ------ Enable edit fields after clicking the edit button ------ */

function enableFields() {
    // Get all elements with the 'disabled' attribute within the form
    var disabledElements = document.querySelectorAll('.tab-content [disabled]');
    
    // Loop through the disabled elements and enable them
    disabledElements.forEach(function (element) {
        originalFieldValues[element.id] = element.value;
        element.removeAttribute('disabled');
    });

    // var province = document.getElementById('province');
    // // if(province)
    // var citymunicipality = document.getElementById('city-municipality');
    // citymunicipality.setAttribute('disabled', 'true');

    // var barangay = document.getElementById('barangay');
    // barangay.setAttribute('disabled', 'true');


    // Disable the "Edit" button
    var editButton = document.getElementById('editProfileButton');
    editButton.setAttribute('disabled', 'true');
}

/* ---------------------------------------------------------------- */





/* ------ Disable edit fields after clicking the cancel button ------ */

// var originalFieldValues = {}; // Variable to store original field values

// function cancel() {
//     // Get all elements with the 'disabled' attribute within the form
//     var disabledElements = document.querySelectorAll('.tab-content [required]');
    
//     // Loop through the disabled elements and enable them
//     disabledElements.forEach(function (element) {
//         var fieldName = element.id;
//         element.value = originalFieldValues[fieldName];
//         element.setAttribute('disabled', 'true');
//     });

//     var editButton = document.getElementById('editProfileButton');
//     var cancelButton = document.getElementById('cancelButton');
//     var saveProfileButton = document.getElementById('saveProfileButton');
//     editButton.removeAttribute('disabled');
//     cancelButton.setAttribute('disabled', 'true');
//     saveProfileButton.setAttribute('disabled', 'true');
// }

/* ---------------------------------------------------------------- */





/* ------ My Profile Toggle (Account, Personal, Contact, and Address Information Navigation) ------ */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.profile-nav-item');
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

$(document).ready(function() {
  
  const provinceDropdown = $('#province');
  const cityDropdown = $('#city-municipality');
  const barangayDropdown = $('#barangay');

  // Add an event listener to the Province dropdown
  $('#province').change(function() {
    filter_1()
  });

  function filter_1(){
    if ($('#province').val() == 'Cavite') {
      $('#city-municipality').val("");
      $('#barangay').val("");
      $('#city-municipality').prop('disabled', false).show();
      $('#barangay').show();
      $('#city-municipality_div').show();
      $('#barangay_div').show();
  } else {
      $('#city-municipality').hide().prop('disabled', true);
      $('#barangay').hide().prop('disabled', true);
      $('#city-municipality_div').hide();
      $('#barangay_div').hide();
  }
  }

    $("#city-municipality").on("change", function () {
      filter()
    })
    function filter(){
        var city = $('#city-municipality').val();
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
});