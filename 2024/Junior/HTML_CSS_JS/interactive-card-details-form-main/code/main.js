/*===========*/
/*   theme   */
/*===========*/

                
document.addEventListener('DOMContentLoaded', function () {
  const themeInput = document.querySelector('.theme-input');
  const darkModeSwitch = document.getElementById('darkmode-toggle');

  function setCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  function getCookie(name) {
      const cookieName = `${name}=`;
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.indexOf(cookieName) === 0) {
              return cookie.substring(cookieName.length, cookie.length);
          }
      }
      return null;
  }

  const storedDarkMode = getCookie('darkMode') === 'enabled';

  if (storedDarkMode) {
      enableDarkMode();
      darkModeSwitch.checked = true;
  }

  themeInput.addEventListener('change', function () {
      const isDarkMode = this.checked;
      document.body.classList.toggle('dark-theme', isDarkMode);
      updateDarkModePreference(isDarkMode);
  });

  function enableDarkMode() {
      document.body.classList.add('dark-theme');
      document.querySelectorAll('input').forEach(function (inputElement) {
          inputElement.classList.add('dark-theme');
      });
      document.querySelectorAll('label').forEach(function (labelElement) {
          labelElement.classList.add('dark-theme');
      });
      document.querySelectorAll('button').forEach(function (buttonElement) {
          buttonElement.classList.add('dark-theme'); 
      });
      document.querySelectorAll('i').forEach(function (iElement) {
        iElement.classList.add('dark-theme'); 
    });
  } 

  function updateDarkModePreference(isEnabled) {
      if (isEnabled) {
          setCookie('darkMode', 'enabled', 30); 
      } else {
          setCookie('darkMode', '', -1); 
      }
  }
});


/*===========*/
/* Live update info*/
/*===========*/


const cardCVC = document.querySelector(".cvc span");
const cardNumber = document.querySelector(".number-card");
const cardName = document.querySelector(".cardholder-name");
const cardExpDate = document.querySelector(".exp-date");

const inputName = document.querySelector("#name");
const inputNumber = document.querySelector("#card-number");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");
const inputCVC = document.querySelector("#cvc");

const deleteSpace = (input) => {
  if (/\s/.test(input.value)) {
    let formatText = input.value.replace(/\s/g, "");
    input.value = formatText;
  }
};

inputName.addEventListener("input", (e) => {
  e.preventDefault();
  cardName.textContent = e.target.value;
});

inputNumber.addEventListener("input", (e) => {
  e.preventDefault();

  let formatText = e.target.value;
  formatText = formatText.substring(0, 19);
  formatText = formatText
    .replace(/\s/g, "")
    .replace(new RegExp(`(.{${4}})`, "g"), "$1 ")
    .trim();
  e.target.value = formatText;
  cardNumber.textContent = e.target.value;
});

inputMonth.addEventListener("input", (e) => {
  e.preventDefault();
  deleteSpace(inputMonth);
  cardExpDate.textContent = e.target.value + "/" + inputYear.value;
});

inputYear.addEventListener("input", (e) => {
  e.preventDefault();
  deleteSpace(inputYear);
  cardExpDate.textContent = inputMonth.value + "/" + e.target.value;
});

inputCVC.addEventListener("input", (e) => {
  e.preventDefault();
  deleteSpace(inputCVC);
  cardCVC.textContent = e.target.value;

  cardCVC.textContent = '***';
  iconEye.addEventListener('click', () => {
    if (input.type === 'password') {
        cardCVC.textContent = inputCVC.value;
    } else {
        cardCVC.textContent = '***';
    }
  });
});


/*===========*/
/* Hidden cv*/
/*===========*/


const showHiddenCv = (cvInputId, eyeIconId) => {
  const input = document.getElementById(cvInputId); 
  const iconEye = document.getElementById(eyeIconId);

  iconEye.addEventListener('click', () => {
      if (input.type === 'password') {
          input.type = 'text';
          iconEye.classList.add('ri-eye-line')
          iconEye.classList.remove('ri-eye-off-line')
          cardCVC.textContent = inputCVC.value;
      } else {
          input.type = 'password'
          iconEye.classList.remove('ri-eye-line')
          iconEye.classList.add('ri-eye-off-line')
          cardCVC.textContent = '***';
      };
  });
};

showHiddenCv('cvc', 'login-eye');


/*===========*/
/* Error     */
/*===========*/



const inputs = [inputName, inputCVC, inputYear, inputMonth, inputNumber];
const error_info1s = [
  inputName.parentElement.querySelector(".error_info"),
  inputCVC.parentElement.querySelector(".error_info"),
  inputYear.parentElement.querySelector(".error_info"),
  inputMonth.parentElement.querySelector(".error_info"),
  inputNumber.parentElement.querySelector(".error_info")
];
const error_info2s = [
  inputName.parentElement.querySelector(".error_info2"),
  inputCVC.parentElement.querySelector(".error_info2"),
  inputYear.parentElement.querySelector(".error_info2"),
  inputMonth.parentElement.querySelector(".error_info2"),
  inputNumber.parentElement.querySelector(".error_info2")
];

document.getElementById("checkbtn").addEventListener("click", function(event) { 
  event.preventDefault(); 

  let isValid = true; 

  inputs.forEach((input, index) => {
    let inputValue = input.value.trim();

    if (input.id === 'card-number') {
      inputValue = inputValue.replace(/\s/g, "");
    }

    if (inputValue === "") {
      error_info1s[index].style.display = "block";
      error_info2s[index].style.display = "none";
      input.style.borderColor = "#ff5252";
      isValid = false; 
    } else {
      error_info1s[index].style.display = "none";

      if (input.id !== 'name' && !/^\d+$/.test(inputValue)) {
        error_info2s[index].style.display = "block";
        input.style.borderColor = "#ff5252"; 
        isValid = false;
      } else if (input.id === 'card-number' && inputValue.length !== 16) {
        error_info1s[index].style.display = "block";
        input.style.borderColor = "#ff5252"; 
        isValid = false; 
      } else if ((input.id === 'month') && (parseInt(inputValue) < 1 || parseInt(inputValue) > 12)) {
        error_info1s[index].style.display = "block";
        input.style.borderColor = "#ff5252"; 
        isValid = false;
      } else {
        error_info2s[index].style.display = "none";
        input.style.borderColor = ""; 
      }
    }
  });

  if (isValid) {
    document.querySelector('form').style.display = "none";
    document.querySelector('.complete').style.display = "block";
  }
});

document.getElementById("continuebtn").addEventListener("click", function(event) {
  event.preventDefault();

  inputs.forEach(input => {
    input.value = "";
  });

  const cardNumber = document.querySelector('.number-card');
  const cardName = document.querySelector('.cardholder-name');
  const cardExpDate = document.querySelector('.exp-date');
  const cardCVC = document.querySelector('.cvc span');

  cardNumber.textContent = "0000 0000 0000 0000";
  cardName.textContent = "Jane Appleseed";
  cardExpDate.textContent = "00/00";
  cardCVC.textContent = "000";
  document.querySelector('.complete').style.display = "none";
  document.querySelector('form').style.display = "block";
});