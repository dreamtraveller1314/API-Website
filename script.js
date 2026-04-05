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
  
  try {
    const abRes = await fetch("https://answerbook.david888.com/answers?lang=en");
    const abData = await abRes.json();
    const answer = abData.answer;
    answerBox.textContent = answer;

    const prompt = `You are a friendly Answer Book Analyst. 
    I am asking the question ${question} and the answer from the answer book will be ${answer}. 
    Please analyze the question and answer, and generate a reasonable explanation on what answer book trying to say.`;

    const response = await fetch("api-website-production-1f3b.up.railway.app/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });
    
    const data = await response.json();
    const explanation = data.explanation;
    console.log('AI Prompt:', prompt);
    console.log('AI Explanation:', explanation);
    explanationBox.textContent = explanation;
  } catch (error) {
    console.error('Error:', error);
    explanationBox.textContent = "Wait 5 minutes and try again!";
  } finally {
    btn.disabled = false;
  }
});
