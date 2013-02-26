var PomodoroTimer = {
    endTime: 0,
    timerId: 0,

    start: function() {
        date = new Date();
        endTime = date.getTime() + (25 * 60 * 1000); // Current Time + 25 minutes (Pomodoro time)

        timerId = setInterval(this.refreshTimer, 1000);
    },

    refreshTimer: function() {
        date = new Date();
        remainingTime = new Date(this.endTime - date.getTime());

        if(remainingTime <= 0) {
            clearInterval(this.timerId);

            return false;
        }

        changeHTMLTimer(remainingTime);
    }
}

var htmlTimer = document.getElementById('timer').getElementsByTagName("div")[0];

var changeHTMLTimer = function(remainingTime) {
    var minutes = remainingTime.getMinutes();
    var seconds = remainingTime.getSeconds();

    minutes = formatNumber(minutes);
    seconds = formatNumber(seconds);

    htmlTimer.innerHTML = minutes + ":" + seconds;
}

var formatNumber = function(number){
    if(number < 10 && number > 0) {
        number = "0" + number;
    }

    if(number === 0) {
        number = "00";
    }

    return number;
}

// Start button
var button = document.getElementById('timer').getElementsByTagName("input")[0];

button.onclick = function() {
    PomodoroTimer.start();
};

var activityInput = document.getElementById('activities').getElementsByTagName("input")[0];
var activityList = document.getElementById('activities').getElementsByTagName("ul")[0];

activityInput.onkeypress = function(e) {
    // Enter key
    if (e.keyCode == 13) {
        activityList.innerHTML = "<li class='cf'><p>" + activityInput.value + "</p><a>&#215;</a></li>" + activityList.innerHTML;
        activityInput.value = "";

        deleteLinks = activityList.getElementsByTagName("a");

        deleteLinks[0].onclick = function() {
            this.parentNode.parentNode.removeChild(this.parentNode);
        };
    }
}
