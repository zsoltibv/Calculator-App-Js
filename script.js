const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const stepBackButton = document.querySelector("[data-step-back]");
const clearButton = document.querySelector("[data-clear]");
const resultPanel = document.getElementById("result");
let possibleOperands = ["+", "-"];

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    resultPanel.innerHTML += button.innerHTML;
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    resultPanel.innerHTML += button.innerHTML;
  });
});

equalButton.addEventListener("click", () => {
  let expression = resultPanel.innerHTML;
  let operands = findOperands(expression);
  let numbers = expression.split(/\+|\*|\-|\//);

  console.log(operands);
  console.log(numbers);

  let sum = parseInt(numbers[0]);
  for (i = 1; i < numbers.length; i++) {
    if (operands[i - 1] === "+") {
      sum += parseInt(numbers[i]);
    } else if (operands[i - 1] === "-") {
      sum -= parseInt(numbers[i]);
    }
  }
  setResult(sum);
});

stepBackButton.addEventListener("click", () => {
  resultPanel.innerHTML = resultPanel.innerHTML.slice(0, -1);
});

clearButton.addEventListener("click", () => {
  resultPanel.innerHTML = " ";
});

function setResult(result) {
  resultPanel.innerHTML = result;
}

function findOperands(expression) {
  let operands = [];
  for (const char in expression) {
    if (possibleOperands.includes(expression[char])) {
      operands.push(expression[char]);
    }
  }
  return operands;
}
