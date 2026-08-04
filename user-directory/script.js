const userContainer = document.getElementById("userContainer");
const loading = document.getElementById("loading");
const search = document.getElementById("search");
const sortBtn = document.getElementById("sortBtn");

let users = [];

async function fetchUsers() {
  loading.innerText = "Loading users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    users = await response.json();

    loading.style.display = "none";

    displayUsers(users);
  } catch (error) {
    loading.innerText = "Failed to load users.";
  }
}

function displayUsers(data) {
  userContainer.innerHTML = "";

  data.forEach((user) => {
    userContainer.innerHTML += `
            <div class="card">
                <h2>${user.name}</h2>

                <p><b>Username:</b> ${user.username}</p>

                <p><b>Email:</b> ${user.email}</p>

                <p><b>Phone:</b> ${user.phone}</p>

                <p><b>Company:</b> ${user.company.name}</p>

                <p><b>City:</b> ${user.address.city}</p>
            </div>
        `;
  });
}

search.addEventListener("input", function () {
  const searchValue = search.value.toLowerCase().trim();

  const filteredUsers = users.filter(function (user) {
    return user.name.toLowerCase().includes(searchValue);
  });

  displayUsers(filteredUsers);
});

sortBtn.addEventListener("click", () => {
  users.sort((a, b) => a.name.localeCompare(b.name));

  displayUsers(users);
});

fetchUsers();
