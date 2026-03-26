document.addEventListener("DOMContentLoaded", () => {
  const questions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  const selectedAnswers =
    JSON.parse(localStorage.getItem("quizSelectedAnswers")) || [];

  const reviewContainer = document.getElementById("reviewContainer");

  if (questions.length === 0) {
    reviewContainer.innerHTML = "<p>No review data found.</p>";
    return;
  }

  questions.forEach((q, index) => {
    const isCorrect = selectedAnswers[index] === q.correctIndex;
    if (!isCorrect) {
      reviewContainer.innerHTML += `
            <div class="p-4 bg-[#F0F2F5] rounded-md">
              <div class="font-bold text-lg">Question ${index + 1}</div>
              <div class="mb-2">${q.question}</div>
              <div>Your answer: <span class="text-red-500">${
                q.options[selectedAnswers[index]] || "No answer"
              }</span></div>
              <div>Correct answer: <span class="text-green-600">${
                q.options[q.correctIndex]
              }</span></div>
            </div>
          `;
    }
  });
});
