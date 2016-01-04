var test = require('tape');
var paver = require('./');

test('a', function(t) {
  t.deepEqual(paver.set('a', 1), {
    a: 1
  });
  t.end();
});

test('a with value', function(t) {
  t.deepEqual(paver.set('a', 2, {
    a: 1
  }), {
    a: 2
  });
  t.end();
});

test('a.b', function(t) {
  t.deepEqual(paver.set('a.b', 1), {
    a: {
      b: 1
    }
  });
  t.end();
});

test('a.b with value', function(t) {
  t.deepEqual(paver.set('a.b', 2, {
    a: {
      b: 1
    }
  }), {
    a: {
      b: 2
    }
  });
  t.end();
});

test('a.b.c', function(t) {
  t.deepEqual(paver.set('a.b.c', 1), {
    a: {
      b: {
        c: 1
      }
    }
  });
  t.end();
});

test('a.b.c with value', function(t) {
  t.deepEqual(paver.set('a.b.c', 2, {
    a: {
      b: {
        c: 1
      }
    }
  }), {
    a: {
      b: {
        c: 2
      }
    }
  });
  t.end();
});

test('[0]', function(t) {
  t.deepEqual(paver.set('[0]', 1), [1]);
  t.end();
});

test('[0][0]', function(t) {
  t.deepEqual(paver.set('[0][0]', 1), [
    [1]
  ]);
  t.end();
});

test('[0][2]', function(t) {
  var nestedArray = [];
  nestedArray['2'] = 1;

  t.deepEqual(paver.set('[0][2]', 1), [
    nestedArray
  ]);
  t.end();
});

test('[0][2] with value', function(t) {
  var orignestedArray = [];
  var nestedArray = [];
  orignestedArray['2'] = 1;
  nestedArray['2'] = 2;

  t.deepEqual(paver.set('[0][2]', 2, [
    orignestedArray
  ]), [
    nestedArray
  ]);
  t.end();
});

test('a[0][0]', function(t) {
  t.deepEqual(paver.set('a[0][0]', 1), {
    a: [
      [1]
    ]
  });
  t.end();
});

test('a[0][0] with value', function(t) {
  t.deepEqual(paver.set('a[0][0]', 2, {
    a: [
      [1]
    ]
  }), {
    a: [
      [2]
    ]
  });
  t.end();
});

test('throws error when given object does not path array path', function(t) {
  t.throws(paver.set.bind(null, '[0]', 1, {}));
  t.end();
});

test('a.b[0][0]', function(t) {
  t.deepEqual(paver.set('a.b[0][0]', 1), {
    a: {
      b: [
        [1]
      ]
    }
  });
  t.end();
});

test('a.b[0][0] with value', function(t) {
  t.deepEqual(paver.set('a.b[0][0]', 2, {
    a: {
      b: [
        [1]
      ]
    }
  }), {
    a: {
      b: [
        [2]
      ]
    }
  });
  t.end();
});

test('a[0]', function(t) {
  t.deepEqual(paver.set('a[0]', 1), {
    a: [1]
  });
  t.end();
});

test('a[0] with value', function(t) {
  t.deepEqual(paver.set('a[0]', 2, {
    a: [1]
  }), {
    a: [2]
  });
  t.end();
});

test('a[0].b', function(t) {
  t.deepEqual(paver.set('a[0].b', 1), {
    a: [{
      b: 1
    }]
  });
  t.end();
});

test('a[0].b with value', function(t) {
  t.deepEqual(paver.set('a[0].b', 2, {
    a: [{
      b: 1
    }]
  }), {
    a: [{
      b: 2
    }]
  });
  t.end();
});

test('a[0] should be an object literal for a[0].b', function(t) {
  var val = paver.set('a[0].b', 1);

  t.ok(val.a[0].constructor === Object);
  t.end();
});

test('a[helloworld]', function(t) {
  t.deepEqual(paver.set('a[helloworld]', 1), {
    'a[helloworld]': 1
  });
  t.end();
});

test('a[helloworld] with value', function(t) {
  t.deepEqual(paver.set('a[helloworld]', 2, {
    'a[helloworld]': 1
  }), {
    'a[helloworld]': 2
  });
  t.end();
});

test('a.0.b should use object not array', function(t) {
  t.deepEqual(paver.set('a.0.b', 1), {
    'a': {
      0: {
        b: 1
      }
    }
  });
  t.end();
});

test('a.0.b should use object not array with value', function(t) {
  t.deepEqual(paver.set('a.0.b', 2, {
    'a': {
      0: {
        b: 1
      }
    }
  }), {
    'a': {
      0: {
        b: 2
      }
    }
  });
  t.end();
});

test('retain existing object', function(t) {
  t.deepEqual(paver.set('a.b', 1, {
    a: {
      c: 2
    }
  }), {
    a: {
      b: 1,
      c: 2
    }
  });
  t.end();
});

test('retain existing nested object', function(t) {
  t.deepEqual(paver.set('a.b.c', 1, {
    a: {
      b: {
        d: 2
      }
    }
  }), {
    a: {
      b: {
        c: 1,
        d: 2
      }
    }
  });
  t.end();
});

test('retain existing top level array', function(t) {
  t.deepEqual(paver.set('[0].a', 1, [{
    b: 2
  }]), [{
    a: 1,
    b: 2
  }]);
  t.end();
});

test('retain existing array in object', function(t) {
  t.deepEqual(paver.set('a[0].b', 1, {
    a: [{
      c: 2
    }]
  }), {
    a: [{
      b: 1,
      c: 2
    }]
  });
  t.end();
});

test('throws for array path that does not match given object', function(t) {
  t.throws(paver.set.bind(null, 'a[0].b', 1, {
    a: {
      c: 2
    }
  }));
  t.end();
});