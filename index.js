let shouldResetScreen = false;
let keyDown = null;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const allClearBtn = document.getElementById("allClear");
const clearBtn = document.getElementById("Escape");
const backBtn = document.getElementById("Backspace");
const reversalBtn = document.getElementById("reversal");
const pointBtn = document.getElementById("point");
const getAnswerBtn = document.getElementById("Enter");
const numListScreen = document.getElementById("numList");
const answerScreen = document.getElementById("answer");

window.addEventListener("keydown", handleKeyboardInput);
window.addEventListener("keyup", handleKeyActionClear);

function handleKeyActionClear() {
  if (keyDown) {
    keyDown.style.boxShadow = "";
  }
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
    setKeyAction(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    appendOperator(convertLabel(e.key));
    setKeyAction(e.key);
  } else if (e.key === "=" || e.key === "Enter") {
    getAnswer();
    setKeyAction("Enter");
  } else if (e.key === "Escape") {
    clear();
    setKeyAction(e.key);
  } else if (e.key === "Backspace") {
    setKeyAction(e.key);
  } else if (e.key === ".") {
    appendPoint(e.key);
    setKeyAction("point");
  }
}

function convertLabel(key) {
  if (key === "*") return "×";
  if (key === "/") return "÷";
}

function appendNumber(num) {
  answerScreen.textContent += num;
}

function appendOperator(key) {
  numListScreen.textContent = answerScreen.textContent + " " + key;
}

function getAnswer() {}

function clear() {
  answerScreen.textContent = "";
  numListScreen.textContent = "";
}

function appendPoint(key) {
  answerScreen.textContent += key;
}

function setKeyAction(str) {
  keyDown = document.getElementById(str);
  keyDown.style.boxShadow =
    "rgb(0 0 0 / 34%) 2px 2px 4px, inset rgb(0 0 0 / 34%) 0 0 6px 1px";
}
