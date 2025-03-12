
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue, remove } from"https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyAqHajlfQfkKuvRy0OxtHTQWHr_YnUu2DI",
  authDomain: "auth-app-149ba.firebaseapp.com",
  databaseURL: "https://auth-app-149ba-default-rtdb.firebaseio.com",
  projectId: "auth-app-149ba",
  storageBucket: "auth-app-149ba.firebasestorage.app",
  messagingSenderId: "609188439323",
  appId: "1:609188439323:web:9c604e04aec77b8f3b1fbe",
  measurementId: "G-MRZ0QHFWCW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const taskInput=document.getElementById("taskInput");
const taskList=document.getElementById("taskList");

window.addTask = () => {
    let task = taskInput.value.trim();
    if (task) push(ref(db, "tasks"), task);
    taskInput.value = "";
    };
    onValue(ref(db, "tasks"), (snapshot) => {
    taskList.innerHTML = "";
    let tasks = snapshot.val();
    if (!tasks) return;
    let keys = Object.keys(tasks);
    for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let li = document.createElement("li");
    let btn = document.createElement("button");
    li.textContent = tasks[key];
    btn.textContent = "Delete";
    btn.onclick = () => remove(ref(db, "tasks/" + key));
    li.appendChild(btn);
    taskList.appendChild(li);
    }
    });