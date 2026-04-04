const btn = document.getElementById("submitBtn");
const input = document.getElementById("questionInput");
const answerBox = document.getElementById("answerBox");

btn.addEventListener("click", function() {

  const question = input.value.trim();
  if (!question) {
    answerBox.textContent = "Type first....";
    return;
  }

  answerBox.textContent = "Consulting the book...";
  btn.disabled = true;

  fetch("https://answerbook.david888.com/answers?lang=en")
    .then(response => response.json())
    .then(data => {
      answerBox.textContent = data.answer;
      btn.disabled = false;
    })
});