let isResetScreen = false;
let isChangeType = false;
let keyDown = null;
let currentOperator = null;
let currentList = null;
let currentAnswer = 0;
let changeNumber = 0;

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

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => appendOperator(button.textContent))
);

reversalBtn.addEventListener("click", () => reversalNumber());

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
    deleteNumber();
    setKeyAction(e.key);
  } else if (e.key === ".") {
    appendPoint(e.key);
    setKeyAction("point");
  }
}

function convertLabel(key) {
  if (key === "*") return "×";
  if (key === "/") return "÷";
  if (key === "-") return "-";
  if (key === "+") return "+";
}

function appendNumber(num) {
  if (answerScreen.textContent === "0" || isResetScreen) {
    resetScreen();
  }
  isChangeType = false;
  answerScreen.textContent += num;
}

function resetScreen() {
  answerScreen.textContent = "";
  isResetScreen = false;
}

function appendOperator(key) {
  if (!isChangeType) {
    if (numListScreen.textContent === "") {
      currentList = answerScreen.textContent;
      currentAnswer = Number(currentList);
    } else {
      currentList = numListScreen.textContent + " " + answerScreen.textContent;
      currentAnswer = operate(
        currentAnswer,
        currentOperator,
        Number(answerScreen.textContent)
      );
      answerScreen.textContent = String(currentAnswer);
    }
  }
  currentOperator = key;
  numListScreen.textContent = currentList + " " + key;
  isChangeType = true;
  isResetScreen = true;
}

function deleteNumber() {
  answerScreen.textContent = answerScreen.textContent.toString().slice(0, -1);
}

function getAnswer() {
  currentAnswer = operate(
    currentAnswer,
    currentOperator,
    Number(answerScreen.textContent)
  );
  answerScreen.textContent = String(currentAnswer);
  numListScreen.textContent = "";
}

function clear() {
  answerScreen.textContent = "0";
  numListScreen.textContent = "";
}

function appendPoint(key) {
  if (isResetScreen) resetScreen();
  if (answerScreen.textContent === "") answerScreen.textContent = "0";
  if (answerScreen.textContent.includes(".")) return;
  answerScreen.textContent += key;
}

function setKeyAction(str) {
  keyDown = document.getElementById(str);
  keyDown.style.boxShadow =
    "rgb(0 0 0 / 34%) 2px 2px 4px, inset rgb(0 0 0 / 34%) 0 0 6px 1px";
}

function reversalNumber() {
  if (answerScreen.textContent.includes("-")) {
    answerScreen.textContent = answerScreen.textContent.slice(1);
  } else if (answerScreen.textContent !== "0") {
    answerScreen.textContent = "-" + answerScreen.textContent;
  }
  isChangeType = false;
}

function operate(a, op, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      break;
  }
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
