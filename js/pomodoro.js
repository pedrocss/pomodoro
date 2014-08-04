function Pomodoro() {
  var TIMER_DURATION = 25;

  this.timer = new Timer();
  this.startedAt = null;

  this.start = function() {
    if(this.startedAt == null){
      this.startedAt = new Date().getTime();
      this.timer.start(TIMER_DURATION);
    }
  };
}

