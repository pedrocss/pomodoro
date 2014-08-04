describe("TaskList", function(){
  var taskList = null;

  beforeEach(function(){
    taskList = new TaskList();
  });

  describe("new", function(){
    it("returns a Task List instance", function(){
      expect(taskList).to.be.a(TaskList);
    });
  })

  describe("#createTask", function(){
    it("return created task", function(){
      var task = taskList.createTask("Study")
      expect(task).to.be.a(Task)
    });

    it("should add task to task list", function(){
      var task = taskList.createTask("Study")
      expect(taskList.tasks).to.contain(task)
    });
  });

  describe("#removeTask", function(){
    context("when the informed task is in the list", function(){
      it("return removed task", function(){
        var task = taskList.createTask("Study");
        var removedTask = taskList.removeTask(task);
        expect(task).to.be(removedTask);
      });

      it("should remove from task list", function(){
        var task = taskList.createTask("Study");
        taskList.removeTask(task);
        expect(taskList.tasks).to.not.contain(task);
      });

      it("return removed task", function(){
        var task1 = taskList.createTask("Study");
        var task2 = taskList.createTask("Run");

        taskList.removeTask(task1);
        taskList.removeTask(task1);

        expect(taskList.tasks).to.not.contain(task1);
        expect(taskList.tasks).to.contain(task2);
      });
    });

    context("when the informed task is not in the list", function(){
      it("return null", function(){
        var task = taskList.createTask("Study");

        taskList.removeTask(task);
        var removedTask = taskList.removeTask(task);

        expect(removedTask).to.be(null);
      });
    });
  });

  describe("#onCreateTask", function(){
    it("is called when a new task is created", function(done){
      taskList.onCreateTask = function(task){
        expect(taskList.tasks).to.contain(task);
        done();
      };

      taskList.createTask("Ah lelek lek lek lek lek");
    });

    it("do not throw exception when the onCreateTask is not a function", function(){
      expect(function(){
        taskList.createTask("Task");
      }).to.not.throwException();
    });
  });

  describe("#onRemoveTask", function(){
    it("is called when a task is removed", function(done){
      taskList.onRemoveTask = function(task){
        expect(taskList.tasks).to.not.contain(task);
        done();
      };

      var task = taskList.createTask("Ah lelek lek lek lek lek");
      taskList.removeTask(task);
    });

    it("do not throw exception when the onRemoveTask is not a function", function(){
      var task = taskList.createTask("Ah lelek lek lek lek lek");

      expect(function(){
        taskList.removeTask(task);
      }).to.not.throwException();
    });
  });

  describe("#tasks", function(){
    it("should be empty when no tasks", function(){
      expect(taskList.tasks).to.empty;
    });
  });

  describe("#finishedTasks", function(){
    it("should return array with tasks where finished is not null", function(){
      var task1 = taskList.createTask("Ah lelek lek lek lek lek");
      var task2 = taskList.createTask("lol");

      task1.finish();

      var finishedTasks = taskList.finishedTasks();

      expect(finishedTasks).to.contain(task1);
      expect(finishedTasks).to.not.contain(task2);
    });

    it("should be empty when no tasks", function(){
      expect(taskList.finishedTasks).to.empty;
    });
  });
});
