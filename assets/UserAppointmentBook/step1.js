const radioButtons = document.querySelectorAll('input[type="radio"]');
const selectedValueTextbox = document.getElementById('step1');

function updateSelectedValue() {
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      const selectedValue = radioButton.value;
      selectedValueTextbox.value = selectedValue;
      // Send the selected value to the parent window
      window.parent.postMessage(selectedValue, '*');
      break;
    }
  }
}

for (const radioButton of radioButtons) {
  radioButton.addEventListener('click', updateSelectedValue);
}

updateSelectedValue();
