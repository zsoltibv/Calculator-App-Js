const numberButtons = document.querySelectorAll("[data-number]");

numberButtons.forEach((button) => {
  console.log(button.innerHTML);  
  button.addEventListener("click", () => {
    console.log(button.innerHTML);
  });
});
