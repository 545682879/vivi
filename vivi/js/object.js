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

var oo = new Object();

oo.f = function (){
    console.log(this === oo);
}
	console.log(oo.f)
var f = function (){
	console.log(oo)
	oo.f.apply(oo);
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

//----------------------------------------------------------------------------------------------------------------------------------------------
//函数的继承
function Person(name, sex) {
    this.name = name;
    this.sex = sex;
}
Person.prototype.age = 20;
Person.prototype.nation = 'China';

var zhang = new Person("ZhangSan", "man");
console.log('zhang init:', zhang.age, zhang.nation); // 20

var li = new Person("Lisi", "man");
console.log('li init:', li.age, li.nation); // 20
// 覆盖prototype中的age属性

zhang.age = 19;
zhang.nation = 'American';
console.log('zhang 19:', zhang.age, zhang.nation); // 19
//delete zhang.age;
// 在删除实例属性age后，此属性值又从prototype中获取

Person.prototype.age = 22;
console.log('zhang 22:', zhang.age, zhang.nation); 
console.log('li 22:', li.age, li.nation); 

delete zhang.age;
console.log('zhang delete 19:', zhang.age, zhang.nation); // 19

console.log("Person.prototype:", Person.prototype);

function Teacher(name, sex, category){
	Person.call(this, name, sex);
	this.category = category;
}

Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;

//Teacher.prototype = new Person('li', 'woman');

//缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype
//Teacher.prototype = Person.prototype;
//Person 的protptype也会改变
//Teacher.prototype.constructor = Teacher;

var teacher1 = new Teacher('a', 'man', 'Chinese');

console.log('Teacher Name: ', teacher1.name);
console.log('Teacher Sex: ', teacher1.sex);
console.log('Teacher Category: ', teacher1.category);

//Teacher.prototype = new Person();
console.log('teacher1.__proto__: ' , teacher1.__proto__);  //Person 
console.log('Teacher.prototype: ' , Teacher.prototype);  //teacher1.__proto__ == Teacher.prototype
console.log('teacher1.constructor: ' , teacher1.constructor);
console.log('Teacher.prototype.constructor: ',  Teacher.prototype.constructor);  //teacher1.constructor == Teacher.prototype.constructor

console.log('teacher1.age', teacher1.age);
Teacher.prototype.age = 100;
console.log('teacher1.age', teacher1.age); //Person 

Teacher.prototype.schoolName = '中华';
Teacher.prototype.getSchoolName = function(){return this.schoolName;};  //Person

console.log('teacher1.schoolName', teacher1.schoolName);

console.log(teacher1.getSchoolName());

function deepCopy(p, c) {
　　var c = c || {};
　　for (var i in p) {
		console.log(i)
		if(p.hasOwnProperty(i)){
			if (typeof p[i] === 'object') {
	　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
	　　　　　　deepCopy(p[i], c[i]);
	　　　　} else {
	　　　　　　c[i] = p[i];
	　　　　}
		}

　　}
	return c;
}

var Doctor = deepCopy(new Person());

console.log(Doctor);
