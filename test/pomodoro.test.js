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
});
