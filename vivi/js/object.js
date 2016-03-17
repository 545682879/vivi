//call
Array.prototype.slice.call([1,2,3])
//被处理的对象必须有length属性，以及相对应的数字键
Array.prototype.slice.call({0:1, 1:2, 2:3,length:5})
Array.prototype.slice.apply({0:1, 1:2, 2:3,length:5})
//result
//[1, 2, 3, undefined × 2]
var n = 123;
var o = { n : 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(o) // 456

function addTwo(a, b){
	this.a = a;
	this.b = b;

	this.print = function(){
		console.log('values:' + a + ', ' + b);
	}
}

function addThree(a, b, c){
	addTwo.call(this, a, b);
	this.c = c;

	this.print = function(){
		console.log('values:' + a + ', ' + b + ', ' + c);
	}
}

new addTwo(1,2);
new addThree(1,2,3);

var obj = {};
obj.hasOwnProperty('toString') // false

obj.hasOwnProperty = function (){

	
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false

function print(){
	console.log(this.value);
}

function havaValueFunction(){
	this.value = 'value'
}

var a = new havaValueFunction;
a.value = 1;
print.call(a);

var b =  new Object;
b.value = 1;
print.call(b);

//apply
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a)

var o = new Object();

o.f = function (){
    console.log(this === o);
}

var f = function (){
  o.f.apply(o);
  //如果不使用这个，则click事件的处理方法里, this 是事件源
  // 或者 o.f.call(o);
};

$("#button").on("click", f);

//bind
//bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数
//bind比call方法和apply方法更进一步的是，除了绑定this以外，还可以绑定原函数的参数
var add = function (x,y) {
  return x*this.m + y*this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);

newAdd(5)
// 20

function addTwoValue (x, y){
	return x + y;
}

var addTwoValueBind = addTwoValue.bind(null, 5)
addTwoValueBind(3);


//$.proxy
//bind方法的作用基本相同
$("#button").on("click", $.proxy(o.f, o));

var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);

var a = [1 ,2 ,3];
push(a, 4)
a // [1, 2, 3, 4]

pop(a)
a // [1, 2, 3]

function f(){
    console.log(this.v);
}

var o = { v: 123 };

var bind = Function.prototype.call.bind(Function.prototype.bind);

bind(f,o)() // 123