var pomodoroTimer = new PomodoroTimer();

// Page Elements
var htmlTimer = document.getElementById('timer').getElementsByTagName("div")[0];
var startButton = document.getElementById('timer').getElementsByTagName("input")[0];
var taskInput = document.getElementById('tasks').getElementsByTagName("input")[0];
var taskList = document.getElementById('tasks').getElementsByTagName("ul")[0];

// Refresh pomodoro timer in view
var changeHTMLTimer = function(remainingTime) {
    var minutes = remainingTime.getMinutes();
    var seconds = remainingTime.getSeconds();

    minutes = formatNumber(minutes);
    seconds = formatNumber(seconds);

    htmlTimer.innerHTML = minutes + ":" + seconds;
}

// Hour number format. Ex.: 9 to 09; 0 to 00;
var formatNumber = function(number){
    if(number < 10 && number > 0) {
        number = "0" + number;
    }

    if(number === 0) {
        number = "00";
    }

    return number;
}

// Set function to refresh pomodoro timer and start timer
startButton.onclick = function() {
    pomodoroTimer.onTicTac = changeHTMLTimer;
    pomodoroTimer.start();
};

// Creates new task with text input value and clears the input text, when pressing Enter
taskInput.onkeypress = function(e) {
    if (e.keyCode == 13) {
        pomodoroTimer.createTask(taskInput.value);
        taskInput.value = "";
    }
}

// Adds task item into task list.
pomodoroTimer.onCreateTask = function(task){
    task.dom_element = createTaskListItem(task);
    taskList.insertBefore(task.dom_element, taskList.childNodes[0]);
}

// Removes task item from task list.
pomodoroTimer.onRemoveTask = function(task){
    task.dom_element.parentNode.removeChild(task.dom_element);
}

// Creates task item (DOM Element) and sets 'onclick' event in anchor to remove task.
var createTaskListItem = function(task){
    var new_task_li = document.createElement("li");
    new_task_li.className = "cf";

    var task_description_paragraph = document.createElement("p");
    task_description_paragraph.innerHTML = task.description;

    var delete_task_anchor = document.createElement("a");
    delete_task_anchor.innerHTML = "&#215;";

    new_task_li.appendChild(task_description_paragraph);
    new_task_li.appendChild(delete_task_anchor);

    delete_task_anchor.onclick = function() {
        pomodoroTimer.removeTask(task);
    }

    return new_task_li;
}
