const btn = document.getElementById("submitBtn");
const input = document.getElementById("questionInput");
const answerBox = document.getElementById("answerBox");
const explanationBox = document.getElementById("explanationBox");
const explanationText = document.getElementById("explanationText");

btn.addEventListener("click", async function () {
  const question = input.value.trim();
  if (!question) {
    answerBox.textContent = "Type first....";
    return;
  }

  answerBox.textContent = "Consulting the book...";
  explanationText.textContent = "";
  explanationBox.classList.remove("visible");
  btn.disabled = true;

  try {
    const abRes = await fetch("https://answerbook.david888.com/answers?lang=en");
    const abData = await abRes.json();
    const answer = abData.answer;
    animateAnswer(answer);
    const prompt = `You are a friendly Answer Book Analyst. 
    I am asking the question ${question} and the answer from the answer book will be ${answer}. 
    Please analyze the question and answer, and generate a reasonable explanation on what answer book trying to say.`;

    const response = await fetch("https://api-website-production-1f3b.up.railway.app/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    const explanation = data.explanation;
    console.log('AI Prompt:', prompt);
    console.log('AI Explanation:', explanation);
    explanationText.textContent = explanation;
    explanationBox.classList.add("visible");

  } catch (error) {
    console.error('Error:', error);
    explanationText.textContent = "Something went wrong. Try again!";
    explanationBox.classList.add("visible");

  } finally {
    btn.disabled = false;
  }
});
function animateAnswer(text) {
  answerBox.innerHTML = "";
  [...text].forEach((char, i) => {
    const span = document.createElement("span");
    span.classList.add("letter");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.animationDelay = `${i * 0.05}s`;

    answerBox.appendChild(span);
  });
}