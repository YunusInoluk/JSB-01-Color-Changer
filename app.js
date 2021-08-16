const hexColor = document.getElementById("hex-color");
const bin = document.querySelectorAll(".delete");
const btnGenerate = document.getElementById("btn-generate");
const btnAdd = document.getElementById("btn-add");
const colorBar = document.getElementById("color-bar");
const main = document.getElementById("main");
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
const randomColorCode = () => {
  let hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode += codeGenArr[Math.floor(Math.random() * codeGenArr.length)];
  }
  return hexCode;
};
window.onload = () => {
  const colorCode = randomColorCode();
  hexColor.innerText = colorCode;
  colorBar.style.backgroundColor = colorCode;
};
btnGenerate.addEventListener("click", () => {
  const colorCode = randomColorCode();
  hexColor.innerText = colorCode;
  colorBar.style.backgroundColor = colorCode;
});
btnAdd.addEventListener("click", () => {
  const colorBarContent = `<div class="color-bar" style="background-color:${hexColor.innerText}">
  <span class="hex-color">
    ${hexColor.innerText}
  </span>
  <div class="color-bar__icons">
    <label for="color-picker">
      <i class="fas fa-sliders-h"></i>
      <input type="color" id="color-picker" />
    </label>
    <i class="fas fa-trash-alt delete"></i>
  </div>
  </div>
`;
  const newColorBar = document
    .createRange()
    .createContextualFragment(colorBarContent);
  main.insertBefore(newColorBar, colorBar);
});

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
});
