/*
* @author: Michal J Sekulski, 2019
*/

/*******************************************************/

// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn1 = document.querySelector('.button-modal.face.btn1');
const modalBtn2 = document.querySelector('.button-modal.face.btn2');
const modalBtn3 = document.querySelector('.button-modal.face.btn3');
const closeBtn = document.querySelector('.close');



// Gets the most recent button that was pressed

let buttonID;

function getID(id) {
  buttonID = id;
}



// Events(open modal or close it)

modalBtn1.addEventListener('click', openModal);
modalBtn2.addEventListener('click', openModal);
modalBtn3.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

/*******************************************************/

//Clocks

// DOM Elements


// Temporary elements, displayed before placing the clocks

const clockButtonImg1 = document.querySelector('.plus-img.btn1');
const clockButtonP1 = document.querySelector('.border.btn1');
const clockBtn1 = document.querySelector('.clock-face.btn1');

const clockButtonImg2 = document.querySelector('.plus-img.btn2');
const clockButtonP2 = document.querySelector('.border.btn2');
const clockBtn2 = document.querySelector('.clock-face.btn2');

const clockButtonImg3 = document.querySelector('.plus-img.btn3');
const clockButtonP3 = document.querySelector('.border.btn3');
const clockBtn3 = document.querySelector('.clock-face.btn3');



// Timezones in each of the cities, either add or substract the difference

function getTimezoneHours(city) {
  switch (city) {
    case 'Buenos Aires':
      return -11;
    case 'Hong Kong':
      return 0;
    case 'Rome':
      return -7;
    case 'Wellington':
      return 5;
    case 'London':
      return -8;
    case 'Washington':
      return -13;
    default:
      return 0;
  }
}




// Vlidate which button was pressed and then trigger rigth elements
// Removes the button and replaces it with the clock. This function is used in setClocks()

function hideElements() {
  if (buttonID === 'btn1') {
    clockButtonImg1.style.display = 'none';
    clockButtonP1.style.display = 'none';
    clockBtn1.style.display = 'block';
    modalBtn1.removeAttribute('title');
  } else if (buttonID === 'btn2') {
    clockButtonImg2.style.display = 'none';
    clockButtonP2.style.display = 'none';
    clockBtn2.style.display = 'block';
    modalBtn2.removeAttribute('title');
  } else if (buttonID === 'btn3') {
    clockButtonImg3.style.display = 'none';
    clockButtonP3.style.display = 'none';
    clockBtn3.style.display = 'block';
    modalBtn3.removeAttribute('title');
  }
}



// This function gets the information which city was clicked by receiving either the 
// text or the alt value of the image. Later closes the modal and replaces the 
// " + Add a clock" with the actual clock with the current time in the city.

const cityName1 = document.querySelector('.timezone.btn1');
const cityName2 = document.querySelector('.timezone.btn2');
const cityName3 = document.querySelector('.timezone.btn3');

const cities = document.querySelectorAll('.button-modal.city');
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    const name0fTheCity = e.target.textContent || e.target.getAttribute('alt');

    // Check which button was pressed and insert the city's name there
    if (buttonID === 'btn1')
      cityName1.innerHTML = name0fTheCity;
    else if (buttonID === 'btn2')
      cityName2.innerHTML = name0fTheCity;
    else if (buttonID === 'btn3')
      cityName3.innerHTML = name0fTheCity;
    closeModal();
    hideElements();
    city.classList.add('dimmed');
  });
});



// Setting the clock right so that it works with current time and moves the heads
// in the right moment (seconds, minutes and hours).

setInterval(setClocks, 1000);



// Adds the hours to the current time(time difference)

Date.prototype.addHours = (hour) => {
  this.setHours(this.getHours() + hour);
  return this;
}


// Extracts the current time from the current date and ajusts it to the clicked button.
// There are three clocks prepared for each of the spots

function setClocks() {
  // Clock1
  const timezone1 = document.querySelector('.timezone.btn1');
  const currentDate1 = new Date();
  currentDate1 = currentDate1.addHours(getTimezoneHours(timezone1.textContent));
  const secondsRatio1 = currentDate1.getSeconds() / 60;
  const minutesRatio1 = (secondsRatio1 + currentDate1.getMinutes()) / 60;
  const hoursRatio1 = (minutesRatio1 + currentDate1.getHours()) / 12;

  const secondHand1 = document.querySelector('.hand.second.btn1');
  const minuteHand1 = document.querySelector('.hand.minute.btn1');
  const hourHand1 = document.querySelector('.hand.hour.btn1');

  setRotation(secondHand1, secondsRatio1);
  setRotation(minuteHand1, minutesRatio1);
  setRotation(hourHand1, hoursRatio1);



  // Clock2
  const timezone2 = document.querySelector('.timezone.btn2');
  const currentDate2 = new Date();
  currentDate2 = currentDate2.addHours(getTimezoneHours(timezone2.textContent));
  const secondsRatio2 = currentDate2.getSeconds() / 60;
  const minutesRatio2 = (secondsRatio2 + currentDate2.getMinutes()) / 60;
  const hoursRatio2 = (minutesRatio2 + currentDate2.getHours()) / 12;

  const secondHand2 = document.querySelector('.hand.second.btn2');
  const minuteHand2 = document.querySelector('.hand.minute.btn2');
  const hourHand2 = document.querySelector('.hand.hour.btn2');

  setRotation(secondHand2, secondsRatio2);
  setRotation(minuteHand2, minutesRatio2);
  setRotation(hourHand2, hoursRatio2);



  // Clock3
  const timezone3 = document.querySelector('.timezone.btn3');
  const currentDate3 = new Date();
  currentDate3 = currentDate3.addHours(getTimezoneHours(timezone3.textContent));
  const secondsRatio3 = currentDate3.getSeconds() / 60;
  const minutesRatio3 = (secondsRatio3 + currentDate3.getMinutes()) / 60;
  const hoursRatio3 = (minutesRatio3 + currentDate3.getHours()) / 12;

  const secondHand3 = document.querySelector('.hand.second.btn3');
  const minuteHand3 = document.querySelector('.hand.minute.btn3');
  const hourHand3 = document.querySelector('.hand.hour.btn3');

  setRotation(secondHand3, secondsRatio3);
  setRotation(minuteHand3, minutesRatio3);
  setRotation(hourHand3, hoursRatio3);
}

// Rotates the divs(heads) according to the current time.

function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360);
}

setClocks();
