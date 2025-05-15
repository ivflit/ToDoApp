const submit_button = document.getElementById("submit_button");

submit_button.addEventListener("click", function(event) {
    event.preventDefault();

    const todo_list = document.getElementById("todo-list");

    // New item creation
    const new_item = document.createElement("li");
    new_item.className = "todo-item";
    new_item.id = "todo-item-" + (todo_list.children.length + 1);

    // Create a span to hold the task text
    const task_text = document.createElement("span");
    task_text.className = "todo-text";
    task_text.innerText = document.getElementById("todo-input").value;

    // Create delete button on new item
    const delete_button = document.createElement("button");
    delete_button.innerText = "X";
    delete_button.className = "delete-button";
    delete_button.addEventListener("click", function() {
        todo_list.removeChild(new_item);
        updateCounter();
    });

    // Create completed button on new item
    const completed_button = document.createElement("button");
    completed_button.innerText = "✓";
    completed_button.className = "completed-button";
    completed_button.addEventListener("click", function() {
        new_item.classList.toggle("completed");
        updateCounter();
    });

    // Create edit button on new item
    const edit_button = document.createElement("button");
    edit_button.innerText = "Edit";
    edit_button.className = "edit-button";
    edit_button.addEventListener("click", function() {
        const newText = prompt("Edit your todo item:", task_text.innerText);
        if (newText !== null && newText.trim() !== "") {
            task_text.innerText = newText;
        }
    });

    // Append elements to the new item
    new_item.appendChild(task_text);
    new_item.appendChild(completed_button);
    new_item.appendChild(delete_button);
    new_item.appendChild(edit_button);

    // Add the new item to the list
    todo_list.appendChild(new_item);
    updateCounter();
});

// Counter setup
const counter = document.createElement("div");
counter.id = "counter";
counter.innerText = "complete / total items: 0 / 0";
document.body.appendChild(counter);

// Counter update function
const updateCounter = () => {
    const totalItems = document.getElementById("todo-list").children.length;
    const completedItems = document.querySelectorAll(".todo-item.completed").length;
    counter.innerText = `complete / total items: ${completedItems} / ${totalItems}`;
};

document.getElementById("filter-all").addEventListener("click", () => {
    filterTasks("all");
});
document.getElementById("filter-completed").addEventListener("click", () => {
    filterTasks("completed");
});
document.getElementById("filter-incomplete").addEventListener("click", () => {
    filterTasks("incomplete");
});

//Filter function
const filterTasks = (filter) => {
    const todoItems = document.querySelectorAll(".todo-item");
    todoItems.forEach(item => {
        if (filter === "all") {
            item.style.display = "block";
        } else if (filter === "completed" && item.classList.contains("completed")) {
            item.style.display = "block";
        } else if (filter === "incomplete" && !item.classList.contains("completed")) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}