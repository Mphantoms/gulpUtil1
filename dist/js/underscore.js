(function() {
  var _, global, results;

  global = this;

  global.push = Array.prototype.push;

  _ = function(obj) {
    global.wrap = obj;
    if (!(this instanceof _)) {
      return new _();
    }
  };

  /*  
  _.uniq = ( arr,fn )->
  if _.isArray arr
    result = []
    result.push(num) for num in [1,2,3,4,5] when if 1 then result.indexOf num is -1 
  */
  _.each = function(target, fn) {
    var i, j, key, len, results1, results2, value;
    if (_.isArray(target)) {
      results1 = [];
      for (i = j = 0, len = target.length; j < len; i = ++j) {
        value = target[i];
        results1.push(fn.call(target, i, value));
      }
      return results1;
    } else {
      results2 = [];
      for (key in target) {
        value = target[key];
        results2.push(fn.call(target, key, value));
      }
      return results2;
    }
  };

  _.isArray = function(arr) {
    return toString.call(arr) === '[object Array]';
  };

  _.each(['Function', 'Object', 'Number', 'String'], function(i, val) {
    return _['is' + val] = function(arg) {
      return toString.call(arg) === `[object ${val}]`;
    };
  });

  _.functions = function(stan) {
    var results1, value;
    if (_.isFunction(stan)) {
      results1 = [];
      for (value in stan) {
        results1.push(value);
      }
      return results1;
    }
  };

  _.chain = function(obj) {
    var instance;
    instance = _(obj);
    instance._chain = true;
    console.log(instance);
    return instance;
  };

  results = function(instance, obj) {
    if (instance._chain) {
      return _(obj).chain();
    } else {
      return obj;
    }
  };

  _.prototype.value = function() {
    return global.wrap;
  };

  _.mixins = function(obj) {
    return _.each(_.functions(obj), function(key, val) {
      var func;
      func = _[val];
      return _.prototype[val] = function() {
        var wraps;
        wraps = [global.wrap];
        console.log(wraps);
        push.apply(wraps, arguments);
        return results(this, func.apply(this, wraps));
      };
    });
  };

  _.mixins(_);

  global._ = _;

}).call(this);
