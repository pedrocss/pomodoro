var pomodoro = new Pomodoro();
var taskList = new TaskList();

// Page Elements
var htmlTimer = document.getElementById('remaining_time');
var startButton = document.getElementById('start_button');
var taskInput = document.getElementById('task_description');
var taskListHTML = document.getElementById('task_list');

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
    pomodoro.timer.onTicTac = changeHTMLTimer;
    pomodoro.start();
};

// Creates new task with text input value and clears the input text, when pressing Enter
taskInput.onkeypress = function(e) {
    if (e.keyCode == 13) {
        var task = taskList.createTask(taskInput.value);

        task.onFinish = function(task){
          task.dom_element.parentNode.removeChild(task.dom_element);
        };

        taskInput.value = "";

        e.preventDefault();
    }
}

// Adds task item into task list.
taskList.onCreateTask = function(task){
    task.dom_element = createTaskListItem(task);
    taskListHTML.insertBefore(task.dom_element, taskListHTML.childNodes[0]);
}

// Removes task item from task list.
taskList.onRemoveTask = function(task){
    task.dom_element.parentNode.removeChild(task.dom_element);
}

// Creates task item (DOM Element) and sets 'onclick' event in anchor to remove task.
var createTaskListItem = function(task){
    var new_task_li = document.createElement("li");
    new_task_li.className = "cf";

    var task_description_paragraph = document.createElement("p");
    task_description_paragraph.innerHTML = task.description;

    var remove_task_anchor = document.createElement("a");
    remove_task_anchor.className = "remove";
    remove_task_anchor.innerHTML = "&#215;";

    var finish_task_anchor = document.createElement("a");
    finish_task_anchor.className = "finish";
    finish_task_anchor.innerHTML = "&#10003;";

    new_task_li.appendChild(task_description_paragraph);
    new_task_li.appendChild(remove_task_anchor);
    new_task_li.appendChild(finish_task_anchor);

    remove_task_anchor.onclick = function() {
        taskList.removeTask(task);
    }

    finish_task_anchor.onclick = function() {
        task.finish();
    }

    return new_task_li;
}
