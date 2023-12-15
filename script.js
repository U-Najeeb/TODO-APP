const form = document.querySelector(".form");
const todoInput = document.querySelector(".todo--input");
const container = document.querySelector(".todos--container");

////////////////////////////

let todos = [];

/////UI UPDATION
const updateUI = (todos) => {
  container.innerHTML = " ";
  todos.forEach((todo, i) => {
    const html = `
    <p class="todo--data">${todo}</p>
    <div class="button--box">
    <button class="done buttons">✅</button>
    <button class="delete buttons">❌</button>
    <button class="edit buttons">📝</button>
    </div>`;
    const todoElement = document.createElement("div");
    todoElement.innerHTML = html;
    container.appendChild(todoElement);
    todoElement.classList.add(`todo--row`, "active", `todo--row-${i}`);
  });
  const todoDone = document.querySelector(".done");
  const todoDelete = document.querySelector(".delete");
  const todoEdit = document.querySelector(".edit");
  const buttonBox = document.querySelector(".button--box");
  const todoText = document.querySelector(".todo--data");
  const todoRows = document.querySelectorAll(".todo--row");
  const allButtons = document.querySelectorAll(".buttons");

  container.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("done")) {
      // e.preventDefault()
      const element = e.target.closest(".todo--row");
      element.firstElementChild.style.textDecoration = "line-through";
    } else if (e.target.classList.contains("delete")) {
      // e.preventDefault()
      const element = e.target.closest(".todo--row");
      const deleteText = element.firstElementChild.textContent;
      const newData = JSON.parse(localStorage.getItem("data"));
      const index = newData.indexOf(deleteText);
      if (index > -1) {
        newData.splice(index, 1);
      }

      localStorage.setItem("data", JSON.stringify(newData));
      if (newData.length === 0) {
        localStorage.removeItem("data");
      }
      updateUI(newData);
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
    todos.push(todoData.trim());
    localStorage.setItem("data", JSON.stringify(todos));
    updateUI(todos);
    todoInput.value = " ";
  }
});

intialLoad();
