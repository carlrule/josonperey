var userAppConfig = {
    apiKey: "AIzaSyCrih2yzDn4-ADl9vOOMcRUzBl3GFEjGdg",
    authDomain: "booking-b8486.firebaseapp.com",
    databaseURL: "https://booking-b8486-default-rtdb.firebaseio.com",
    projectId: "booking-b8486",
    storageBucket: "booking-b8486.appspot.com",
    messagingSenderId: "811552146571",
    appId: "1:811552146571:web:a133cb091615ae060b808e"
    }
  firebase.initializeApp(userAppConfig);
  var database = firebase.database();  
                                       
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
  
    let priceElement = document.getElementById("price");

    var username = sessionStorage.getItem("passValueUser");
  
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
              alert("tite123");
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

          let visit_type = "Walkin"; 
          
          document.getElementById("prev").style.display = "none";
          document.getElementById("next").style.display = "none";
  
  
          username ="Walk-in";
  
          database.ref('acceptedappointments/' + username + " " + doctor + " " + date + " " + time).set({
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