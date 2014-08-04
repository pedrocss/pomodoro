function Task(description){
  this.description = description;
  this.dom_element = null;
  this.finished = false;
  this.createdAt = new Date().getTime();

  this.finish = function(){
    this.finished = true;

     if(typeof this.onFinish == "function"){
        this.onFinish(this);
     }
  }
}
