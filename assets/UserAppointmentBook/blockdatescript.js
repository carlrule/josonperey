var userAppConfig = {
    apiKey: "AIzaSyAxc618JzpkaVvMMWMj5Unysij6hnHgcTQ",
    authDomain: "wrud-4330a.firebaseapp.com",
    databaseURL: "https://wrud-4330a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wrud-4330a",
    storageBucket: "wrud-4330a.appspot.com",
    messagingSenderId: "122258572390",
    appId: "1:122258572390:web:a5b7ec4ba236e8d53d99a7"
    };
  
    firebase.initializeApp(userAppConfig);
    var database = firebase.database();

  
    var blockdateValue = localStorage.getItem("blockdate");

if (blockdateValue) {
    document.getElementById("blockdate").value = blockdateValue;
    var iFrame = document.getElementById("myIframe");
    iFrame.src = 'calendar.php?blockedDate=' + blockdateValue;;
} else {
    document.getElementById("blockdate").value = '';
}

window.addEventListener('message', receiveMessage, false);
  

    function receiveMessage(event) {

        if (event.origin !== window.location.origin) {
         return;
        }
        var receivedValue = event.data;
        document.getElementById("blockdate").value = receivedValue;
     }
  
    function sendBlockDateToChild() {
  
        var blockdateValue = document.getElementById("blockdate").value;
        localStorage.setItem("blockdate", blockdateValue);
 
        
        var childFrame = document.getElementById("myIframe");
        childFrame.contentWindow.postMessage({ type: "blockdate", value: blockdateValue }, '*');

        deleteAppointments();
    }
  
    function clearBlockDate() {
        document.getElementById("blockdate").value = '';
        sendBlockDateToChild();
    }
  
    function changeLocation() {
  
        window.location.href = 'book_appointment.html';
    }
  
  function sendMessage(message, phoneNumber) {
    const apikey = "5b469cdc4556e213de6021e680e28d69";
  
    const parameters = {
      apikey,
      number: phoneNumber,
      message: message,
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
        console.log(output);
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  function deleteAppointments() {
    var blockdateValue = document.getElementById("blockdate").value;
  

    const topayRef = firebase.database().ref('topayappointments');
    const pendingRef = firebase.database().ref('pendingappointments');
    const completedRef = firebase.database().ref('completedappointments');
  
   
    topayRef.orderByChild('date').equalTo(blockdateValue).once('value', snapshot => {
      snapshot.forEach(childSnapshot => {

        const phoneNumber = childSnapshot.child('number').val();
        childSnapshot.ref.remove();
  
       
        sendMessage(blockdateValue +" has been close. Your appointment that has a satus of to pay is cancelled. Please select another date for your appointment", phoneNumber);
      });
    });
  
    pendingRef.orderByChild('date').equalTo(blockdateValue).once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const phoneNumber = childSnapshot.child('number').val();
        childSnapshot.ref.remove();
        sendMessage(blockdateValue +" has been close. Your appointment that has a satus of pending is cancelled. Please select another date for your appointment", phoneNumber);
      });
    });
  
    completedRef.orderByChild('date').equalTo(blockdateValue).once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const phoneNumber = childSnapshot.child('number').val();
        childSnapshot.ref.remove();
        sendMessage(blockdateValue +" has been close. Your appointment that has a satus of to completed is cancelled. Please select another date for your appointment", phoneNumber);
      });
    });
  }
  
  