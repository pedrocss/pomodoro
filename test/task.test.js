describe("Task", function(){
  var task = null;
  var taskList = null;

  beforeEach(function(){
    taskList = new TaskList();
    task = taskList.createTask("Ah lelek lek lek lek lek");
  });

  describe("#finish", function(){
    it("should set finished as true", function(){
      task.finish();
      expect(task.finished).to.be(true);
    });
  });

  describe("#onFinish", function(){
    it("is called when a task is finished", function(done){
      task.onFinish = function(task){
        expect(task.finished).to.be(true);
        done();
      };

      task.finish();
    });

    it("do not throw exception when the onRemoveTask is not a function", function(){
      expect(function(){
        task.finish();
      }).to.not.throwException();
    });
  });
});

