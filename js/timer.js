function Timer(){
  var finishAt = null;
  var timerId = 0;
  var el = document.getElementById('remaining_time');

  this.start = function(duration) {
    if(timerId == 0) {
      finishAt = new Date().getTime() + (duration * 60 * 1000 + 1000);

      var timer = this;
      timerId = setInterval(function() { ticTac(timer) }, 500);
    }
  }

  this.remainingTime = function(){
    var remainingTime = finishAt - new Date().getTime();

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

    displayRemainingTime(remainingTime);
  };

  var displayRemainingTime = function(remainingTime){
    var minutes = remainingTime.getMinutes();
    var seconds = remainingTime.getSeconds();

    minutes = formatNumber(minutes);
    seconds = formatNumber(seconds);

    el.innerHTML = minutes + ":" + seconds;
  }

   var formatNumber = function(number){
    if(number < 10) { number = "0" + number; }

    return number;
  }
}
