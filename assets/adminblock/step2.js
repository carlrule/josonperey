const optionMenu = document.querySelector(".select-menu");
const selectBtn = optionMenu.querySelector(".select-btn");
const options = optionMenu.querySelectorAll(".option");
const sBtn_text = optionMenu.querySelector(".sBtn-text");

// Reference to the text input field
const servicesInput = document.getElementById("services_step2");

const receivedservicesvalue = window.parent.document.getElementById("services_step2").value;


if (receivedservicesvalue) {
    sBtn_text.innerText = receivedservicesvalue;
}

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;

        // Set the selected value in the text input field
        servicesInput.value = selectedOption;

        optionMenu.classList.remove("active");

        // Send the selected value to the parent window
        window.parent.postMessage(selectedOption, '*');
    });
});
