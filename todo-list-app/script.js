let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskName = document.getElementById("taskName");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addBtn = document.getElementById("addBtn");

const taskList = document.getElementById("taskList");

const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const pendingCount = document.getElementById("pendingCount");

const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");

let editIndex = -1;

renderTasks();

addBtn.addEventListener("click", function () {
  const name = taskName.value.trim();

  if (name === "") {
    alert("Enter Task Name");
    return;
  }

  const task = {
    name: name,
    priority: priority.value,
    dueDate: dueDate.value,
    completed: false,
  };

  if (editIndex === -1) {
    tasks.push(task);
  } else {
    task.completed = tasks[editIndex].completed;
    tasks[editIndex] = task;
    editIndex = -1;
    addBtn.innerText = "Add Task";
  }

  saveTasks();
  clearForm();
  renderTasks();
});

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  if (filter === "pending") {
    filteredTasks = tasks.filter((task) => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = "task-card";

    if (task.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
            <h3>${task.name}</h3>

            <p><b>Priority:</b> ${task.priority}</p>

            <p><b>Due Date:</b> ${task.dueDate || "-"}</p>

            <p><b>Status:</b> ${task.completed ? "Completed" : "Pending"}</p>

            <div class="task-actions">

                <button class="complete-btn"
                    onclick="toggleComplete(${tasks.indexOf(task)})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="edit-btn"
                    onclick="editTask(${tasks.indexOf(task)})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${tasks.indexOf(task)})">
                    Delete
                </button>

            </div>
        `;

    taskList.appendChild(card);
  });

  updateCounts();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  taskName.value = tasks[index].name;
  priority.value = tasks[index].priority;
  dueDate.value = tasks[index].dueDate;

  editIndex = index;

  addBtn.innerText = "Update Task";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;

  saveTasks();

  renderTasks();
}

function updateCounts() {
  totalCount.innerText = tasks.length;

  completedCount.innerText = tasks.filter((task) => task.completed).length;

  pendingCount.innerText = tasks.filter((task) => !task.completed).length;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearForm() {
  taskName.value = "";
  priority.value = "High";
  dueDate.value = "";
}

allBtn.addEventListener("click", function () {
  renderTasks("all");
});

completedBtn.addEventListener("click", function () {
  renderTasks("completed");
});

pendingBtn.addEventListener("click", function () {
  renderTasks("pending");
});
