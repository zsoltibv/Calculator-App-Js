const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const resultPanel = document.getElementById("result-panel");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.innerHTML);
    resultPanel.innerHTML += button.innerHTML;
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    resultPanel.innerHTML += button.innerHTML;
  });
});

equalButton.addEventListener("click", () => {
  let numbers = resultPanel.innerHTML.split("+");
  let sum = 0;
  for (const number in numbers) {
    sum += parseInt(numbers[number]);
  }
  setResult(sum);
});

deleteButton.addEventListener("click", () => {
  resultPanel.innerHTML = " ";
});

function setResult(result) {
  resultPanel.innerHTML = result;
}
