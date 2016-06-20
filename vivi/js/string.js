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

123.toString()

// 更倾向于使用 String
String(false)  //false
String(3.75)  //3.75
String({first:'jone', last: 'Doe'})  //[Object Object]
String(['a', 'b', 'c'])  //a,b,c

