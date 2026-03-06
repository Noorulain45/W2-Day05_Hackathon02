document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("../data.json"); 
    const data = await response.json();
    const quizTypes = Object.keys(data.quizzes);

    const quizButtonsContainer = document.getElementById("quizButtons");

 
    quizTypes.forEach((type) => {
      const btn = document.createElement("button");
      btn.innerText = capitalize(type);
      btn.className = "bg-gray-200 rounded-md w-24 h-8 hover:bg-gray-300";
      btn.onclick = () => selectQuiz(type, data.quizzes[type]);
      quizButtonsContainer.appendChild(btn);
    });


    const categoryMap = {
      gk: "general",
      science: "science",
      history: "history",
      literature: "literature",
      mathematics: "mathematics"
    };

    Object.keys(categoryMap).forEach((id) => {
      const div = document.getElementById(id);
      if (div) {
        div.classList.add("cursor-pointer", "hover:bg-gray-100", "p-2", "rounded-md");
        div.addEventListener("click", () => {
          const quizType = categoryMap[id];
          if (data.quizzes[quizType]) {
            selectQuiz(quizType, data.quizzes[quizType]);
          } else {
            console.error(`Quiz data not found for type: ${quizType}`);
          }
        });
      }
    });

  } catch (error) {
    console.error("Error fetching quizzes:", error);
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function selectQuiz(type, quizData) {
  localStorage.setItem("selectedQuiz", type);
  localStorage.setItem("quizData", JSON.stringify(quizData));
  window.location.href = "quizScreen.html";
}
