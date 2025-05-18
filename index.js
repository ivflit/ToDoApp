const todo_list = document.getElementById("todo-list");
const submit_button = document.getElementById("submit_button");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Restore tasks from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
    todos.forEach(todo => renderTodoItem(todo));
    updateCounter();
});

submit_button.addEventListener("click", function (event) {
    event.preventDefault();
    const input = document.getElementById("todo-input");
    const text = input.value.trim();
    if (text === "") return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodoItem(newTodo);
    updateCounter();
    input.value = "";
});

function renderTodoItem(todo) {
    const new_item = document.createElement("li");
    new_item.className = "todo-item";
    new_item.id = `todo-item-${todo.id}`;
    if (todo.completed) new_item.classList.add("completed");

    const task_text = document.createElement("span");
    task_text.className = "todo-text";
    task_text.innerText = todo.text;

    const completed_button = document.createElement("button");
    completed_button.innerText = "✓";
    completed_button.className = "completed-button";
    completed_button.addEventListener("click", function () {
        todo.completed = !todo.completed;
        new_item.classList.toggle("completed");
        saveTodos();
        updateCounter();
    });

    const delete_button = document.createElement("button");
    delete_button.innerText = "X";
    delete_button.className = "delete-button";
    delete_button.addEventListener("click", function () {
        todos = todos.filter(t => t.id !== todo.id);
        todo_list.removeChild(new_item);
        saveTodos();
        updateCounter();
    });

    const edit_button = document.createElement("button");
    edit_button.innerText = "Edit";
    edit_button.className = "edit-button";
    edit_button.addEventListener("click", function () {
        const newText = prompt("Edit your todo item:", todo.text);
        if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            task_text.innerText = todo.text;
            saveTodos();
        }
    });

    new_item.appendChild(task_text);
    new_item.appendChild(completed_button);
    new_item.appendChild(delete_button);
    new_item.appendChild(edit_button);
    todo_list.appendChild(new_item);
}

// Counter
const counter = document.createElement("div");
counter.id = "counter";
counter.innerText = "complete / total items: 0 / 0";
document.body.appendChild(counter);

function updateCounter() {
    const completed = todos.filter(t => t.completed).length;
    counter.innerText = `complete / total items: ${completed} / ${todos.length}`;
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Filter
document.getElementById("filter-all").addEventListener("click", () => {
    filterTasks("all");
});
document.getElementById("filter-completed").addEventListener("click", () => {
    filterTasks("completed");
});
document.getElementById("filter-incomplete").addEventListener("click", () => {
    filterTasks("incomplete");
});

function filterTasks(filter) {
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach(item => {
        const isCompleted = item.classList.contains("completed");
        if (filter === "all") {
            item.style.display = "block";
        } else if (filter === "completed" && isCompleted) {
            item.style.display = "block";
        } else if (filter === "incomplete" && !isCompleted) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
