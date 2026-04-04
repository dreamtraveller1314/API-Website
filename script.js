const btn = document.getElementById("submitBtn");
const input = document.getElementById("questionInput");
const answerBox = document.getElementById("answerBox");
const explanationBox = document.getElementById("explanationBox");

btn.addEventListener("click", async function() {
  const question = input.value.trim();
  if (!question) {
    answerBox.textContent = "Type first....";
    return;
  }

  answerBox.textContent = "Consulting the book...";
  btn.disabled = true;

  const abRes = await fetch("https://answerbook.david888.com/answers?lang=en");
  const abData = await abRes.json();
  const answer = abData.answer;
  answerBox.textContent = answer;


  const prompt = `You are a friendly Answer Book Analyst. 
  User is asking the question ${question} and the answer from the answer book will be ${answer}. 
  Please analyze the question and answer, and generate a reasonable explanation on what answer book trying to say.`;
  
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch("https://financial-planner-api-fzgg.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
      signal: controller.signal
    });
    clearTimeout(timeout);
    const data = await response.json();
    const explanation = data.explanation;
    console.log('AI Prompt:', prompt);
    console.log('AI Explanation:', data.explanation);
    explanationBox.textContent = explanation;

    } finally {
      btn.disabled = false;
    }
});