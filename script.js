const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const advancedOperationButtons = document.querySelectorAll("[data-operation-advanced]");
const equalButton = document.querySelector("[data-equals]");
const stepBackButton = document.querySelector("[data-step-back]");
const clearButton = document.querySelector("[data-clear]");
const currentClearButton = document.querySelector("[data-current-clear]");
const resultPanel = document.getElementById("result");
const operationPanel = document.getElementById("history");
let possibleOperands = ["+", "-", "x", "/", "%"];
let overwriteResultPanel = 0; // overwrite result panel after operator is pressed
let nrOfEqualOperands = 0;

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (resultPanel.innerHTML == "0" && button.innerHTML != ".") {
      resultPanel.innerHTML = button.innerHTML;
    } else {
      if (overwriteResultPanel == 1) {
        resultPanel.innerHTML = "";
      }
      resultPanel.innerHTML += button.innerHTML;
      overwriteResultPanel = 0;
    }
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    deletePreviousEquationFromOperationPanel();
    if (resultPanel.innerHTML == "0") {
      resultPanel.innerHTML += button.innerHTML;
    } else {
      operationPanel.innerHTML += resultPanel.innerHTML;
      operationPanel.innerHTML += button.innerHTML;
      overwriteResultPanel = 1;
    }
  });
});

equalButton.addEventListener("click", () => {
  operationPanel.innerHTML += resultPanel.innerHTML;
  operationPanel.innerHTML += "=";

  let expression = operationPanel.innerHTML;
  let operands = findOperands(expression);
  let numbers = expression.split(/\+|\=|\%|\x|\-|\//);
  numbers = numbers.filter(deleteEmptyValuesFromArray);
  //insert 0 if number starts with - sign
  if (numbers[0] == "") {
    numbers[0] = "0";
  }

  console.log(operands);
  console.log(numbers);

  setResult(calculateResult(numbers, operands));
});

stepBackButton.addEventListener("click", () => {
  resultPanel.innerHTML = resultPanel.innerHTML.slice(0, -1);
});

clearButton.addEventListener("click", () => {
  resultPanel.innerHTML = "0";
  operationPanel.innerHTML = "";
});

currentClearButton.addEventListener("click", () => {
  resultPanel.innerHTML = "0";
});

function setResult(result) {
  resultPanel.innerHTML = result;
}

function findOperands(expression) {
  //set starting sign for first number(plus-minus)
  let operands = ["+"];
  if (expression[0] == "-") {
    operands = [];
  }
  for (const char in expression) {
    if (possibleOperands.includes(expression[char])) {
      operands.push(expression[char]);
    }
  }
  return operands;
}

function calculateResult(numbers, operands) {
  let sum = 0;
  //calculate multiplication and division first
  for (i = 0; i < numbers.length; i++) {
    if (operands[i] === "x") {
      numbers[i - 1] = numbers[i - 1] * numbers[i];
      operands.splice(i, 1);
      numbers.splice(i, 1);
    } else if (operands[i] === "/") {
      numbers[i - 1] = numbers[i - 1] / numbers[i];
      operands.splice(i, 1);
      numbers.splice(i, 1);
    }
  }
  //calculate the rest of the operation
  for (i = 0; i < numbers.length; i++) {
    if (operands[i] === "+") {
      sum += parseFloat(numbers[i]);
    } else if (operands[i] === "-") {
      sum -= parseFloat(numbers[i]);
    } else if (operands[i] === "%") {
      sum %= parseFloat(numbers[i]);
      console.log(sum);
    }
  }
  return sum;
}

function deletePreviousEquationFromOperationPanel() {
  for (i = 0; i < operationPanel.innerHTML.length; i++) {
    if (operationPanel.innerHTML[i] == "=") {
      operationPanel.innerHTML = operationPanel.innerHTML.slice(i + 1);
    }
  }
}

function deleteEmptyValuesFromArray(value) {
  return value != null && value !== false && value !== "";
}
