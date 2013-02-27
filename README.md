# Simple Pomodoro Timer.

## Demo

[http://predoff.github.com/pomodoro](http://predoff.github.com/pomodoro)

## Usage (pomodoro_timer.js)

    <script type="text/javascript" src="pomodoro_timer.js"></script>

    <script>
      var pomodoroTimer = new PomodoroTimer();

      pomodoroTimer.onTicTac = function(remainingTime){
        alert(remainingTime.getSeconds());
      };

      pomodoroTimer.start();
    </script>

## Testing

Open files in browser:

* `test/pomodoro_timer.test.js`
