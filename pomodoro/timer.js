function Timer(){
  var finishAt = null;
  var timerId = 0;

  this.start = function(duration) {
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
