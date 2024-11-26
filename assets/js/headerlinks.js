/* ------ Script for home buttons ------ */
function bookAppointment() {
    window.location.href = 'book_appointment.html';
}

function home() {
    window.location.href = 'clientafterlog.html#home';
}

function services() {
    window.location.href = 'clientafterlog.html#services';
}

function doctors() {
    window.location.href = 'clientafterlog.html#doctors';
}

function aboutus() {
    window.location.href = 'clientafterlog.html#about-us';
}

function contact() {
    window.location.href = 'clientafterlog.html#contact';
}

/* ------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {

    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn !== "true") {
      // If not logged in, redirect to login page
      window.location.href = 'index.html';
    }
  });
