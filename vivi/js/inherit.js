// 1. 获取实例对象obj的原型对象，有三种方法
/*
obj.__proto__
obj.constructor.prototype
Object.getPrototypeOf(obj)
*/

/*
var obj = new Object();

obj.__proto__ === Object.prototype
// true

obj.__proto__ === obj.constructor.prototype
// true
*/

//判断是否支持 __proto__ 属性。
//Object.getPrototypeOf({ __proto__ : null })
//alert(Object.getPrototypeOf({ __proto__ : null }) === null)

var a = {x: 1};
var b = { __proto__: a};
var c = { __proto__: b};

console.log(c.x) // 1


Array.prototype.p = 'abc';
var a = new Array();

console.log(a.p)
console.log(a.__proto__.p) // abc
console.log(a.constructor.prototype.p) // abc


//
function Animal(what){
	this.leg = 2;
	this.eyes = 2;
	this.food = what;
}

Animal.prototype.eat = function(){
	console.log('eat ' + this.food);
	return 'eat many food!'
}
/*
function Dog(){
	//Animal.call(this, 'meat');
}
*/
function Dog(){
	this.base = Animal;
	this.base('meat');
}

Dog.prototype = Animal.prototype;
//Dog.prototype = Object.create(Animal.prototype);
//不完全是prototype, 还有attribute信息。
//Dog.prototype = new Animal('fruit');
Dog.prototype.constructor = Dog;
console.log('Animal.prototype leg' + Animal.prototype.leg);
console.log('Dog.prototype leg' + Dog.prototype.leg);
var mimi = new Dog();
console.log('a~~~ leg ' + mimi.leg);
console.log('a~~~ eyes ' + mimi.eyes);
console.log('a~~~ food ' + mimi.food);
console.log('a~~~ ' + mimi.eat());
console.log('mimi.__proto__.leg  ' + mimi.__proto__.leg)
mimi.__proto__.leg = 4;
mimi.constructor.prototype.leg = 5;

console.log('mimi.__proto__.leg  ' + mimi.__proto__.leg)
console.log('mimi.constructor.prototype.leg   ' + mimi.constructor.prototype.leg )

console.dir('Object.getPrototypeOf:' + Object.getPrototypeOf(mimi))

var f = function (){};
var a = {};

f.prototype = a;
var o = new f();

console.log(o.__proto__ === a);

//对象的原生属性
console.log(Object.getOwnPropertyNames(Date))
console.log(Object.keys(Date))
console.log(Date.hasOwnProperty('length'))
console.log(Date.hasOwnProperty('toString'))

//判断一个对象是否具有某个属性（不管是自身的还是继承的），使用in运算符
console.log('length in Date ' + ("length" in Date));

var obj = {p1 : 'a'}
var aObj = Object.create(obj, {p2:{value:'b', enumerable: true}});
for(var i in aObj){
	console.log(i + ':' +aObj[i])
}

console.log('-------------------object-------------------')
for ( var name in (new Object()) ) {
  console.log(name)
  if ( object.hasOwnProperty(name) ) {
  	console.log('hasOwnProperty:' + name)
  }
}

function inheritedPropertyNames(obj) {
  var props = {};
  while(obj) {
    Object.getOwnPropertyNames(obj).forEach(function(p) {
      props[p] = true;
    });
    obj = Object.getPrototypeOf(obj);
  }
  return Object.getOwnPropertyNames(props);
}

console.log(inheritedPropertyNames(Date));

function copyObject(orig) {
  var copy = Object.create(Object.getPrototypeOf(orig));
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}
/*
语法：
Object.defineProperty(obj, prop, descriptor)
参数：
obj:目标对象
prop:需要定义的属性或方法的名字。
descriptor:目标属性所拥有的特性。
可供定义的特性列表：
value:属性的值
writable:如果为false，属性的值就不能被重写。
get: 一旦目标属性被访问就会调回此方法，并将此方法的运算结果返回用户。
set:一旦目标属性被赋值，就会调回此方法。
configurable:如果为false，则任何尝试删除目标属性或修改属性以下特性（writable, configurable, enumerable）的行为将被无效化。
enumerable:是否能在for...in循环中遍历出来或在Object.keys中列举出来。
*/
function copyOwnPropertiesFrom(target, source) {
  Object
  .getOwnPropertyNames(source)
  .forEach(function(propKey) {
    var desc = Object.getOwnPropertyDescriptor(source, propKey);
    Object.defineProperty(target, propKey, desc);
  });
  return target;
}

var copyedObject = copyObject(aObj);
console.log(inheritedPropertyNames(copyedObject));

function M1(prop) {
  this.hello = prop;
}

function M2(prop) {
  this.world = prop;
}

function S(p1, p2) {
  this.base1 = M1;
  this.base1(p1);
  this.base2 = M2;
  this.base2(p2);
}
S.prototype = new M1();

var s = new S(111, 222);
s.hello // 111
s.world // 222