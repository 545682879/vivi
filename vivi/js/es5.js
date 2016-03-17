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

//�����÷����ԣ�get�������ѭ��
//Object.defineProperty(object, propertyname, descriptor)
/*
Object.defineProperty(pokerA, 'State', 
						{value:'normal', //ֵ Ĭ����undefined  
						 writable:true,  //ֵ�Ƿ�ֻ�� Ĭ����false
						 enumerable:false, //ֵ�Ƿ���Ա�ö�� Ĭ��false  
						 configurable:true}); //�����Ƿ���Ա���˵ɾ�� Ĭ��false  
						 
console.log(pokerA.State);

//���������Ҫ�Ը�ֵ��ȡֵ�и�����������Ը���set��get����������set/get���ܺ�value��writableͬʱʹ��

Object.defineProperty(pokerA, 'State', 
						{//writable:true,  //ֵ�Ƿ�ֻ�� Ĭ����false
						 enumerable:true, //ֵ�Ƿ���Ա�ö�� Ĭ��false  
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
        Object.defineProperty(arguments[0], //Ϊһ����������һ������  
    "State", //�����������ַ���  
    {//һ�����ζ���  
    enumerable: false, //ֵ�Ƿ���Ա�ö�� Ĭ��false  
    configurable: true, //�����Ƿ���Ա���˵ɾ�� Ĭ��false  
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
			enumerable: false, //������for ����    
			writable: false//ֻ��    
		},  
		"forgroundImg": {  
			value: "images\\spade\\K.png",  
			enumerable: false, //������for ����    
			writable: false//ֻ��    
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
//���д���û���ã���ΪforgroundImg��ֻ����
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
console.log("isExtensible and preventExtensions: ��ֹ�µ�������ӵ�����")
console.log(Object.isExtensible(pokerD)); //true  
Object.preventExtensions(pokerD);  
console.log(Object.isExtensible(pokerD)); //false  

console.log("isSealed and seal: ������Ӻ�ɾ������")
console.log(Object.isSealed(pokerD)); //true  
Object.seal(pokerD);  
console.log(Object.isSealed(pokerD)); //false  

console.log("freeze and isFrozen: ��ֹ�������Ժ�����ֵ���޸ģ�����ֹ�����Ե����")
console.log(Object.isFrozen(pokerD)); //true  
Object.freeze(pokerD);  
console.log(Object.isFrozen(pokerD)); //false  
console.log('getPrototypeOf');
console.log(Object.getPrototypeOf(pokerD))