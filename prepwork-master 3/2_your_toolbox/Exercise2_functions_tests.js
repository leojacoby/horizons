describe("Example 2.1: run()", function() {
  var run = toolbox.run;
  var hasRun = false;
  function markRan() {
    hasRun = true;
  }
  it('run with no return value', function() {
    run(markRan);
    expect(hasRun).toBe(true);
  });

  it('run(function() { return 1; }) -> 1', function() {
    expect(run(function() { return 1; })).toBe(1);
  });
});

describe("Exercise 2.2: runOneAfterAnother()", function() {
  var runOneAfterAnother = toolbox.runOneAfterAnother;
  var state = 0;
  function state1() {
    if (state == 0) {
      state = 1;
    }
  }
  function state2() {
    if (state == 1) {
      state = 2;
    }
  }

  it('expect fun1 to run before fun2', function() {
    runOneAfterAnother(state1, state2);
    expect(state).toBe(2);
  });
});

describe("Example 2.3: getDoubler()", function() {
  var getDoubler = toolbox.getDoubler;
  it('getDoubler() returns a function', function() {
    expect(typeof getDoubler()).toBe('function');
  });
  it('getDoubler()(2) -> 4', function() {
    expect(getDoubler()(2)).toBe(4);
  });
  it('getDoubler()(7) -> 14', function() {
    expect(getDoubler()(7)).toBe(14);
  });
});

describe("Exercise 2.4: getMultiplier()", function() {
  var getMultiplier = toolbox.getMultiplier;
  it('getMultiplier(0) returns a function', function() {
    expect(typeof getMultiplier(0)).toBe('function');
  });
  it('getMultiplier(2)(3) -> 6', function() {
    expect(getMultiplier(2)(3)).toBe(6);
  });
  it('getMultiplier(0)(100) -> 0', function() {
    expect(getMultiplier(0)(100)).toBe(0);
  });
});

describe("Example 2.5: once()", function() {
  var once = toolbox.once;
  var count = 0;
  function inc() {
    count++;
  }
  it('runs inner function only once', function() {
    var f = once(inc);
    for (var i = 0; i < 10; i++) {
      f();
    }
    expect(count).toBe(1);
  });
});

describe("Exercise 2.6: only()", function() {
  var only = toolbox.only;
  var count = 0;
  function inc() {
    count++;
  }

  beforeEach(function() {
    count = 0;
  });

  it('only(1, f) runs f only once', function() {
    var f = only(1, inc);
    for (var i = 0; i < 10; i++) {
      f();
    }
    expect(count).toBe(1);
  });
  it('calling only(2, f) less than 1 time should call f() once', function() {
    var f = only(2, inc);
    f();
    expect(count).toBe(1);
  });
  it('calling only(3, f) more than 3 times should call f() 3 times', function() {
    var f = only(3, inc);
    for (var i = 0; i < 10; i++) {
      f();
    }
    expect(count).toBe(3);
  });
});
