function TaskList(){
  this.tasks = [];

  this.createTask = function(description) {
    var task = new Task(description);
    this.tasks.push(task);

    if(typeof this.onCreateTask == "function"){
      this.onCreateTask(task);
    }

    return task;
  };

  this.removeTask = function(task){
    var NOT_FOUND = -1;

    var index = this.tasks.indexOf(task);

    if(index != NOT_FOUND){
      this.tasks.splice(index, 1);

      if(typeof this.onRemoveTask == "function"){
        this.onRemoveTask(task);
      }

      return task;
    }

    return null;
  }

  this.finishedTasks = function(){
    var finishedTasks = [];

    this.tasks.forEach(function(t){
      if(t.finishedAt != null){ finishedTasks.push(t); }
    });

    return finishedTasks;
  }
}
