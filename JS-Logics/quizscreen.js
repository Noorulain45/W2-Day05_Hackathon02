let currentQuestionIndex = 0;
let selectedAnswers = [];
let questions = [];

let timer;
let timeLeft = 60;

document.addEventListener("DOMContentLoaded", () => {
  const quizData = JSON.parse(localStorage.getItem("quizData"));
  const selectedQuiz = localStorage.getItem("selectedQuiz");

  if (!quizData || !selectedQuiz) {
    document.getElementById("quizContainer").innerHTML =
      "<p>No quiz selected.</p>";
    return;
  }

  questions = quizData;
  renderQuestion();
});

function renderQuestion() {
  const container = document.getElementById("quizContainer");
  const question = questions[currentQuestionIndex];

  container.innerHTML = `
    <p class="text-[#61738A] text-sm mt-4">
      Question ${currentQuestionIndex + 1} of ${questions.length}
    </p>
    <p class="text-[28px] font-bold mt-4">${question.question}</p>

    ${question.options
      .map((opt, i) => {
        const inputId = `option-${currentQuestionIndex}-${i}`;
        const isSelected = selectedAnswers[currentQuestionIndex] == i;

        return `
          <label for="${inputId}" 
            onclick="handleOptionSelect(${i})"
            class="flex cursor-pointer border-2 md:w-[900px] h-14 gap-x-4 items-center px-4 rounded-xl mt-2
              ${
                isSelected
                  ? "border-gray-600 bg-gray-200"
                  : "border-gray-300 hover:bg-gray-100"
              }">
            <input type="radio" id="${inputId}" name="option" value="${i}" 
              ${isSelected ? "checked" : ""} class="hidden" />
            <p class="font-medium">${opt}</p>
          </label>
        `;
      })
      .join("")}

    <div class="mt-4 md:w-[900px] flex justify-between">
      <button onclick="goToPrevious()" class="bg-slate-300 px-3 py-1 rounded-md" 
        ${currentQuestionIndex === 0 ? "disabled" : ""}>Previous</button>
      <button onclick="goToNext()" class="bg-blue-600 px-5 py-1 rounded-md text-white">
        ${currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  `;

  updateProgressBar();
  startTimer();
}

function handleOptionSelect(optionIndex) {
  selectedAnswers[currentQuestionIndex] = optionIndex;

  document.querySelectorAll("#quizContainer label").forEach((label) => {
    label.classList.remove("border-gray-600", "bg-gray-200");
    label.classList.add("border-gray-300", "hover:bg-gray-100");
  });

  const selectedLabel = document.querySelector(
    `#option-${currentQuestionIndex}-${optionIndex}`
  ).parentElement;

  selectedLabel.classList.remove("border-gray-300", "hover:bg-gray-100");
  selectedLabel.classList.add("border-gray-600", "bg-gray-200");
}

function goToNext() {
  saveAnswer();
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  } else {
    calculateResult();
  }
}

function goToPrevious() {
  saveAnswer();
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

function saveAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    selectedAnswers[currentQuestionIndex] = parseInt(selected.value);
  }
}

function calculateResult() {
  clearInterval(timer);
  let score = 0;
  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.correctIndex) {
      score++;
    }
  });

  const percentage = Math.round((score / questions.length) * 100);

  const history = JSON.parse(localStorage.getItem("quiz_history")) || [];
  history.push({
    name: localStorage.getItem("selectedQuiz") || "Quiz",
    score: `${score}/${questions.length}`,
    percentage: percentage,
    date: new Date().toISOString().split("T")[0]
  });
  localStorage.setItem("quiz_history", JSON.stringify(history));

  localStorage.setItem("quizScore", score);
  localStorage.setItem("quizTotal", questions.length);
  localStorage.setItem("quizPercentage", percentage);
  localStorage.setItem("quizSelectedAnswers", JSON.stringify(selectedAnswers));
  localStorage.setItem("quizQuestions", JSON.stringify(questions));
  localStorage.setItem("quizSelectedName", localStorage.getItem("selectedQuiz") || "Quiz");

  window.location.href = "Results.html";
}


function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      goToNext();
    }
  }, 1000);
}

function updateTimerDisplay() {
  let minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  let seconds = String(timeLeft % 60).padStart(2, "0");

  document.querySelectorAll(".timer-box")[0].textContent = "00"; // Hours
  document.querySelectorAll(".timer-box")[1].textContent = minutes;
  document.querySelectorAll(".timer-box")[2].textContent = seconds;
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}
