123..toString();
123.0.toString();
123 .toString();
(123).toString();

//空字符串转换成数字：
//+ 号将对象强制转换为数字
Number(undefined) //NaN
Number(null) //0
Number(false) //0
Number(true) //1
Number("") //0
Number("\t\v\r 3.141 \n") //3.141
Number({})  //NaN
Number([]) //0
Number(['123', '234']) //NaN
Number(['123']) //123
Number(['abc', 'edr']) //NaN

//转换成数字
~~true == 1
~~false == 0
~~"" == 0
~~[] == 0
~~undefined ==0
~~!undefined == 1
~~null == 0
~~!null == 1
~~[123] //123
~~['123'] //123
~~{} //0
~~"0.1"  //0
~~"1.6"  //1

//对非字符使用parseFloat效率极低，因为在解析之前会将其转换成字符串。
parseFloat(true) //NaN
Number(true)     //1
parseFloat(null) //NaN
Number(null)     //0
parseFloat('')   //NaN
Number('')       //0
parseFloat('123.45#')  //123.45
Number('123.45#')	//NaN
parseFloat('\t\v\r12.34\n')
parseFloat({})   //NaN
parseFloat([]) //NaN
parseFloat([1]) //1
parseFloat([1,2]) //1


//特殊的数字值： NaN Infinity
typeof NaN // number
function a(){return 'a'}
typeof a   //"function"
var obj = {}
typeof obj //"object"
var arr = [0, 1, 2]
typeof arr //"object"

//产生NaN的值
Number('xyz')
Number(undefined)
Math.acos(2), Math.log(-1), Math.sqrt(-1)

NaN + 3  //NaN
25 / NaN //NaN

NaN === NaN  //false
[NaN].indexOf(NaN)  //-1

isNaN(NaN)   //true
isNaN(33)    //false
isNaN('xyz') //true

function myIsNaN(value){
	return typeof value === 'number' && isNaN(value);
}
function myIsNaN(value){
	return value !== value;   //NaN 是唯一有这样特征的值
}

// NaN 和任意值（包括自身）比较都是无序的


//Infinity
3 / 0  //Infinity
3 / -0 //Infinity 
Infinity + Infinity  //Infinity
Infinity * Infinity  //Infinity

var x = Infinity;
x === Infinity  //true

//检查一个值是否是实际的值
isFinite(5)   //true
isFinite(Infinity)  //false
isFinite(NaN)  //false

isFinite('a')   //false
isFinite([])    //true
isFinite('123.45')  //true
isFinite(null)  //true
isFinite(undefined)  //false
isFinite('123.45.6')  //false


// 有两个0
//区分两个0
var negInf = (10/-0); //-Infinity
10/-0 < 0 //true
var negInf = (10/0); //Infinity
10/0 > 0 //true

-0 === +0
[ -0, +0 ].indexOf(+0)  //0
(-0).toString()  //0

//数字的内部表示
//(-1)(sign) * %1.fraction * 2(exponent)
//sign --> 第63位
//exponent --> 占11位， 52 ~ 62位
//fraction  -- > 52位， 52 ~ 0 位
//指数e的范围 -1023 ~~ 1024  处理舍入错误

//整数的范围 （-2e53 - 2e53)
//数组索引 [0, 2(32) -1]
//按位运算符  >>>(无符号右移运算符) [0, 2e32]  
//其他的所有按位运算符[-2(31), 2(31)]
//字符码  UTF-16  以数字组成单元，可以用于 String.fromCharCode(), String.prototype.charCodeAt()

//ECMAScript 6 提供 
//Number.MAX_SAFE_INTEGER = Math.pow(2, 53) -1 ;
//Number.MIN_SAFE_INTEGER = - Number.MAX_SAFE_INTEGER ;

Number.isSafeInteger = function(n){
	return (type n === 'number' && Math.round(n) === n &&  Number.MIN_SAFE_INTEGER <= n && n >= Number.MIN_SAFE_INTEGER) 
}

//将数字转换成整数
Math.floor(3.8)    //3
Math.floor(-3.8)   //-4

Math.ceil(3.2)     //4
Math.ceil(-3.2)    //-3

Math.round(3.2)    //3
Math.round(3.5)    //4
Math.round(3.8)    //4

Math.ceil(x+0.5)  == Math.round(x)

// ECMAScript 中的 ToInterger() 方法
ToInteger(3.2)  //3
ToInteger(3.5)  //3
ToInteger(3.8)  //3
ToInteger(-3.2)  //-3
ToInteger(-3.5)  //-3
ToInteger(-3.8)  //-3

// sign(number) * floor(abs(number))

function ToInteger(x){
	x = Number(x);
	return x < 0 ? Math.ceil(x) : Math.floor(x);
}

//通过或（|）  强制转换成一个有符号的32位整数
function ToInt32(x){
	return x | 0;
}

ToInt32(1.001)    //1
ToInt32(1.999)    //1
ToInt32(1)   //1
ToInt32(-1)  //-1
ToInt32(Math.pow(2, 32) + 1)  //1
ToInt32(Math.pow(2, 32) - 1)  //-1

//通过或（|）  强制转换成一个有符号的32位整数
function ToInt32(x){
	return x | 0;
}

ToInt32(1.001)    //1
ToInt32(1.999)    //1
ToInt32(1)   //1
ToInt32(-1)  //-1
ToInt32(Math.pow(2, 32) + 1)  //1
ToInt32(Math.pow(2, 32) - 1)  //-1

function ToInt32(x){
	return x << 0;  
	//return x >> 0;  或者
}

function ToUnit32(){
	return x >>> 0;
}

ToInt32(1.001)  //1
ToInt32(54534534.001)  //54534534

ToUnit32(-1) //4294967295
ToUnit32(-1) //4294967295


ToUnit32(-1)  //4294967295
ToUnit32(Math.pow(2, 32) -1)  //4294967295
ToUnit32(Math.pow(2, 32))  //0


//通过parseInt() 得到整数
//parseInt(str, radix)  2 <= radix <= 36
//不要用parseInt将浮点数转换成整数
parseInt(10000000000000000000.5, 10)   //10000000000000000000
parseInt(100000000000000000000000.5, 10)  //1

//parseInt 会先将参数转换成字符串，然后在解析

parseInt("")  // NaN
parseInt('zz' , 36) //1295
parseInt("   81", 10)  //81
parseInt('12**', 10)  //12
parseInt('12.34', 10)  //12
parseInt('**12', 10)   //NaN

parseInt('0xA')  //10
parseInt('0xA', 16)  //10
parseInt('A', 16)  //10

parseInt('010')  //8
parseInt('0109') //8
parseInt([9,2]) //9
parseInt([8])  //8
parseInt([])  //NaN
parseInt({})  //NaN
parseInt(true) //NaN

//以0x开头， 16进制； 以0开头， 8进制。

typeof Number('123')  //"number"
typeof new Number('123')  //"object"

//Number 原型方法
Number.prototype.foFixed();  //返回不使用指数表示的数字, 舍入到小数点后第fractionDigits位
0.0000003.toFixed(10)   // '0.0000003000' 默认参数为0

Number.prototype.toPrecision();  //返回不使用指数表示的数字
1234..toPrecision(3)    // 1.23e+3
1234..toPrecision(4)    //1234
1234..toPrecision(5)    //1234.0
1.234.toPrecision(3)    //1.23
1.235.toPrecision(3)	//1.24

Number.prototype.toString();

0.0000003.toString()  //3e-7 ; 

Number.prototype.toExponential();
15..toString(2)
65535..toString(16)
1234567890..toString(36) //kf12oi

//在数字的小数点前有多余21个数字
1234567890123456789012..toString(10)  //1.2345678901234568e+21
123456789012345678901..toString(10)  //"123456789012345680000"

//如果一个数字一0开头， 并且紧跟了超过多余5个0 和一个非0 的数字
0.0000003.toString()   //3e-7
0.000003.toString()  //0.000003

1234567890123456789012.toExponential(20)

1234..toExponential(5)  //"1.23400e+3"
1234..toExponential()   //"1.234e+3"

// divistion
function accDiv(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  with(Math){
	  r1=Number(arg1.toString().replace(".",""))
	  r2=Number(arg2.toString().replace(".",""))
	  return (r1/r2)*pow(10,t2-t1);
  }
}

// multiply
function accMul(arg1,arg2){
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

// add
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
}

// sub
function accSub(arg1, arg2) {
	var r1, r2, m, n;
	try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
	try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
	m = Math.pow(10, Math.max(r1, r2));
	//last modify by deeka
	//动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}