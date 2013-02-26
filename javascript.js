function PomodoroTimer() {
  this.endTime = 0;
  var timerId = 0;

  this.remainingTime = function(){
    var date = new Date();
    remainingTime = new Date(this.endTime - date.getTime());

    return remainingTime;
  };

  var ticTac = function(timer) {
    var remainingTime = timer.remainingTime();

    if(remainingTime <= 0) { clearInterval(timerId) }

    if (typeof timer.onTicTac == "function") {
      timer.onTicTac(remainingTime);
    }
  };

  this.start = function() {
    var date = new Date();
    this.endTime = date.getTime() + (25 * 60 * 1000); // Current Time + 25 minutes (Pomodoro time)

    var timer = this;

    timerId = setInterval(function() { ticTac(timer) }, 1000);
  };
}

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
var pomodoroTimer;

button.onclick = function() {
    pomodoroTimer = new PomodoroTimer();
    pomodoroTimer.onTicTac = changeHTMLTimer;

    pomodoroTimer.start();
};

// Activities
var activityInput = document.getElementById('activities').getElementsByTagName("input")[0];
var activityList = document.getElementById('activities').getElementsByTagName("ul")[0];

activityInput.onkeypress = function(e) {
    // Insert new activity when press Enter key and set event to delete when clicking in anchor with "x"
    if (e.keyCode == 13) {
        activityList.innerHTML = "<li class='cf'><p>" + activityInput.value + "</p><a>&#215;</a></li>" + activityList.innerHTML;
        activityInput.value = "";

        deleteLinks = activityList.getElementsByTagName("a");

        deleteLinks[0].onclick = function() {
            this.parentNode.parentNode.removeChild(this.parentNode);
        };
    }
}
