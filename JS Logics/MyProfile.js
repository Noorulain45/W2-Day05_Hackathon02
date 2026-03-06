document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("quiz_user"));
  const history = JSON.parse(localStorage.getItem("quiz_history")) || [];


  if (user) {
   document.querySelector(".profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;

    document.getElementById("profileBio").textContent =
      user.bio || "Always up for a challenge!";
  }

  const tbody = document.getElementById("quizHistoryTable");
  tbody.innerHTML = "";
  if (history.length > 0) {
    history.forEach((quiz) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="p-3">${quiz.name}</td>
        <td class="p-3">${quiz.score}</td>
        <td class="p-3">${quiz.date}</td>
      `;
      tbody.appendChild(tr);
    });
  } else {
    tbody.innerHTML = `<tr><td colspan="3" class="p-3 text-center text-gray-500">No quiz history found</td></tr>`;
  }
});
