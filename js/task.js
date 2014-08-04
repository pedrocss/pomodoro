function Task(description){
  this.description = description;
  this.dom_element = null;
  this.finishedAt = null;
  this.createdAt = new Date().getTime();

  this.finish = function(){
    this.finishedAt = new Date().getTime();

     if(typeof this.onFinish == "function"){
        this.onFinish(this);
     }
  }
}
