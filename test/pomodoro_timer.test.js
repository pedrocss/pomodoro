describe("PomodoroTimer", function(){
  var pomodoroTimer = null;

  beforeEach(function(){
    pomodoroTimer = new PomodoroTimer();
  })

  describe("new", function(){
    it("returns a PomodoroTimer instance", function(){
      expect(pomodoroTimer).to.be.a(PomodoroTimer);
    });
  });

  describe("#start", function(){
    it("set end time to 25 minutes from now", function(){
      var date = new Date();

      pomodoroTimer.start();
      expect(pomodoroTimer.endTime).to.be.equal(date.getTime() + (25 * 60 * 1000));
    });

    it("reset end time when start two times", function(){
      var date = new Date();

      pomodoroTimer.start();
      pomodoroTimer.start();
      expect(pomodoroTimer.endTime).to.be.equal(date.getTime() + (25 * 60 * 1000));
    });
  });

  describe("#onTicTac", function(){
    it("called when timer is running", function(done){
      pomodoroTimer.onTicTac = function(remainingTime){
        done();
      };

      pomodoroTimer.start();
    });
  });

  describe("#createTask", function(){
    it("return PomodoroTask instance", function(){
      var task = pomodoroTimer.createTask("Study")
      expect(task).to.be.a(PomodoroTask)
    });

    it("set description in created task", function(){
      var task = pomodoroTimer.createTask("Study")
      expect(task.description).to.be("Study")
    });
  });

  describe("#tasks", function(){
    it("return PomodoroTask list", function(){
      var task = pomodoroTimer.createTask("Study");
      expect(pomodoroTimer.tasks).to.contain(task);
    });

    it("should be empty when no tasks", function(){
      expect(pomodoroTimer.tasks).to.empty;
    });
  });
});
