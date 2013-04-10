/**
 * Pomodoro.
 *
 * Read more: http://www.pomodorotechnique.com/
 *
 * HOW USE:
 *
 * var pomodoro = new Pomodoro();
 *
 * pomodoro.timer.onTicTac = function(remainingTime){
 *   //Do something with remaining time;
 * };
 *
 * pomodoro.start();
 */

function Pomodoro() {
  var TIMER_DURATION = 25;

  this.timer = new Timer();
  this.tasks = [];
  this.startedAt = null;

  this.start = function() {
    if(this.startedAt == null){
      this.startedAt = new Date().getTime();
      this.timer.start(TIMER_DURATION);
    }
  };

  this.createTask = function(description) {
    var task = new PomodoroTask(description);
    this.tasks.push(task);

    if(typeof this.onCreateTask == "function"){
      this.onCreateTask(task);
    }

    return task;
  };

  this.removeTask = function(task){
    var NOT_FOUND = -1;

    var index = this.tasks.indexOf(task);

    if(index != NOT_FOUND){
      this.tasks.splice(index, 1);

      if(typeof this.onRemoveTask == "function"){
        this.onRemoveTask(task);
      }

      return task;
    }

    return null;
  }

  this.finishTask = function(task){
    var NOT_FOUND = -1;

    var index = this.tasks.indexOf(task);

    if(index != NOT_FOUND){
      task.finish();

      if(typeof this.onFinishTask == "function"){
        this.onFinishTask(task);
      }

      return task;
    }

    return null;
  }

  this.finishedTasks = function(){
    var finishedTasks = [];

    this.tasks.forEach(function(t){
      if(t.finished){ finishedTasks.push(t); }
    });

    return finishedTasks;
  }
}

function PomodoroTask(description){
  this.description = description;
  this.dom_element = null;
  this.finished = false;
  this.createdAt = new Date().getTime();

  this.finish = function(){
    this.finished = true;
  }
}

function Timer(){
  var finishAt = null;
  var timerId = 0;

  this.start = function (duration){
    if(timerId == 0) {
      finishAt = new Date().getTime() + (duration * 60 * 1000);

      var timer = this;
      timerId = setInterval(function() { ticTac(timer) }, 1000);
    }
  }

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

  this.remainingTime = function(){
    var remainingTime = finishAt - new Date().getTime();

    if(remainingTime <= 0){
      remainingTime = new Date(0);
    }else{
      remainingTime = new Date(remainingTime);
    }

    return remainingTime;
  };
}
