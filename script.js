const form = document.querySelector(".form");
const todoInput = document.querySelector(".todo--input");
const container = document.querySelector(".todos--container");

////////////////////////////

let todos = [];

/////UI UPDATION
const updateUI = (todos) => {
  container.innerHTML = " ";
  todos.forEach((todo) => {
    const html = `
    <p class="todo--data">${todo.text}</p>
    <div class="button--box">
    <button class="done buttons">✅</button>
    <button class="delete buttons">❌</button>
    <button class="edit buttons">📝</button>
    </div>`;
    const todoElement = document.createElement("div");
    todoElement.innerHTML = html;
    container.appendChild(todoElement);
    todoElement.classList.add(`todo--row`, "active", `todo--row-${todo.id}`);
    todoElement.setAttribute("data-taskNo", todo.id);
  });
  methods();
};

const methods = () => {
  container.addEventListener("click", (e) => {
    e.preventDefault();
    const taskId = e.target.closest(".todo--row").getAttribute("data-taskNo");
    if (e.target.classList.contains("done")) {
      const element = e.target.closest(".todo--row");
      element.firstElementChild.style.textDecoration = "line-through";
    }
    if (e.target.classList.contains("delete")) {
      todos = todos.filter((todo) => todo.id !== taskId);
      localStorage.setItem("data", todos)
      updateUI(todos);
    }
    if (e.target.classList.contains("edit")) {
      console.log(e.target);
      todoInput.focus();
      let newValue = todoInput.value;
      todos = todos.map((todo) =>
        todo.id === taskId ? { ...todo, text: newValue } : todo
      );
      localStorage.setItem("data", JSON.stringify(todos));
    }
  });
};

///WHEN PAGE LOADS
const intialLoad = () => {
  const storedData = localStorage.getItem("data");
  if (storedData) {
    todos = JSON.parse(storedData);
    updateUI(todos);
  }
};

////ON FORM SUBMISSION
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoData = todoInput.value;
  if (!todoData) {
    alert("No TODO");
  } else {
    const taskId = Date.now().toString(); // Generate a unique identifier
    const newTodo = { id: taskId, text: todoData.trim(), completed : false};
    todos.push(newTodo);
    localStorage.setItem("data", JSON.stringify(todos));
    updateUI(todos);
    todoInput.value = " ";
  }
});

intialLoad();
