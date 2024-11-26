/* ------ Script for Home Slider ------ */

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let active = 0;
let interval = null;

function reloadSlider() {
  // Hide all items
  items.forEach(item => item.style.display = 'none');

  // Show the active item
  items[active].style.display = 'block';

  // Update active dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[active].classList.add('active');

  // Clear the previous interval and start a new one
  clearInterval(interval);
  interval = setInterval(nextSlide, 3000);
}

function nextSlide() {
  active = (active + 1) % items.length;
  reloadSlider();
}

function prevSlide() {
  active = (active - 1 + items.length) % items.length;
  reloadSlider();
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    active = index;
    reloadSlider();
  });
});

reloadSlider(); // Show the initial slide

function debounce(func, delay) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Adjust the height of the slider dynamically based on the size of the browser
function adjustSliderHeight() {
    const slider = document.querySelector('.slider');
    slider.style.height = `${window.innerHeight}px`;
}

// Set initial height when the DOM content is loaded
document.addEventListener('DOMContentLoaded', adjustSliderHeight);

// Adjust height on window resize
window.addEventListener('resize', adjustSliderHeight);

/* ------------------------------------- */





/* ------ Add an Intersection Observer for each section with the slide-in effect ------ */

const sections = document.querySelectorAll('.slide-in-section');

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        } else {
            entry.target.classList.remove('slide-in');
        }
    });
}

const sectionObserver = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

/* ------------------------------------- */