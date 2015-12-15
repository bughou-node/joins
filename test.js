var assert = require("assert");
var equal = require("deep-equal");

var left_join = require('./joins.js').left;
var inner_join = require('./joins.js').inner;
var get_keys = require('./joins.js').keys;

describe('left_join', function() {
  it('integers left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push(i);
      expect.push(i);
    }
    for (var i = 3; i < 6; i++) {
      left.push(i);
      right.push({ id: i, name: 'x' + i });
      expect.push({ id: i, name: 'x' + i });
    }
    for (var i = 6; i < 9; i++) {
      right.push({ id: i, name: 'x' + i });
    }
    var result = left_join(left, right, { right: 'id' });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('strings left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push('n' + i);
      expect.push('n' + i);
    }
    for (var i = 3; i < 6; i++) {
      left.push('n' + i);
      right.push({ id: 'n' + i, name: 'x' + i });
      expect.push({ id: 'n' + i, name: 'x' + i });
    }
    for (var i = 6; i < 9; i++) {
      right.push({ id: i, name: 'x' + i });
    }
    var result = left_join(left, right, { right: 'id' });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('arrays left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push(['a' + i, i, 'b' + i]);
      expect.push(['a' + i, i, 'b' + i]);
    }
    for (var i = 3; i < 6; i++) {
      left.push(['a' + i, i, 'b' + i]);
      right.push([ 'c' + i, i, 'd' + i ]);
      expect.push(['a' + i, i, 'b' + i, 'c' + i, i, 'd' + i ]);
    }
    for (var i = 6; i < 9; i++) {
      right.push([ 'c' + i, i, 'd' + i ]);
    }
    var result = left_join(left, right, { left: 1, right: 1 });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('objects left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push({   id: i, a: i, b: i });
      expect.push({ id: i, a: i, b: i });
    }
    for (var i = 3; i < 6; i++) {
      left.push({   id: i, a: i, b: i });
      right.push({ r: { id: i }, c: i, d: i });
      expect.push({ id: i, a: i, b: i, r: { id: i }, c: i, d: i });
    }
    for (var i = 6; i < 9; i++) {
      right.push({ rid: i, c: i, d: i });
    }
    var result = left_join(left, right, { left: 'id', right: 'r.id' });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('target path', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push({   id: i, a: i, b: i });
      expect.push({ id: i, a: i, b: i });
    }
    for (var i = 3; i < 6; i++) {
      left.push({   id: i, a: i, b: i });
      right.push({ r: { id: i }, c: i, d: i });
      expect.push({ id: i, a: i, b: i, right: {
        target: { r: { id: i }, c: i, d: i }
      }});
    }
    for (var i = 6; i < 9; i++) {
      right.push({ rid: i, c: i, d: i });
    }
    var result = left_join(left, right, {
      left: 'id', right: 'r.id', target: 'right.target'
    });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });
});

describe('inner_join', function() {
  it('integers left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push(i);
    }
    for (var i = 3; i < 6; i++) {
      left.push(i);
      right.push({ id: i, name: 'x' + i });
      expect.push({ id: i, name: 'x' + i });
    }
    for (var i = 6; i < 9; i++) {
      right.push({ id: i, name: 'x' + i });
    }
    var result = inner_join(left, right, { right: 'id' });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('strings left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push('n' + i);
    }
    for (var i = 3; i < 6; i++) {
      left.push('n' + i);
      right.push({ id: 'n' + i, name: 'x' + i });
      expect.push({ id: 'n' + i, name: 'x' + i });
    }
    for (var i = 6; i < 9; i++) {
      right.push({ id: i, name: 'x' + i });
    }
    var result = inner_join(left, right, { right: 'id' });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('arrays left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push(['a' + i, i, 'b' + i]);
    }
    for (var i = 3; i < 6; i++) {
      left.push(['a' + i, i, 'b' + i]);
      right.push([ 'c' + i, i, 'd' + i ]);
      expect.push(['a' + i, i, 'b' + i, 'c' + i, i, 'd' + i ]);
    }
    for (var i = 6; i < 9; i++) {
      right.push([ 'c' + i, i, 'd' + i ]);
    }
    var result = inner_join(left, right, { left: 1, right: 1 });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('objects left', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push({   id: i, a: i, b: i });
    }
    for (var i = 3; i < 6; i++) {
      left.push({   id: i, a: i, b: i });
      right.push({ r: { id: i }, c: i, d: i });
      expect.push({ id: i, a: i, b: i, r: { id: i }, c: i, d: i });
    }
    for (var i = 6; i < 9; i++) {
      right.push({ r: { id: i }, c: i, d: i });
    }
    var result = inner_join(left, right, { left: 'id', right: 'r.id' });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });

  it('target path', function() {
    var left = [ ], right = [ ], expect = [ ];

    for (var i = 0; i < 3; i++) {
      left.push({   id: i, a: i, b: i });
    }
    for (var i = 3; i < 6; i++) {
      left.push({   id: i, a: i, b: i });
      right.push({ r: { id: i }, c: i, d: i });
      expect.push({ id: i, a: i, b: i, right: {
        target: { r: { id: i }, c: i, d: i }
      }});
    }
    for (var i = 6; i < 9; i++) {
      right.push({ r: { id: i }, c: i, d: i });
    }
    var result = inner_join(left, right, {
      left: 'id', right: 'r.id', target: 'right.target'
    });
    debug(left, right, expect, result);

    assert(equal(result, expect));
  });
});

describe('get_keys', function () {
  it('should work', function () {
    var a = [
      { k1: { k2: { '': 5 } } },
      { k1: { k2: { k3: 1 } } },
      {                       k2: { k2: { k3: 9 } } },
      { k1: { k2: { k3: 3 } } },
      { k1: { k2: {       } } },
      { k1: {               } },
      { k1: { k2: { k3: 2 } } },
      { k1: { k2: { k3: 2 } } },
      { },
    ];
    var expect = [ '1', '2', '3' ];
    var result = get_keys(a, 'k1.k2.k3');

    assert(equal(result, expect));
  });
});

function debug(left, right, expect, result) {
  if (!process.env.debug) return;
  console.log(left);
  console.log();
  console.log(right);
  console.log();
  console.log(expect);
  console.log();
  console.log(result);
}

