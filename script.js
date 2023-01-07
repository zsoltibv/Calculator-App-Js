const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const stepBackButton = document.querySelector("[data-step-back]");
const clearButton = document.querySelector("[data-clear]");
const currentClearButton = document.querySelector("[data-current-clear]");
const resultPanel = document.getElementById("result");
const historyPanel = document.getElementById("history");
let possibleOperands = ["+", "-", "x", "/", "%"];
let previousOperation = 0;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultPanel.innerHTML == "0") {
      resultPanel.innerHTML = button.innerHTML;
    } else {
      if (previousOperation == 1) {
        resultPanel.innerHTML = "";
      }
      resultPanel.innerHTML += button.innerHTML;
      previousOperation = 0;
    }
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultPanel.innerHTML == "0") {
      resultPanel.innerHTML += button.innerHTML;
    } else {
      historyPanel.innerHTML += resultPanel.innerHTML;
      historyPanel.innerHTML += button.innerHTML;
      previousOperation = 1;
    }
  });
});

equalButton.addEventListener("click", () => {
  historyPanel.innerHTML += resultPanel.innerHTML;
  historyPanel.innerHTML += "=";
  let expression = historyPanel.innerHTML;
  let operands = findOperands(expression);
  let numbers = expression.split(/\+|\%|\x|\-|\//);

  console.log(operands);
  console.log(numbers);

  setResult(calculateResult(numbers, operands));
});

stepBackButton.addEventListener("click", () => {
  resultPanel.innerHTML = resultPanel.innerHTML.slice(0, -1);
});

clearButton.addEventListener("click", () => {
  resultPanel.innerHTML = "0";
  historyPanel.innerHTML = "";
});

currentClearButton.addEventListener("click", () => {
  resultPanel.innerHTML = "0";
});

function setResult(result) {
  resultPanel.innerHTML = result;
}

function findOperands(expression) {
  let operands = ["+"];
  for (const char in expression) {
    if (possibleOperands.includes(expression[char])) {
      operands.push(expression[char]);
    }
  }
  return operands;
}

function calculateResult(numbers, operands) {
  let sum = 0;
  for (i = 0; i < numbers.length; i++) {
    if (operands[i] === "+") {
      sum += parseFloat(numbers[i]);
    } else if (operands[i] === "-") {
      sum -= parseFloat(numbers[i]);
    } else if (operands[i] === "/") {
      sum /= parseFloat(numbers[i]);
    } else if (operands[i] === "x") {
      sum *= parseFloat(numbers[i]);
    } else if (operands[i] === "%") {
      sum %= parseFloat(numbers[i]);
      console.log(sum);
    }
  }
  return sum;
}
