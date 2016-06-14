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


// 有两个0
//区分两个0
var negInf = (10/-0); //-Infinity
10/-0 < 0 //true
var negInf = (10/0); //Infinity
10/0 > 0 //true

