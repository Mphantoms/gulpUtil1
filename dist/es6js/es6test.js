'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var a = 100;
var b = 1000;
function f(x, y) {
    return { x: x, y: y };
}

var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: 'toString',
        value: function toString() {
            return 'x' + this.x + 'x' + this.y;
        }
    }]);

    return Point;
}();

var point = new Point(2, 3);
var s = point.toString();
console.log(s);

var proxy = new Proxy({}, {
    get: function get(target, property) {
        return 35;
    }
});
var t = proxy.time;
console.log(t);

function myfunc(x) {
    for (var _len = arguments.length, ret = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        ret[_key - 1] = arguments[_key];
    }

    var s = [].concat(ret);
    console.log(s);
    return x + s;
}
var fu = myfunc(1, 5, 6, 7, 8, 9, 7, 4);
console.log(fu);