document.addEventListener("DOMContentLoaded", () => {
  const score = parseInt(localStorage.getItem("quizScore"));
  const total = parseInt(localStorage.getItem("quizTotal"));
  const quizName = localStorage.getItem("quizSelectedName") || "the quiz";

  if (!isNaN(score) && !isNaN(total) && total > 0) {
    const percentage = Math.round((score / total) * 100);
    document.getElementById("scoreText").textContent = `${score}/${total}`;
    document.getElementById("percentage").textContent = `${percentage}%`;
    document.getElementById("progressFill").style.width = `${percentage}%`;

    let message = `You completed ${quizName} with a score of ${score} out of ${total}. `;
    if (percentage >= 80) {
      message += "Excellent work! You really know your stuff.";
    } else if (percentage >= 50) {
      message += "Good effort! A little more practice and you’ll nail it.";
    } else {
      message += "Don't worry! Keep practicing and you'll improve.";
    }
    document.getElementById("message").textContent = message;
  } else {
    document.getElementById("scoreText").textContent = "0/0";
    document.getElementById("percentage").textContent = "0%";
    document.getElementById("progressFill").style.width = "0%";
    document.getElementById("message").textContent = "No quiz results found.";
  }
});


function reviewAnswers() {
  window.location.href = "review.html"; // <-- Changed from quizScreen.html
}
