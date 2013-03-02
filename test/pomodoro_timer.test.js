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
    it("return created task", function(){
      var task = pomodoroTimer.createTask("Study")
      expect(task).to.be.a(PomodoroTask)
    });

    it("should add task to Pomodoro Timer task list", function(){
      var task = pomodoroTimer.createTask("Study")
      expect(pomodoroTimer.tasks).to.contain(task)
    });
  });

  describe("#removeTask", function(){
    context("when the informed task is in the list", function(){
      it("return removed task", function(){
        var task = pomodoroTimer.createTask("Study");
        var removedTask = pomodoroTimer.removeTask(task);
        expect(task).to.be(removedTask);
      });

      it("should remove from Pomodoro Timer task list", function(){
        var task = pomodoroTimer.createTask("Study");
        pomodoroTimer.removeTask(task);
        expect(pomodoroTimer.tasks).to.not.contain(task);
      });
    })

    context("when the informed task is not in the list", function(){
      it("return removed task", function(){
        var task1 = pomodoroTimer.createTask("Study");
        var task2 = pomodoroTimer.createTask("Run");

        pomodoroTimer.removeTask(task1);
        pomodoroTimer.removeTask(task1);

        expect(pomodoroTimer.tasks).to.not.contain(task1);
        expect(pomodoroTimer.tasks).to.contain(task2);
      });

      it("return null", function(){
        var task = pomodoroTimer.createTask("Study");

        pomodoroTimer.removeTask(task);
        var removedTask = pomodoroTimer.removeTask(task);

        expect(removedTask).to.be(null);
      });
    });
  });

  describe("#onCreateTask", function(){
    it("is called when a new task is created", function(done){
      pomodoroTimer.onCreateTask = function(task){
        expect(pomodoroTimer.tasks).to.contain(task);
        done();
      };

      pomodoroTimer.createTask("Ah lelek lek lek lek lek");
    });

    it("do not throw exception when the onCreateTask is not a function", function(){
      expect(function(){
        pomodoroTimer.createTask("Task");
      }).to.not.throwException();
    });
  });

  describe("#onRemoveTask", function(){
    it("is called when a task is removed", function(done){
      pomodoroTimer.onRemoveTask = function(task){
        expect(pomodoroTimer.tasks).to.not.contain(task);
        done();
      };

      var task = pomodoroTimer.createTask("Ah lelek lek lek lek lek");
      pomodoroTimer.removeTask(task);
    });

    it("do not throw exception when the onRemoveTask is not a function", function(){
      var task = pomodoroTimer.createTask("Ah lelek lek lek lek lek");

      expect(function(){
        pomodoroTimer.removeTask(task);
      }).to.not.throwException();
    });
  });

  describe("#tasks", function(){
    it("should be empty when no tasks", function(){
      expect(pomodoroTimer.tasks).to.empty;
    });
  });
});
