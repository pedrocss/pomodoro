describe("PomodoroTimer", function(){
  describe("new", function(){
    it("returns a PomodoroTimer instance", function(){
      var pomodoroTimer = new PomodoroTimer();
      expect(pomodoroTimer).to.be.a(PomodoroTimer);
    });
  });

  describe("#start", function(){
    it("set end time to 25 minutes from now", function(){
      var pomodoroTimer = new PomodoroTimer();
      var date = new Date();

      pomodoroTimer.start();
      expect(pomodoroTimer.endTime).to.be.equal(date.getTime() + (25 * 60 * 1000));
    });

    it("reset end time when start two times", function(){
      var pomodoroTimer = new PomodoroTimer();
      var date = new Date();

      pomodoroTimer.start();
      pomodoroTimer.start();
      expect(pomodoroTimer.endTime).to.be.equal(date.getTime() + (25 * 60 * 1000));
    });
  });

  describe("#onTicTac", function(){
    it("called when timer is running", function(done){
      var pomodoroTimer = new PomodoroTimer();

      pomodoroTimer.onTicTac = function(remainingTime){
        done();
      };

      pomodoroTimer.start();
    });
  });
});
