// 1.构造函数
function createFunction(name){
	this.name = name;
	this.value = 'white';
}

var aFunction = new createFunction('vivichen');
console.info('Function name:' + aFunction.name);
console.info('Function value:' + aFunction.value);

// 2.prototype属性
//
function Animal (name) {
  this.name = name;
}


Animal.prototype.color = "white";


Animal.prototype.walk = function () {
  console.log(this.name + ' is walking.');
};


var aAnimal = new Animal('vivichen');
console.info('Animal name:' + aAnimal.name);
console.info('Animal color:' + aAnimal.color);


console.info('pepole ' + aAnimal.walk());

// 3.原型链
//Object.getPrototypeOf
function MyArray (){}

MyArray.prototype = new Array();
console.log('mine.prototype' + MyArray.prototype);
console.log('mine.type' + (typeof MyArray));

//MyArray.prototype.constructor = MyArray;
var mine = new MyArray();
mine.push(1, 2, 3);

console.log('mine.length' + mine.length) // 3


console.log('mine instanceof Array ' + (mine instanceof Array)) // true
console.log('mine instanceof MyArray ' + (mine instanceof MyArray)) 

console.log(MyArray.prototype.constructor === Array);
console.log(Array.prototype.constructor === Array);
console.log(Object.prototype.constructor === Array);

// 4. constructor属性;
//constructor属性的作用是分辨prototype对象到底定义在哪个构造函数上面
function P() {this.k = 'I am K!'}
P.prototype.M = 'I am M!'

var p = new P();

console.log(p.constructor)
// function P() {}

console.log('p.constructor === P.prototype.constructor :'+ (p.constructor === P.prototype.constructor))
// true

console.log('p.constructor === P :'+ (p.constructor === P))
// true

console.log('constructor' + p.hasOwnProperty('constructor'))
console.log('constructor k' + p.hasOwnProperty('k'))
console.log('constructor M' + p.hasOwnProperty('M'))
console.log('constructor prototype k' + P.prototype.hasOwnProperty('k'))
console.log('constructor prototype M' + P.prototype.hasOwnProperty('M'))
console.log('constructor prototype' + P.prototype.hasOwnProperty('constructor'))
console.log('P constructor' + P.hasOwnProperty('constructor'))
console.log(P.prototype.__proto__);
// false


// 5. Object.getPrototypeOf方法

// 空对象的原型是Object.prototype
Object.getPrototypeOf({}) === Object.prototype
console.log('Object.getPrototypeOf({}) === Object : ' + (Object.getPrototypeOf({}) === Object.prototype))
console.log('Object.getPrototypeOf({})' + Object.getPrototypeOf({}))
// true

// 函数的原型是Function.prototype
function f() {}
Object.getPrototypeOf(f) === Function.prototype
console.log('Object.getPrototypeOf(f) === Function.prototype : ' + (Object.getPrototypeOf(f) === Function.prototype))
// true

// 假定F为构造函数，f为F的实例对象
// 那么，f的原型是F.prototype
//var f = new F();
//Object.getPrototypeOf(f) === F.prototype
// true

// 5.Object.create
var newCreateObject = {p:1};
var newCreateObject1 = new Object();
newCreateObject1.p =1;
function newCreateObjectFunc(){
	this.p = 1;
}

var ob1 = Object.create(newCreateObject)
var ob2 = Object.create(newCreateObject1)
var ob3 = new newCreateObjectFunc()
console.log('ob1:' + ob1.p);
console.log('ob1:' + ob2.p);
console.log('ob1:' + ob3.p);

/*
if (typeof Object.create !== "function") {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
*/

var o1 = Object.create({})
var o2 = Object.create(Object.prototype)
var o3 = new Object();
//不继承任何属性和
var o = Object.create(null);
//Object.create() 有错误

var oo1 = { p: 1 };
var oo2 = Object.create(oo1);
console.log('oo2:' + oo2.p);
oo1.p = 2;
console.log('oo2:' + oo2.p);


//除了对象的原型，Object.create方法还可以接受第二个参数，表示描述属性的attributes对象，跟用在Object.defineProperties方法的格式是一样的

var o = Object.create(Object.prototype, {
  p1: { value: 123, enumerable: true },
  p2: { value: "abc", enumerable: true }
});
/*
var o = Object.create( {
  p1: 123,
  p2: "abc"
});
*/
console.log('o.p1:' + o.p1);
console.log('o.p2:' + o.p2);
o.p1 = 456;
var oa1 = Object.create(o);
console.log('o.p1:' + o.p1);
console.log('oa1.p1:' + oa1.p1);
//为什么没有用

// 6. isPrototypeOf
//isPrototypeOf方法用来判断一个对象是否是另一个对象的原型
var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

console.log(o2.isPrototypeOf(o3)) // true
console.log(o1.isPrototypeOf(o3)) // true

