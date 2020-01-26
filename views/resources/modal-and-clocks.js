
// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn1 = document.querySelector('.button-modal.face.btn1');
const modalBtn2 = document.querySelector('.button-modal.face.btn2');
const modalBtn3 = document.querySelector('.button-modal.face.btn3');
const closeBtn = document.querySelector('.close');

let buttonID;

function getID(id) {
  buttonID = id;
}

// Events

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

//const clockFace = document.querySelector('.clock-face');


// Elements from btn1

let clockButtonImg = document.querySelector('.plus-img');
let clockButtonP = document.querySelector('.border');
let clockBtn = document.querySelector('.clock-face');

// Timezones in each of the cities

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

// Get eihter the label's text or the value of the image and pass it so that
// the function abve will indicate the time difference

function hideElements() {
  clockButtonImg.className = `plus-img ${buttonID}`;
  clockButtonImg.style.display = 'none';

  clockButtonP.className = `border ${buttonID}`;
  clockButtonP.style.display = 'none';

  clockBtn.className = `clock-face ${buttonID}`;
  clockBtn.style.display = 'block';

  if(buttonID === 'btn1') {
    modalBtn1.removeAttribute('title');
  } else if(buttonID === 'btn2') {
    modalBtn2.removeAttribute('title');
  } else if (buttonID === 'btn3') {
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
    console.log(buttonID);
    if(buttonID === 'btn1')
      cityName1.innerHTML = name0fTheCity;
    else if(buttonID === 'btn2')
      cityName2.innerHTML = name0fTheCity;
    else if(buttonID === 'btn3')
      cityName3.innerHTML = name0fTheCity;
    closeModal();
    hideElements();
    city.classList.add('dimmed');
  });
}); 

const buenosAires = document.getElementById('buenos-aires');
const rome = document.getElementById('rome');
const wellington = document.getElementById('wellington');
const hongKong = document.getElementById('hong-kong');
const london = document.getElementById('london');
const washington = document.getElementById('washington');


// Setting the clock right so that it works with current time and moves the heads
// in the right moment (seconds, minutes and hours)

setInterval(setClock, 1000);


// Adds the hours to the current time

Date.prototype.addHours = function (hour) {
  this.setHours(this.getHours() + hour);
  return this;
}


// Extracts the current time from the current date and ajusts it to the clicked button.
// Firstly I needed to get each div as data-* was not cooperating

function setClock() {
  // Clock1
  const timezone1 = document.querySelector('.timezone.btn1');
  let currentDate1 = new Date();
  currentDate1 = currentDate1.addHours(getTimezoneHours(timezone1.textContent));
  let secondsRatio1 = currentDate1.getSeconds() / 60;
  let minutesRatio1 = (secondsRatio1 + currentDate1.getMinutes()) / 60;
  let hoursRatio1 = (minutesRatio1 + currentDate1.getHours()) / 12;

  const secondHand1 = document.querySelector('.hand.second.btn1');
  const minuteHand1 = document.querySelector('.hand.minute.btn1');
  const hourHand1 = document.querySelector('.hand.hour.btn1');   

  setRotation(secondHand1, secondsRatio1);
  setRotation(minuteHand1, minutesRatio1);
  setRotation(hourHand1, hoursRatio1);

  // Clock2
  const timezone2 = document.querySelector('.timezone.btn2');  
  let currentDate2 = new Date();
  currentDate2 = currentDate2.addHours(getTimezoneHours(timezone2.textContent));
  let secondsRatio2 = currentDate2.getSeconds() / 60;
  let minutesRatio2 = (secondsRatio2 + currentDate2.getMinutes()) / 60;
  let hoursRatio2 = (minutesRatio2 + currentDate2.getHours()) / 12;
 
  const secondHand2 = document.querySelector('.hand.second.btn2');
  const minuteHand2 = document.querySelector('.hand.minute.btn2');
  const hourHand2 = document.querySelector('.hand.hour.btn2');  

  setRotation(secondHand2, secondsRatio2);
  setRotation(minuteHand2, minutesRatio2);
  setRotation(hourHand2, hoursRatio2);

  // Clock3
  const timezone3 = document.querySelector('.timezone.btn3'); 
  let currentDate3 = new Date();
  currentDate3 = currentDate3.addHours(getTimezoneHours(timezone3.textContent));
  let secondsRatio3 = currentDate3.getSeconds() / 60;
  let minutesRatio3 = (secondsRatio3 + currentDate3.getMinutes()) / 60;
  let hoursRatio3 = (minutesRatio3 + currentDate3.getHours()) / 12;
  
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

setClock();
