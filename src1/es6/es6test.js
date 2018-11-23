let a = 100;
const b = 1000;
function f(x,y){
    return {x,y}
}
class Point {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return 'x'+this.x+'x'+this.y;
    }
}

var point = new Point(2,3);
var s = point.toString();
console.log(s);

var proxy = new Proxy({},{
    get: function(target,property){
        return 35
    }
})
var t = proxy.time
console.log(t);

function myfunc(x,...ret){
    var s = [...ret];
    console.log(s);
    return x + s;
}
var fu = myfunc(1,5,6,7,8,9,7,4);
console.log(fu);