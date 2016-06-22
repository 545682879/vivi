var a = {} + {} ;//[object Object][object Object]
var b = [] + []; // ""
var c = {a:'1'} + {b:'2'} ;// "[object Object][object Object]"
var d = [] + 3; //"3"

//字符串避免换行
/*
var str = 'written \ 
over \
multiple \
lines';
console.log(str) */

var str1 = "written " +
"over " +
"multiple "  +
"lines";
console.log(str1)


//转义序列
// 除 \' \" \\ b f n r t v x u  以外的字符度属于它本身
// NUL \0
// \x4D  -->  M
// \u004D  -->  M

// 手动转换为字符串
String(123)

""+123

123..toString();

// 更倾向于使用 String
String(false)  //false
String(3.75)  //3.75
String({first:'jone', last: 'Doe'})  //[Object Object]
String(['a', 'b', 'c'])  //a,b,c

var temp = {a:'a', b:'b', getA: function(){
	return console.log('a:' + this.a);
}};

temp.getA();

var tempa = JSON.stringify(temp);
console.log(tempa);
// {"a":"a","b":"b"}

"B".localeCompare("A") //1
"B".localeCompare("a") //1

typeof String(123)  //string
typeof new String(123)  //object

//字符串构造器方法
String.fromCharCode(97, 98, 99) //"abc"
String.fromCharCode.apply(null, [97, 98, 99]) //"abc"


"abc".charAt(1) //b
"abc"[0]  //a

"abc".split("").map(function(item, index){return item.charCodeAt(0)})  //[97, 98, 99]
"abc".charCodeAt(1)

"abcdefg".slice(2)  //cdefg
"abcdefg".slice(2,5)  //cde  2,3,4
"abcdefg".slice(-2)  //fg

"abcdefg".substring(2)  //cdefg
"abcdefg".substring(2,5)  //cde  2,3,4
"abcdefg".substring(-2)  //abcdefg
"abcdefg".substring(6)  //g
"abcdefg".substring(7)  //""

"a, b,c, d".split(",")  //["a", " b", "c", " d"]
"a, b,c, d".split(",", 3) //["a", " b", "c"]
"a, b,c, d".split(/\s*,\s*/) //["a", "b", "c", "d"]
"a, b,c, d".split() //["a, b,c, d"]

"\r\nabc \t".trim()  //abc

"hello".concat(" ", "world", "!")  //"hello world!"

"andfDFEEW".toLowerCase()  //andfdfeew
"andfDFEEW".toLocaleLowerCase()  //"andfdfeew"

"andfDFEEW".toUpperCase()  //ANDFDFEEW
"andfDFEEW".toLocaleUpperCase()  //"ANDFDFEEW"

"aXaX".indexOf("X") //1
"aXaX".indexOf("X", 2) //3

"aXaX".lastIndexOf("X") //3
"aXaX".lastIndexOf("X", 2) //1

"apple".localeCompare("banana")  //-1

//支持正则表达式的方法
"-yy-xxx-y-".search("x+")  //4
"-yy-xxx-y-".search(/x+/)  //4

"-abb-aaab-".match(/(a+)b/)  //["ab", "a"] index, input
"-abb-aaab-".match(/(a+)b/g)  //["ab", "aaab"]

"ab-aab-aaab-aaaab".replace(/a+b/, function(){
	console.log(arguments);   //["ab", 0, "ab-aab-aaab-aaaab"]
});

"ab-aab-aaab-aaaab".replace(/a+b/g, function(arg1,arg2,arg3){
	console.log(arg1,arg2,arg3)
	//console.log(arguments);   
	//["ab", 0, "ab-aab-aaab-aaaab"]
	//["aab", 3, "ab-aab-aaab-aaaab"]
	//["aaab", 7, "ab-aab-aaab-aaaab"]
	//["aaaab", 12, "ab-aab-aaab-aaaab"]

});

"ab-aab-aaab-aaaab".replace(/a+b/g, function(arg1,arg2,arg3){ 
	return "(" + arg1.toUpperCase() + ")" ; 
});
//(AB)-(AAB)-(AAAB)-(AAAAB)