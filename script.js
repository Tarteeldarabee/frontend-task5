// Search functionality
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    let filter = searchInput.value.toLowerCase();
    let names = document.querySelectorAll("#nameList li");
    names.forEach(name => {
      name.style.display = name.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
  });
}

// Fetch Random User
const getUserBtn = document.getElementById("getUserBtn");
const getAnotherBtn = document.getElementById("getAnotherBtn");
const userContainer = document.getElementById("userContainer");

async function fetchUser() {
  try {
    const res = await fetch("https://randomuser.me/api/");
    const data = await res.json();
    const user = data.results[0];

    userContainer.innerHTML = `
      <div class="user-info fade-in">
        <img src="${user.picture.large}" alt="${user.name.first}">
        <h3>${user.name.first} ${user.name.last}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
      </div>
    `;
  } catch (error) {
    userContainer.innerHTML = "<p>Failed to load user data. Try again.</p>";
  }
}

if (getUserBtn) {
  getUserBtn.addEventListener("click", () => {
    fetchUser();
    getUserBtn.style.display = "none";   // اخفاء زر Get User
    getAnotherBtn.style.display = "inline-block"; // اظهار زر Get Another User
  });
}

if (getAnotherBtn) {
  getAnotherBtn.addEventListener("click", fetchUser);
}




// To-Do App
const addBtn = document.getElementById("addTaskBtn");
if (addBtn) {
  addBtn.addEventListener("click", () => {
    let input = document.getElementById("taskInput");
    if (input.value.trim() !== "") {
      let li = document.createElement("li");
      li.innerHTML = `${input.value} <button class="deleteBtn">Delete</button>`;
      document.getElementById("taskList").appendChild(li);
      input.value = "";

      li.querySelector(".deleteBtn").addEventListener("click", () => {
        li.remove();
      });
    }
  });
}
