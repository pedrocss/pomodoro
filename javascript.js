// Refresh timer in view
var htmlTimer = document.getElementById('timer').getElementsByTagName("div")[0];

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

// Start timer when click in start button
var button = document.getElementById('timer').getElementsByTagName("input")[0];
var pomodoroTimer = new PomodoroTimer();

button.onclick = function() {
    pomodoroTimer.onTicTac = changeHTMLTimer;
    pomodoroTimer.start();
};

// Activities
var taskInput = document.getElementById('tasks').getElementsByTagName("input")[0];
var taskList = document.getElementById('tasks').getElementsByTagName("ul")[0];

taskInput.onkeypress = function(e) {
    // Insert new task when press Enter key and set event to delete when clicking in anchor with "x"
    if (e.keyCode == 13) {
        taskList.innerHTML = "<li class='cf'><p>" + taskInput.value + "</p><a>&#215;</a></li>" + taskList.innerHTML;
        taskInput.value = "";

        deleteTaskLinks = taskList.getElementsByTagName("a");

        for (var i in deleteTaskLinks){
            deleteTaskLinks[i].onclick = function() {
                this.parentNode.parentNode.removeChild(this.parentNode);
            };
        }
    }
}
