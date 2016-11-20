class A{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	getName(){
		console.log(this.name);
	}

	getAge(){
		console.log(this.age);
	}

	setName(name){
		this.name = name;
	}

	setAge(age){
		this.age = age;
	}

    toString(){
    	console.log(this.name, this.age)
    }
}

class B extends A{
	constructor(name, age, staff){
		super(name, age);
		this.staff = staff;
	}

	getStaff(){
		console.log(this.staff);
	}

	setStaff(staff){
		this.staff = staff;
	}

	toString(){
		super.toString();
		console.log(this.staff);
	}
}


class AA {
	constructor(msg){
		this.msg = msg;
	}
	getMsg(){
		console.log(this.msg);
	}
}

class BB {
}

Object.setPrototypeOf(BB.prototype, AA.prototype);
Object.setPrototypeOf(BB, AA);

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;

Object.setPrototypeOf(B, A);
// 等同于
B.__proto__ = A;



class AAA extends Object {
}


class AAAA extends null {
}


AAA.prototype //Object {}
AAA.prototype.__proto__ === Object.prototype // true
AAA.__proto__ //functon Object() { [native code] }

AAAA.prototype //Object {}
AAAA.__proto__  //functon() {}
AAAA.prototype.__proto__ === undefined

class AAAAA {
}

AAAAA.__proto__ === Function.prototype // true
AAAAA.prototype.__proto__ === Object.prototype // true

Object.getPrototypeOf(AAAAA)   //function() {}
Object.getPrototypeOf(AAAA)    //function() {}
Object.getPrototypeOf(AAA)  //Object() { [native code] } 
Object.getPrototypeOf(AA)  //function() {}
Object.getPrototypeOf(BB)
/*
function class AA {
	constructor(msg){
		this.msg = msg;
	}
	getMsg(){
		console.log(this.msg);
	}
}
*/
Object.getPrototypeOf(B)

/*
function class A{
	constructor(name, age){
		this.name = name;
		this.age = age;
	}

	getName(){
		console.log(this.name);
	}

	getAge(){
		console.log(this.age);
	}

	setName(name){
		this.name = name;
	}

	s…
*/

class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}
var o = new NewObj({attr: true});
console.log(o.attr === true);  // false
//上面代码中，NewObj继承了Object，但是无法通过super方法向父类Object传参。这是因为ES6改变了Object构造函数的行为，一旦发现Object方法不是通过new Object()这种形式调用，ES6规定Object构造函数会忽略参数

class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod();
//静态方法只能通过类来调用，并且可以继承
//"hello, too"
