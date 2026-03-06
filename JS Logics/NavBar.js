document.addEventListener("DOMContentLoaded", () => {
  const getStartedBtn = document.getElementById("getStarted");

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const icon = menuToggle ? menuToggle.querySelector("i") : null;
  const desktopMenu = document.getElementById("desktopMenu");
  const userControls = document.getElementById("userControls");

  const user = JSON.parse(localStorage.getItem("quiz_user"));
  const isLoggedIn = !!user;


const loggedOutLinks = `
  <li><a href="./index.html">Home</a></li>
  <li>
    <a href="./SignIn.html" 
       class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200">
       Sign In
    </a>
  </li>
  <li>
    <a href="./SignUp.html" 
       class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200">
       Sign Up
    </a>
  </li>
`;

  const loggedInLinks = `
    <li><a href="./index.html">Home</a></li>
    <li><a href="./QuizSelection.html">Quizzes</a></li>
    <li><a href="./MyProfile.html">Profile</a></li>
    <li><button id="logoutBtn" class="text-red-500">Logout</button></li>
  `;

  if (desktopMenu)
    desktopMenu.innerHTML = isLoggedIn ? loggedInLinks : loggedOutLinks;
  if (mobileMenu)
    mobileMenu.innerHTML = isLoggedIn ? loggedInLinks : loggedOutLinks;


  if (isLoggedIn && userControls) {
    userControls.innerHTML = `
      <div class="p-2 rounded-xl bg-[#F0F2F5]">
        <img src="./Assets/vectors/bell.png" alt="Notifications" />
      </div>
      <div class="rounded-full w-10 h-10 overflow-hidden">
        <a href="./MyProfile.html"><img src="./Assets/vectors/av2.png" alt="User Avatar" class="object-cover w-full h-full rounded-full"/></a>
      </div>
    `;
  } else if (userControls) {
    userControls.innerHTML = "";
  }

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
      }
    });
  }


  document.addEventListener("click", (e) => {
    if (e.target.id === "logoutBtn") {
      localStorage.removeItem("quiz_user");
      window.location.href = "SignIn.html";
    }
  });


  const protectedPages = [
    "quizSelection.html",
    "MyProfile.html",
  ];
  const currentPage = window.location.pathname.split("/").pop();

  if (protectedPages.includes(currentPage) && !isLoggedIn) {
    localStorage.setItem("redirectAfterLogin", currentPage);
    window.location.href = "SignIn.html";
  }
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", (event) => {
      event.preventDefault();

      if (isLoggedIn) {
        window.location.href = "./quizSelection.html";
      } else {
        window.location.href = "./SignUp.html";
      }
    });
  }
});
