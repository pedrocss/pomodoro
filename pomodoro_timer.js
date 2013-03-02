/**
 * Pomodoro Timer.
 * Read more: http://www.pomodorotechnique.com/
 *
 * HOW USE:
 *
 * var pomodoroTimer = new PomodoroTimer();
 *
 * pomodoroTimer.onTicTac = function(remainingTime){
 *   //Do something with remaining time;
 * };
 *
 * pomodoroTimer.start();
 */

function PomodoroTimer() {
  this.endTime = 0;
  var timerId = 0;
  this.tasks = [];

  this.remainingTime = function(){
    var date = new Date();
    var remainingTime = this.endTime - date.getTime();

    if(remainingTime <= 0){
      remainingTime = new Date(0);
    }else{
      remainingTime = new Date(remainingTime);
    }

    return remainingTime;
  };

  var ticTac = function(timer) {
    var remainingTime = timer.remainingTime();

    if(remainingTime.valueOf() == 0) {
        clearInterval(timerId);
        timerId = 0;
    }

    // call event onTitTac if defined
    if (typeof timer.onTicTac == "function") {
      timer.onTicTac(remainingTime);
    }
  };

  this.start = function() {
    var date = new Date();
    this.endTime = date.getTime() + (25 * 60 * 1000); // Current Time + 25 minutes (Pomodoro time)
    var timer = this;

    if(timerId == 0) {
        timerId = setInterval(function() { ticTac(timer) }, 1000);
    }
  };

  this.createTask = function(description) {
    var task = new PomodoroTask(description);
    this.tasks.push(task);

    return task;
  };
}

function PomodoroTask(description){
  this.description = description;
}
