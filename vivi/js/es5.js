function Poker(style, title, value) {  
    this.Style = style;  
    this.Title = title;  
    this.Value = value;  
}  
//Object.create(prototype, descriptors)
var pokerA = Object.create(new Poker('heart', 'K', 1));

console.log(pokerA.constructor);
console.log(pokerA.constructor);
console.log(pokerA.constructor.protptype);
console.log(pokerA.protptype);

if (typeof Object.create !== 'function') {  
    Object.create = function(o) {  
        function F() { }  
        F.prototype = o;  
return new F();  
    };  
}  

//这种用法不对，get会出现死循环
//Object.defineProperty(object, propertyname, descriptor)
/*
Object.defineProperty(pokerA, 'State', 
						{value:'normal', //值 默认是undefined  
						 writable:true,  //值是否只读 默认是false
						 enumerable:false, //值是否可以被枚举 默认false  
						 configurable:true}); //属性是否可以被改说删除 默认false  
						 
console.log(pokerA.State);

//如果我们需要对赋值或取值有更多出来，可以给定set和get函数，不过set/get不能和value、writable同时使用

Object.defineProperty(pokerA, 'State', 
						{//writable:true,  //值是否只读 默认是false
						 enumerable:true, //值是否可以被枚举 默认false  
						 configurable:true,
						 set: function(x){
								 this.state = x+x; 
						 },
						 get:function(){
							 return this.State;
						 }});
pokerA.State=10; 
var k = pokerAs.State + 1;
console.log(k);
*/

function setPokerState(poker, proValue) {  
    if (arguments[0] instanceof Poker) {  
        Object.defineProperty(arguments[0], //为一个对象设置一个属性  
    "State", //属性名称是字符串  
    {//一组修饰对象  
    enumerable: false, //值是否可以被枚举 默认false  
    configurable: true, //属性是否可以被改说删除 默认false  
    set: function(x) {  
        this.state = x <= 5 ? x : 5;  
    },  
    get: function() {  
       return this.state;  
    }  
}  
)  
    }  
}  

var PokerB = Object.create(new Poker("club", "B", 14));  
setPokerState(PokerB,'');
PokerB.State=10;  
console.log(PokerB.State);


var pokerC = Object.create(new Poker("club", "C", 15));  
Object.defineProperties(  
	pokerC,  
	{  
		"backgroundImg": {  
			value: "images\\common\\hide.png",  
			enumerable: false, //不可以for 遍历    
			writable: false//只读    
		},  
		"forgroundImg": {  
			value: "images\\spade\\K.png",  
			enumerable: false, //不可以for 遍历    
			writable: false//只读    
		},  
		"Image": {  
			get: function() {  
				return this.State == 0 ? this.backgroundImg : this.forgroundImg;  
			},  
			enumerable: true  
		}  
	}  
);  

console.log(pokerC.backgroundImg)
console.log(pokerC.forgroundImg)
//这行代码没有用，因为forgroundImg是只读的
pokerC.forgroundImg = "images1\\spade\\K.png"
console.log(pokerC.Image)
pokerC.State = 1;
console.log(pokerC.State);

for(var key in pokerC){
	console.log(key);
}
console.log('----- getOwnPropertyNames -----');
var pokerD = Object.create(new Poker("club", "D", 15));  
var names = Object.getOwnPropertyNames(pokerD);  
console.log('names'+names.length)
for (var i = 0; i < names.length; i++) {  
    console.log(names[i] + "\n" +  
    Object.getOwnPropertyDescriptor(pokerD, names[i])  
    );  
}  
console.log("isExtensible and preventExtensions: 防止新的属性添加到对象")
console.log(Object.isExtensible(pokerD)); //true  
Object.preventExtensions(pokerD);  
console.log(Object.isExtensible(pokerD)); //false  

console.log("isSealed and seal: 不能添加和删除属性")
console.log(Object.isSealed(pokerD)); //true  
Object.seal(pokerD);  
console.log(Object.isSealed(pokerD)); //false  

console.log("freeze and isFrozen: 防止现有属性和属性值的修改，并防止新特性的添加")
console.log(Object.isFrozen(pokerD)); //true  
Object.freeze(pokerD);  
console.log(Object.isFrozen(pokerD)); //false  
console.log('getPrototypeOf');
console.log(Object.getPrototypeOf(pokerD))