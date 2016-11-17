const [first, ...rest] = [1, 2, 3, 4, 5]
first  //1
rest   //[2, 3, 4, 5]
[...'hello']  //["h", "e", "l", "l", "o"]
[...'x\uD83D\uDE80y']  //["x", "🚀", "y"]
'x\uD83D\uDE80y'  //"x🚀y"
let str = 'x\uD83D\uDE80y';
let str1 = 'x\uD83D\uDE80\uD83D\uDE80y';
[...str1].reverse().join('')  //"y🚀🚀x"
let str2 = 'x\uD83D\uDE80\uD83F\uDE80y';  
[...str2].reverse().join('')  //"y🺀🚀x"
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
};

Array.from(arrayLike)  //["a", "b", "c"]

//[...arrayLike]

[1,2,3].map(x => x * x);  //[1, 4, 9]