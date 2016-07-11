//1. 函数表达式
//函数对象, 匿名的函数表达式
var add = function(x, y){
	return x + y;
}
console.log(2,3) //5
console.log(add.name)  //""

//具名函数表达式， 具名函数表达式使得函数表达式可以引用她自己
//具名函数表达式的名字只能在它内部被访问
var func = function me(n){
	if(n>0){
		return n * me(n-1);
	}else{
		return 1;
	}
};

console.log(func(3));
console.log(func.name)  //"me"

//2. 函数声明
function add(n){
	if(n>0){
		return n * add(n-1);
	}else{
		return 1;
	}
};

console.log(add(3)); 
console.log(add.name)  //"add"

//3. Function 构造器, 有点类似于eval()
var add = new Function('x', 'y', 'return x + y');

//不能改变基本类型， 可以改变对象
function reset(n){n = 1;}
var k = 4
reset(k)  //4

function resetString(s){s = 'abc';}
var ss = "a"
resetString(ss)  //"a"

function resetObject(obj){obj.k = 'a'}
var oo = {k: 'abc'}
resetObject(oo)  //Object {k: "a"}

//变量提升
foo();
function foo(){
	console.log('foo');
}

//变量提升后
function foo(){
	console.log('foo');
}
foo();

//函数对象
foo1();
var foo1 = function foo1(){
	console.log('foo1');
}

//变量提升后
var foo1;
foo1();
foo1 = function foo1(){
	console.log('foo1');
}

//控制函数调用：
function func(arg1, arg2, arg3){
	console.log(arg1, arg2, arg3);
}
var arg1 = 1, arg2 = 2, arg3 = 3;

func.apply(null, [arg1, arg2, arg3]);

func.call(null, arg1, arg2, arg3);

Math.max.apply(null, [1, 2, 3])

function add(x, y){
	return x + y;
}

var plus = add.bind(null, 1);

console.log(plus(5))  //6

//参数缺失或者超出时的处理
//1. 实参数量多于形参
//多余的参数会被忽略， 可以在arguments中被获取到
//2. 形参数量多于实参 缺失的参数会被赋予undefined值

// 通过索引访问所有参数， 神奇的arguments
// arguments
// arguments是数组, 又不是数组，有数组的length属性，没有数组的slice, forEach 方法
// 是一个对象，支持所有的对象方法和操作。
function f(){
	console.log(arguments.hasOwnProperty(1));
	console.log(1 in arguments);
}

f('a')  //false
f('a', 'b')  //true


//强制性参数，限制参数数量和最小值

//检测他的值是否为undefined
function foo(mandatoty, optional){
	if(mandatoty === undefined){
		throw new Error('Misssing parameter: mandatoty');
	}
}

//转换成布尔值
function foo(mandatoty, optional){
	if(!mandatoty){
		throw new Error('Misssing parameter: mandatoty');
	}
}

function foo(mandatoty, optional){
	if(arguments.length < 1){
		throw new Error('Misssing parameter: mandatoty');
	}
}

//可选参数
function bar(arg1, arg2, optional){
	if(optional == undefined){
		optional = 'default value.'
	}

	if(!optional){
		optional = 'default value.'
	}

	optional = optional || 'default value.'

	if(arguments.length < 3){
		optional = 'default value.'
	}
}

//模拟具名参数
function selectEntrys(arg1, arg2, options){
	options = options || {};
	var arg3 = options.arg3 || 'a';
	var arg4 = options.arg4 || 0;
	var arg5 = options.arg5 || {};
	console.log(arg1, arg2, arg3, arg4, arg5);  //1 2 a 0 Object {}
}




var a = "a"
a.toString()  //"a"
var f = function(){}
f.toString   //toString() { [native code] }
f.toString() //"function (){}"
var o = {}
o.toString()  //"[object Object]"
var a = [1,2,3]
a.toString()  //"1,2,3"
Object.prototype.toString.call(a)  //"[object Array]"
Object.prototype.toString.call(f)  //"[object Function]"
Object.prototype.toString.call(o)  //"[object Object]"
var d = new Date()
Object.prototype.toString.call(d)  //"[object Date]"
d.toString() //"Wed Jun 29 2016 11:10:57 GMT+0800 (中国标准时间)"

d.toLocaleDateString()  //"2016/6/29"
d.toLocaleTimeString()  //"上午11:10:57"
d.toLocaleString()  //"2016/6/29 上午11:10:57"
d.toJSON()  //"2016-06-29T03:10:57.578Z"

d.valueOf()  //1467169857578
a.valueOf()  //[1, 2, 3]
a.toString()  //"1,2,3"
Object.prototype.valueOf.call(a)  //[1, 2, 3]
o.valueOf()  //Object {}
f.valueOf()  //function(){}

function base(p1, p2){
	this.p1 = p1;
	this.p2 = p2;
	return this;
}
function extend(p1, p2, p3){
	base.call(this, p1, p2);
	this.p3 = p3;
	return this;
}
e1.hasOwnProperty("p1");
e1.hasOwnProperty("p3");

Date.parse(new Date('2012-01-01'))  == new Date('2012-01-01').getTime();