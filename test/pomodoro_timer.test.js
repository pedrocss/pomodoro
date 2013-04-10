describe("Pomodoro", function(){
  var pomodoro = null;

  beforeEach(function(){
    pomodoro = new Pomodoro();
  });

  describe("new", function(){
    it("returns a Pomodoro instance", function(){
      expect(pomodoro).to.be.a(Pomodoro);
    });
  });

  describe("#createTask", function(){
    it("return created task", function(){
      var task = pomodoro.createTask("Study")
      expect(task).to.be.a(PomodoroTask)
    });

    it("should add task to Pomodoro  task list", function(){
      var task = pomodoro.createTask("Study")
      expect(pomodoro.tasks).to.contain(task)
    });
  });

  describe("#removeTask", function(){
    context("when the informed task is in the list", function(){
      it("return removed task", function(){
        var task = pomodoro.createTask("Study");
        var removedTask = pomodoro.removeTask(task);
        expect(task).to.be(removedTask);
      });

      it("should remove from Pomodoro  task list", function(){
        var task = pomodoro.createTask("Study");
        pomodoro.removeTask(task);
        expect(pomodoro.tasks).to.not.contain(task);
      });

      it("return removed task", function(){
        var task1 = pomodoro.createTask("Study");
        var task2 = pomodoro.createTask("Run");

        pomodoro.removeTask(task1);
        pomodoro.removeTask(task1);

        expect(pomodoro.tasks).to.not.contain(task1);
        expect(pomodoro.tasks).to.contain(task2);
      });
    });

    context("when the informed task is not in the list", function(){
      it("return null", function(){
        var task = pomodoro.createTask("Study");

        pomodoro.removeTask(task);
        var removedTask = pomodoro.removeTask(task);

        expect(removedTask).to.be(null);
      });
    });
  });

  describe("#onCreateTask", function(){
    it("is called when a new task is created", function(done){
      pomodoro.onCreateTask = function(task){
        expect(pomodoro.tasks).to.contain(task);
        done();
      };

      pomodoro.createTask("Ah lelek lek lek lek lek");
    });

    it("do not throw exception when the onCreateTask is not a function", function(){
      expect(function(){
        pomodoro.createTask("Task");
      }).to.not.throwException();
    });
  });

  describe("#onRemoveTask", function(){
    it("is called when a task is removed", function(done){
      pomodoro.onRemoveTask = function(task){
        expect(pomodoro.tasks).to.not.contain(task);
        done();
      };

      var task = pomodoro.createTask("Ah lelek lek lek lek lek");
      pomodoro.removeTask(task);
    });

    it("do not throw exception when the onRemoveTask is not a function", function(){
      var task = pomodoro.createTask("Ah lelek lek lek lek lek");

      expect(function(){
        pomodoro.removeTask(task);
      }).to.not.throwException();
    });
  });

  describe("#finishTask", function(){
    context("when the informed task is in the list", function(){
      it("return finished task", function(){
        var task = pomodoro.createTask("Study");
        var finishedTask = pomodoro.finishTask(task);
        expect(task).to.be(finishedTask);
      });

      it("should finish task from Pomodoro  task list", function(){
        var task = pomodoro.createTask("Study");
        pomodoro.finishTask(task);
        expect(task.finished).to.be(true);
      });

      it("return finished task", function(){
        var task = pomodoro.createTask("Study");

        var finishedTask = pomodoro.finishTask(task);

        expect(task).to.be(finishedTask);
      });
    });

    context("when the informed task is not in the list", function(){
      it("return null", function(){
        var task = pomodoro.createTask("Study");

        pomodoro.removeTask(task);
        var finishedTask = pomodoro.finishTask(task);

        expect(finishedTask).to.be(null);
      });
    });
  });

  describe("#onFinishTask", function(){
    it("is called when a task is finished", function(done){
      pomodoro.onFinishTask = function(task){
        expect(task.finished).to.be(true);
        done();
      };

      var task = pomodoro.createTask("Ah lelek lek lek lek lek");
      pomodoro.finishTask(task);
    });

    it("do not throw exception when the onRemoveTask is not a function", function(){
      var task = pomodoro.createTask("Ah lelek lek lek lek lek");

      expect(function(){
        pomodoro.finishTask(task);
      }).to.not.throwException();
    });
  });

  describe("#tasks", function(){
    it("should be empty when no tasks", function(){
      expect(pomodoro.tasks).to.empty;
    });
  });

  describe("#finishedTasks", function(){
    it("should return array with tasks where finished is true", function(){
      var task1 = pomodoro.createTask("Ah lelek lek lek lek lek");
      var task2 = pomodoro.createTask("Ai meus deus como é bom ser vida loka");

      pomodoro.finishTask(task1);

      var finishedTasks = pomodoro.finishedTasks();

      expect(finishedTasks).to.contain(task1);
      expect(finishedTasks).to.not.contain(task2);
    });

    it("should be empty when no tasks", function(){
      expect(pomodoro.finishedTasks).to.empty;
    });
  });
});
