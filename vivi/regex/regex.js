//特殊字符：\ ^ $ . * + ? () [] {} |
var a = /^\(abc\)/.test('abc');
console.log(a)

// . 匹配出换行符之外的任意字符
// 字符分类转义 
// \f \n \r \t \v
// \cA - \cZ 控制字符， Unicode转义字符 \u0000-\uFFFF 
// 十六进制字符转义 \x00 - \xFF 
// 字符分类转义
// \d 任意数字  \D任意非数字 \w 字母数字字符 \W非字母数字字符 \s 匹配空白字符 \S 匹配非空白字符

// 原子：字符类 ［ABC］［^abc］
// 有三个字符不是原字符 \ ] -, 可以匹配非转义的－，但必须是［ 后的第一个字符
// \b ： 在字符分类外，匹配单词边界，在字符分类内，匹配退格控制字符
/[\\]/.test('\\')

/[\\]/.test('\\')

/[a-b]/.test('-') //false

/[a-]/.test('-') //true

/[a\]]/.test(']') //true

//分组
// （abc） 捕获分组  （？：） 非捕获分组  \1 \2 反向引用


/(abc)/.exec('abc')  //["abc", "abc"]
/(?:abc)/.exec('abc')  //["abc"]

/^(a+)-\1$/.test('a-a')  //true
/^(?:a+)-\1$/.test('a-a')  //false

/<([^>])+>[^<]*<\/\1>/.test('<a>')

/^<([^>])+>([^<]*<\/\1>)?$/.test('<a></a>')

// 量词
// ?, *, +, {n}, {n, m}, {n, }  后加？变成非贪婪匹配ßß
"<a><strong>".match(/^<(.*)>/);  //贪婪匹配 ["<a><strong>", "a><strong"]
"<a><strong>".match(/^<(.*?)>/);  //非贪婪匹配["<a>", "a"]

//断言 ^ $ \b \B (?=abc) (?!abc)
/\babc\b/.test('abc') //true

/\Babc\B/.test('abc')

// 正向肯定断言
/abc(?=de)/.exec('abcdef')  //["abc"]
// 正向否定断言
/abc(?!de)/.exec('abcdef')  //null

//析取 ｜ 


//创建正则表达式
//字面量 /zyz/i
//构造函数  new Regexp（’［’）
//字面量在加载是编译， 构造函数在运行时编译 eg: function foo(){/[/}  报错, function foo(){new RexExp('[')}  编译时不会报错

//正则表达式的实例属性
// global, ignoreCase, multiline
// lastIndex


//方法
//是否存在匹配
RegExp.prototype.test

var reg = /x/g ;
console.log(reg.lastIndex);  // 0

reg.test('_x_x');
console.log(reg.lastIndex);  // 2

reg.test('_x_x');
console.log(reg.lastIndex);  // 4

reg.test('_x_x');  //false


console.log(reg.lastIndex);  // 0

reg.exec('_x_x');  //["x"]
console.log(reg.lastIndex);  // 2

reg.exec('_x_x'); //["x"]
console.log(reg.lastIndex);  // 4

reg.exec('_x_x');  //null

RegExp.prototype.exec

//exec 的属性 
// 数组元素 0 － 匹配结果， 1-n 捕获的分组
var regex = /a(b+)/ ;

var result = regex.exec('_abbb_ab');
//result  ["abbb", "bbb"]
result.index //1
result.input //"_abbb_ab"

// 如果 regex = /a(b+)/g ，可以多次运行regex.exec('_abbb_ab')，如上面的例子，再次运行，得到结果  ［‘ab’， ‘a’］

String.prototype.match

var matchTest = /(\d)+/;
var result1 = "aa11bb22cc33".match(matchTest);
//result1: ["11", "1"]
result1.index  //2
result1.input  //"aa11bb22cc33"

var matchTest1 = /(\d)+/g;
var result2 = "aa11bb22cc33".match(matchTest1);

// result2 ["11", "22", "33"]
result2.index //undefined
result2.input //"aa11bb22cc33"

String.prototype.replace
//str.replace(search, replacement)
//search 字符串（只能匹配一次）， 正则表达式：可以用g匹配多次
//replacement 字符串或函数

// replace为字符串
// 特殊字符$
// $n 匹配分组， n必须至少为1
// $匹配的子字符串  $`（匹配项前的文本）  $& (完整的匹配项)  $' （匹配项后的文本）
// $$ 插入单个$ 字符

"axb cxd".replace(/x/g, "[$` ,$&, $']")  //"a[a ,x, b cxd]b c[axb c ,x, d]d"
"axb cxd".replace(/x/g, "[$` ,$&, $']")  //"a[a ,x, b cxd]b c[axb c ,x, d]d"

//当replacement为函数时
"axxb cxxxd".replace(/x/g, "[$` ,$&, $']")

"axxb cxxxd".replace(/(x+)/g, function(completeMatch, g1, offset, inputStr){
	console.log(completeMatch, g1, offset, inputStr);
});

//VM101:2 xx xx 1 axxb cxxxd
//VM101:2 xxx xxx 6 axxb cxxxd

function insertName(str, name){
	return str.replace(/NAME/g, function(completeMatch, offset){
		if(offset === 0 || (offset > 0 && str[offset-1] !== '"')){
			return name;
		}else{
			return completeMatch;
		}
	});
}

insertName('NAME "NAME"', 'Jane');  // 'Jane "NAME"'

function insertName1(str, name){
	var tempPrefix = ' ';
	str = tempPrefix + str;
	str = str.replace(/([^"]NAME)/g, function(completeMatch, prefix){
		return prefix + name;
	});
	return str.slice(tempPrefix.length);
}