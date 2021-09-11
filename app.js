// Definitions
const hexColor = document.getElementById("hex-color");
let colorPicker = document.querySelectorAll(".color-picker");
const bin = document.querySelector(".delete");
const btnGenerate = document.getElementById("btn-generate");
const btnAdd = document.getElementById("btn-add");
const colorBar = document.getElementById("color-bar");
const main = document.getElementById("main");
let numOfColorBar;
const codeGenArr = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];
// Funcitons

// Hex Color Contrast Calculator -------
function getContrastYIQ(hexcolor) {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}
// Random Color Generator -------
const randomColorCode = () => {
  let hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += codeGenArr[Math.floor(Math.random() * codeGenArr.length)];
  }
  return hexCode;
};
// HTML Tag Creator -------
function createElements(tag, className, id) {
  const el = document.createElement(tag);
  el.setAttribute("class", className);
  el.setAttribute("id", id);
  return el;
}
// Color Bar Creator -------
function createColorBar() {
  const colorBarDiv = createElements("div", "color-bar", "color-bar");
  const icons = createElements("div", "color-bar__icons");
  const hexText = createElements("span", "hex-color", "hex-color");
  const label = createElements("label");
  const colorIcon = createElements("i", "fas fa-sliders-h");
  const colorPicker = createElements("input", "color-picker", "color-picker");
  const bin = createElements("i", "fas fa-trash-alt delete", "bin");
  const sliceColor = hexColor.innerText.slice(1);

  colorBarDiv.style.backgroundColor = colorBar.style.backgroundColor;
  colorBarDiv.style.color = getContrastYIQ(sliceColor);
  hexText.innerText = hexColor.innerText;

  colorBarDiv.appendChild(hexText);
  colorBarDiv.appendChild(icons);
  label.appendChild(colorPicker);
  icons.appendChild(label);
  icons.appendChild(bin);
  label.appendChild(colorIcon);

  return colorBarDiv;
}
// Color Bar Adding Function -------
function Add() {
  const createdColorBar = createColorBar();
  main.insertBefore(createdColorBar, colorBar);
  colorPicker = document.querySelectorAll(".color-picker");
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("color-picker")) {
      e.target.addEventListener("input", updateColor);
      console.log(e.target);
    }
  });
  if (main.childElementCount === 5) {
    btnAdd.removeEventListener("click", Add);
  }
}
// Color Assignment Function -------
function colorAssign() {
  const colorCode = randomColorCode();
  const textColor = colorCode.slice(1);
  hexColor.innerText = colorCode;
  colorBar.style.backgroundColor = colorCode;
  colorBar.style.color = getContrastYIQ(textColor);
}
// for Color Picker -------
function updateColor(event) {
  colorBar.style.backgroundColor = event.target.value;
  let upperHex = event.target.value;
  hexColor.innerText = upperHex.toUpperCase();
}
// Transactions
window.onload = colorAssign();

btnGenerate.addEventListener("click", colorAssign);

btnAdd.addEventListener("click", Add);

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    btnAdd.addEventListener("click", Add);
  }
});
// main.addEventListener("click", (e) => {
//   if (e.target.classList.contains("color-picker")) {
//     // e.target.addEventListener("input", updateColor, false);
//     console.log("DONE");
//   }
// });
colorPicker.forEach((e) => {
  e.addEventListener("input", updateColor);
});
