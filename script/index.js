let cornSilkColor = 'cornsilk';
let mouseDown = false; // sentinel for  mouse event

let captureSliderValue;
let rangeInput;

let defaultColor;

let rndcolor = false; //sentinel for color selected

/** create node elements */
let bodyContainer = document.createElement('div');
let headerContainer = document.createElement('div');
let contentContainer = document.createElement('div');
let footerContainer = document.createElement('div');
let btnsContainer = document.createElement('div');
let randomColorBtn = document.createElement('button');
let resetBtn = document.createElement('button');
let footerText = document.createElement('p');
let colorPicker = document.createElement('input');

let header1 = document.createElement('h1');
let gridContainer = document.createElement('div');

let settingsContainer = document.createElement('div');

let rangeSlider = document.createElement('input');
let rangeValue = document.createElement('p');
let gridSizeText = document.createElement('p');
let colorText = document.createElement('p');

/** select element */
let htmlBody = document.getElementById('body');
let cells;
let gridItems = document.getElementsByClassName('grid-item');
let colorInput = document.getElementById('color-picker');
// bodyContainer.setAttribute('style', 'background: red');

/** create classes */
bodyContainer.classList.add('body-container');
headerContainer.classList.add('header-container');
contentContainer.classList.add('content-container');
footerContainer.classList.add('footer-container');
gridContainer.classList.add('grid-container');
btnsContainer.classList.add('btns-container');

/** Setting attributes */
rangeSlider.classList.add('range-slider');
rangeSlider.setAttribute('type', 'range');
rangeSlider.setAttribute('min', '1');
rangeSlider.setAttribute('max', '64');
rangeSlider.setAttribute('value', '16');
rangeSlider.setAttribute('id', 'slider-value');
rangeSlider.setAttribute('step', '1');
rangeSlider.setAttribute('oninput', 'rangeValue.innerText = this.value');

rangeValue.setAttribute('id', 'rangeValue');
resetBtn.setAttribute('onclick', 'resetDefault()');
randomColorBtn.setAttribute('onclick', 'rainbowGenerator()');

colorPicker.setAttribute('type', 'color');
colorPicker.setAttribute('id', 'color-picker');
colorPicker.setAttribute('value', '#D6E316');

/** adding text into element */
rangeValue.textContent = 16;
header1.textContent = 'Etch-a-sketch';
randomColorBtn.textContent = 'Rainbow Color';
resetBtn.textContent = 'Reset';
footerText.textContent = ' Created by Galekwan Sango';
gridSizeText.textContent = ' Grid size: ';
colorText.textContent = 'Pick a color:';

/** Append Element */
bodyContainer.appendChild(headerContainer);
bodyContainer.appendChild(contentContainer);
bodyContainer.appendChild(footerContainer);

contentContainer.appendChild(header1);
contentContainer.appendChild(gridContainer);
contentContainer.appendChild(colorPicker);
contentContainer.appendChild(gridSizeText);
contentContainer.appendChild(rangeSlider);
contentContainer.appendChild(rangeValue);
contentContainer.appendChild(btnsContainer);

btnsContainer.appendChild(randomColorBtn);
btnsContainer.appendChild(resetBtn);

footerContainer.appendChild(footerText);

htmlBody.appendChild(bodyContainer);

bodyContainer.style.backgroundColor = cornSilkColor;

function createGrid(size) {
  gridContainer.innerHTML = ''; // Clear the existing grid
  gridContainer.style.setProperty('--grid-rows', size);
  gridContainer.style.setProperty('--grid-cols', size);
  for (let i = 0; i < size * size; i++) {
    let cell = document.createElement('div');
    gridContainer.appendChild(cell).className = 'grid-item';
  }
  cells = document.getElementsByClassName('grid-item');
  addEventListenersToCells();
}

/** Listen to every mouse event when it enter every cell of the gridd or canvas
 *
 */
function addEventListenersToCells() {
  for (let cell of cells) {
    cell.addEventListener('mousedown', changeBackgroundColor);
    cell.addEventListener('mouseup', clearBackgroundColor);
    cell.addEventListener('mouseenter', (e) => {
      if (mouseDown) {
        changeBackgroundColor(e);
      }
    });
  }
}

/** Change background color of cell */
function changeBackgroundColor(event) {
  if (!rndcolor) {
    event.target.style.backgroundColor = colorPicker.value;
  } else {
    rainbowGenerator();
    event.target.style.backgroundColor = defaultColor;
  }
}

function clearBackgroundColor(event) {
  mouseDown = false;
}

/** Set everything back to factory default */
function resetDefault() {
  console.log(gridItems);

  for (gridItem of gridItems) {
    gridItem.style.backgroundColor = '';
  }
}

/** Generate random colors */
function rainbowGenerator() {
  rndcolor = true;
  // Math.pow is slow, use constant instead.
  let color = Math.floor(Math.random() * 16777216).toString(16);
  // Avoid loops.
  defaultColor = '#000000'.slice(0, -color.length) + color;
  console.log(defaultColor);
}

createGrid(16);

rangeInput = document.getElementById('slider-value');
rangeInput.addEventListener('input', (event) => {
  captureSliderValue = event.target.value;
  updateGridSize(Number(captureSliderValue));
});

document.addEventListener('mousedown', () => {
  mouseDown = true;
});

document.addEventListener('mouseup', () => {
  mouseDown = false;
});

function updateGridSize(size) {
  createGrid(size);
}
