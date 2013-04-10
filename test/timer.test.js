describe("Timer", function(){
  var timer = null;

  beforeEach(function(){
    timer = new Timer(25);
  });

  describe("#remainingTime", function(){
    it("returns a Date instance", function(){
      expect(timer.remainingTime()).to.be.a(Date);
    });
  });

  describe("#onTicTac", function(){
    it("called when timer is start", function(done){
      timer.onTicTac = function(remainingTime){
        done();
      };

      timer.start();
    });
  });
});
