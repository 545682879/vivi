//JavaScript允许采用\uxxxx形式表示一个字符,但是，这种表示法只限于\u0000——\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表达
//es6可以表示超过4个字符的方法
"\u{20BB7}"  //"𠮷"

"\uD842\uDFB7"  //"𠮷"

"\u{41}\u{42}\u{43}" //ABC

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'

'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

//codePointAt()  ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点
var s = "𠮷";
//汉字“𠮷”的码点是0x20BB7，UTF-16编码为0xD842 0xDFB7（十进制为55362 57271），需要4个字节储存
s.length // 2
s.charAt(0) // ''
s.charAt(1) // ''
s.charCodeAt(0) // 55362
s.charCodeAt(1) // 57271

var s = '𠮷a';
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.charCodeAt(2) // 97


s.codePointAt(0).toString(16) // "20bb7"
s.charCodeAt(2).toString(16) // "61"

//位置不正确，解决这个问题的一个办法是使用for...of循环
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}

//odePointAt方法是测试一个字符由两个字节还是由四个字节组成
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

//不能解析4个字节的unicode编码
String.fromCharCode('0x20BB7')

//可以解析4个字节的unicode编码

String.fromCodePoint('0x20BB7')  //"x🚀y"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'

for (let codePoint of 'foo') {
  console.log(codePoint)
}

for (let codePoint of '𠮷a') {
  console.log(codePoint)
}

//includes(), startsWith(), endsWith() , endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束
var s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false

//repeat() 
'x'.repeat(3) //xxx
'na'.repeat(2.9) //nana
'na'.repeat('3') //nanana

'nanana'.repeat(Infinity) //"Error
'nanana'.repeat(-1) //Error

'nanana'.repeat(NaN) //""
'nanana'.repeat(0) //""
'na'.repeat('na')  //""
'nanana'.repeat(-0.8) //""

//padStart()，padEnd() 

//字符模板
var basket = {count:"count", onSale:"onSale"}
`There are <b>${basket.count}</b> items in your basket, <em>${basket.onSale}</em> are on sale!`
//"There are <b>count</b> items in your basket, <em>onSale</em> are on sale!"


`In JavaScript '\n' is a line-feed.`
// "In JavaScript '
// ' is a line-feed."
var greeting = `\`Yo\` World!`
//"`Yo` World!"

var x = 1;
var y = 2;

console.log(`${x} + ${y} = ${x + y}`) 
// "1 + 2 = 3"

console.log(`${x} + ${y * 2} = ${x + y * 2}`)
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
console.log(`${obj.x + obj.y}`)

function fn() {
  return "Hello World";
}

`foo ${fn()} bar`

const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

