var userAppConfig = {
    apiKey: "AIzaSyBmpCcjkE7SbBAJMXBA113q0k2GycBVpKY",
    authDomain: "patient-35f7e.firebaseapp.com",
    databaseURL: "https://patient-35f7e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "patient-35f7e",
    storageBucket: "patient-35f7e.appspot.com",
    messagingSenderId: "392977055504",
    appId: "1:392977055504:web:3b175a57cb7b8874bcaf95",
    measurementId: "G-KKQJJY5EK8"
};

var userApp = firebase.initializeApp(userAppConfig, "userApps");
var userdb = userApp.database();

function function1() {
    const username = document.getElementById("forgot-username");
    if (username.value === '') {
        alert("Text field should not be empty!");
        return;
    }
    else {

        document.getElementById("container1").style.display = "none";
        document.getElementById("container2").style.display = "block";
        document.getElementById("s1").style.display = "none";
        document.getElementById("s2").style.display = "block";

        

        if (username.value !== '') {
            

            var userRef = userdb.ref("user/" + username.value);
            userRef.once("value")
                .then(function (snapshot) {
                    var userData = snapshot.val();
                    document.getElementById('number').value = userData.PhoneNum;
                    document.getElementById('password').value = userData.Password;
                })
                .catch(function (error) {
                    console.error("Error fetching user data:", error);
                });
        }
    }
    
    
}
function function2() {
    document.getElementById("container2").style.display = "none";
    document.getElementById("container3").style.display = "block";
    document.getElementById("s2").style.display = "none";
    document.getElementById("s3").style.display = "block";
    const number = document.getElementById('number');
    if (number !== null) {
        sendOTPMessage(number);
    }
}

function function3() {
    
    const code = document.getElementById('code');
    const codex = document.getElementById('codex');
    if (code.value === '') {
        alert("Text field should not be empty!");
        return;
    }
    else {
        if (code.value === codex.value) {
            document.getElementById("container3").style.display = "none";
            document.getElementById("container4").style.display = "block";
            document.getElementById("s3").style.display = "none";
            document.getElementById("s4").style.display = "block";
        } else {
            alert("Invalid Code!");
            document.getElementById('code').value = '';
    }
}
}
function function4() {
    const newPasswordInput = document.getElementById('newpassword');
    
    if (newPasswordInput.value.trim() !== '') {
        const username = document.getElementById('forgot-username').value;

        var userRef = userdb.ref("user/" + username);
        userRef.once("value")
            .then(function (snapshot) {
                var userData = snapshot.val();
                
                // Update the password in the Realtime Database
                userRef.update({ Password: newPasswordInput.value })
                    .then(() => {
                        alert("Password updated successfully!");
                        document.getElementById("container4").style.display = "none";
                        document.getElementById("container1").style.display = "block";
                        document.getElementById("s4").style.display = "none";
                        document.getElementById("s1").style.display = "block";
                        document.getElementById("forgot-username").value = "";
                        document.getElementById("code").value = "";
                        document.getElementById("newpassword").value = "";

                        const forgotPopup = document.getElementById('forgot-password-popup');
                        const clientPopup = document.getElementById('client-popup');

                        closePopup(forgotPopup);
                        openPopup(clientPopup);
                    })
                    .catch((error) => {
                        console.error('Error updating password in the database:', error.message);
  
                    });

 
                const user = firebase.auth().currentUser;
                user.updatePassword(newPasswordInput.value)
                    .then(() => {

                        console.log('Password updated successfully in Firebase Authentication');
                    })
                    .catch((error) => {
                        console.error('Error updating password in Firebase Authentication:', error.message);
                    });
            })
            .catch(function (error) {
                console.error("Error fetching user data:", error);
                
            });
    } else {
        alert("Text field should not be empty!");
        return;
    }
}


function sendOTPMessage(number) {
    const apikey = "5b469cdc4556e213de6021e680e28d69";

    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);


    document.getElementById('codex').value = randomSixDigitNumber;

    const otpMessage = `Your code is: ${randomSixDigitNumber}. Please use it with ASAP.`;

    const parameters = {
        apikey,
        number: number.value,
        message: otpMessage,
    };

    fetch('https://api.semaphore.co/api/v4/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(parameters),
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
    })
    .catch(error => {
        console.error(error);
    });
}

