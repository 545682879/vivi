//1. let和const命令
//let只在let命令所在的代码块内有效
for (let i = 0; i < 10; i++) {}
console.log(i);  //ReferenceError: i is not defined

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

for(let i=0; i < 10; i++){
	a[i] = function(){
		console.log(i);
	}
}
a[6](); //6

//不存在变量提升 var会有变量提升，let没有变量提升
console.log(foo); // 输出undefined
console.log(bar); // 报错ReferenceError

var foo = 2;
let bar = 2;

//暂时性死区， 
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;  //在作用域里又声明了tmp，出现暂时性死区，如果没有重新定义，不会出现暂时性死区
}

typeof x; // ReferenceError
let x;

function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错

//不允许重复声明 ES6的块级作用域 块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了
{{{{
  let insane = 'insane out';
  {let insane = 'insane in'}
  console.log(insane); //insane out
}}}};


function f() { console.log('I am outside!'); }
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

//上面代码在ES5中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。
//ES6的运行结果就完全不一样了，会得到“I am outside!”
//在Chrome环境下,上面的代码运行的时候会报f未定义的错误,转换成
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());

// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}


//const命令声明的常量也是不提升，同样存在暂时性死区
//const 指向一个对象。
const p = {a:'a'}
p.b = "b"
p = {l : 'l'} //报错

//深度冻结
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, value) => {
    if ( typeof obj[key] === 'object' ) {
      constantize( obj[key] );
    }
  });
};

//var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined

var deepFrozen = (obj) => 
{ Object.freeze(obj);
  for(let o in obj){ 
    console.log(typeof obj[o]); 
    if(typeof obj[o] === 'object'){
      deepFrozen(obj[o]);
    }
  }
}