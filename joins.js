
exports.keys = get_keys;
exports.left = left_join;
exports.inner = inner_join;

function left_join (left, right, path) {
  return join(left, right, path, true);
}

function inner_join (left, right, path) {
  return join(left, right, path);
}

function join (left, right, path, flag) {
  if (left.constructor !== Array) throw 'left must be an Array';
  if (right.constructor !== Array) throw 'right must be an Array';
  if (left.length === 0 || right.length === 0) return left;
  if (
    !path || path.right === undefined || path.right === null
  ) throw 'path.right is required';

  var hash = { };
  var rp = get_path(path, 'right');
  for (var i = 0, len = right.length; i < len; i++) {
    var r = right[i];
    hash[get(r, rp)] = r;
  }

  var lp = get_path(path, 'left');
  var tp = get_path(path, 'target');

  var result = [ ];
  for (var i = 0, len = left.length; i < len; i++) {
    var l = left[i];
    var r = hash[get(l, lp)];
    if (flag || r !== undefined) result.push(merge(l, r, tp));
  }
  return result;
}

function get_keys (array, path) {
  var cons = path.constructor;
  if (cons === String) path = path.split('.');
  else if (cons === Number) path = [ p ];
  else throw 'path can only be integer or string';

  var hash = [ ];
  for (var i = 0, l = array.length; i < l; i++) {
    var k = get(array[i], path);
    if (k !== undefined && k !== null) hash[k] = 1;
  }
  return Object.keys(hash);
}

function merge (left, right, path) {
  if (right === undefined) return left;
  if (typeof(left) !== 'object') return right;
  if (path) {
    set(left, path, right);
  } else {
    if (left.constructor === Array && right.constructor === Array) {
      for (var i = 0, len = right.length; i < len; i++) left.push(right[i]);
    } else {
      for (var k in right) left[k] = right[k];
    }
  }
  return left;
}

function get_path (path, which) {
  var p = path[which];
  if (p === undefined || p === null) return;
  var cons = p.constructor;
  if (cons === String) return p.split('.');
  else if (cons === Number) return [ p ];
  else throw 'path.' + which + ' can only be integer or string';
}


function get (object, path) {
  if (path === undefined || path === null) return object;
  for (var i = 0, len = path.length; i < len; i++) {
    if (!object) return;
    object = object[path[i]];
  }
  return object;
}

function set (object, path, value) {
  var last = path.length - 1;
  for (var i = 0; i < last; i++) {
    var p = path[i];
    if (object[p] === undefined) object[p] = { };
    object = object[p];
  }
  object[path[last]] = value;
}
