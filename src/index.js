document.addEventListener("DOMContentLoaded", loadTasks);

const usernameInput = document.getElementById("username");
const saveUsernameBtn = document.getElementById("saveUsernameBtn");
const greeting = document.getElementById("greeting");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


saveUsernameBtn.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    if (username === "") {
        alert("Please enter your name!");
        return;
    }
    localStorage.setItem("username", username);
    displayGreeting(username);
});


function displayGreeting(username) {
    greeting.textContent = `Hello, ${username}! Here's your to-do list:`;
    usernameInput.value = "";
}


document.addEventListener("DOMContentLoaded", function () {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        displayGreeting(savedUsername);
    }
});


addTaskBtn.addEventListener("click", addTask);


function addTask() {
    const taskText = taskInput.value.trim();
    const taskDueDate = taskDate.value; 

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskText}</span> 
        <span class="date">${taskDueDate ? taskDueDate : "No due date"}</span>
        <button class="delete-btn">X</button>
    `;

    taskList.appendChild(taskItem);
    saveTask(taskText, taskDueDate);
    taskInput.value = "";
    taskDate.value = "";
}


function saveTask(task, date) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ task, date });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(({ task, date }) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task}</span>
            <span class="date">${date ? date : "No due date"}</span>
            <button class="delete-btn">X</button>
        `;
        taskList.appendChild(taskItem);
    });
}


taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        let taskText = e.target.parentElement.firstChild.textContent;
        e.target.parentElement.remove();
        deleteTask(taskText);
    }
});


function deleteTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t.task !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

