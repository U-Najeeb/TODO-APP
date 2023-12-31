const form = document.querySelector(".form");
const todoInput = document.querySelector(".todo--input");
const container = document.querySelector(".todos--container");

let todos = [];

const updateUI = (todos) => {
  container.innerHTML = "";
  todos.forEach((todo, i) => {
    const html = `
      <input type="text" name="data" class="todo-text" value="${todo.text}" ${
      todo.completed ? 'style="text-decoration: line-through;"' : ""
    } disabled>
      <div class="button--box">
        <button class="done buttons">✅</button>
        <button class="delete buttons">❌</button>
        <button class="edit buttons">📝</button>
      </div>`;
    const todoElement = document.createElement("div");
    todoElement.innerHTML = html;
    container.appendChild(todoElement);
    todoElement.classList.add(`todo--row`, "active");
    todoElement.setAttribute("task-no", todo.id);
  });
  methods();
};

const methods = () => {
  container.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("done")) {
      const element = e.target.closest(".todo--row");
      const tickedEle = element.firstElementChild;
      const taskId = element.getAttribute("task-no");
      const data = JSON.parse(localStorage.getItem("data"));
      const task = data.find((task) => task.id === taskId);
      if (task) {
        task.completed = true;
        tickedEle.style.textDecoration = "line-through";
        localStorage.setItem("data", JSON.stringify(data))
      }
    }

    if (e.target.classList.contains("delete")) {
      const element = e.target.closest(".todo--row");
      const taskId = element.getAttribute("task-no");
      todos = todos.filter((todo) => todo.id !== taskId);
      localStorage.setItem("data", JSON.stringify(todos));
      if (todos.length === 0) {
        localStorage.removeItem("data");
      }
      updateUI(todos);
    }

    if (e.target.classList.contains("edit")) {
      const element = e.target.closest(".todo--row");
      const editElement = element.querySelector(".todo-text");
      const taskId = element.getAttribute("task-no");
      const data = JSON.parse(localStorage.getItem("data"));
      const task = data.find((task) => task.id === taskId);
      if (task) {
        editElement.value = " ";
        editElement.removeAttribute("disabled");
        editElement.focus();
        editElement.addEventListener("blur", () => {
          task.text = editElement.value.trim();
          localStorage.setItem("data", JSON.stringify(data));
          updateUI(data);
        });
      }
    }
  });
};

const intialLoad = () => {
  const storedData = localStorage.getItem("data");
  if (storedData) {
    todos = JSON.parse(storedData);
    updateUI(todos);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoData = todoInput.value;
  if (!todoData) {
    alert("No TODO");
  } else {
    const taskId = Math.trunc(Date.now() + Math.random()).toString();
    const newTodo = { id: taskId, text: todoData.trim(), completed: false };
    todos.push(newTodo);
    localStorage.setItem("data", JSON.stringify(todos));
    updateUI(todos);
    todoInput.value = "";
  }
});

intialLoad();
