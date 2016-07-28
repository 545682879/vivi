最近项目任务繁重，更新博客会较慢，不过有时间希望可以把自己的积累分享出来。
   JavaScript正则实战(会根据最近写的不断更新)
1、javascript 正则对象替换创建 和用法： /pattern/flags  先简单案例学习认识下replace能干什么
    正则表达式构造函数： new RegExp("pattern"[,"flags"]); 
    正则表达式替换变量函数：stringObj.replace(RegExp,replace Text);
参数说明： 
pattern -- 一个正则表达式文本 
flags -- 如果存在，将是以下值： 
g: 全局匹配 
i: 忽略大小写 
gi: 以上组合 
//下面的例子用来获取url的两个参数，并返回urlRewrite之前的真实Url
var reg=new RegExp("(http://www.qidian.com/BookReader/)(\\d+),(\\d+).aspx","gmi");
var url="http://www.qidian.com/BookReader/1017141,20361055.aspx";

//方式一,最简单常用的方式
var rep=url.replace(reg,"$1ShowBook.aspx?bookId=$2&chapterId=$3");
alert(rep);

//方式二 ,采用固定参数的回调函数
var rep2=url.replace(reg,function(m,p1,p2,p3){return p1+"ShowBook.aspx?bookId="+p3+"&chapterId="+p3});
alert(rep2);

//方式三，采用非固定参数的回调函数
var rep3=url.replace(reg,function(){var args=arguments; return args[1]+"ShowBook.aspx?bookId="+args[2]+"&chapterId="+args[3];});
alert(rep3);
//方法四
//方式四和方法三很类似, 除了返回替换后的字符串外，还可以单独获取参数
var bookId;
var chapterId;
function capText()
{
    var args=arguments; 
    bookId=args[2];
    chapterId=args[3];
    return args[1]+"ShowBook.aspx?bookId="+args[2]+"&chapterId="+args[3];
}

var rep4=url.replace(reg,capText);
alert(rep4);
alert(bookId);
alert(chapterId);
//使用test方法获取分组
var reg3=new RegExp("(http://www.qidian.com/BookReader/)(\\d+),(\\d+).aspx","gmi");
reg3.test("http://www.qidian.com/BookReader/1017141,20361055.aspx");
//获取三个分组
alert(RegExp.$1); 
alert(RegExp.$2);
alert(RegExp.$3);
2、 学习最常用的 test exec match search  replace  split 6个方法
1） test  检查指定的字符串是否存在
var data = “123123″;
var reCat = /123/gi;
alert(reCat.test(data));  //true
//检查字符是否存在  g 继续往下走  i 不区分大小写
2） exec 返回查询值
var data = “123123,213,12312,312,3,Cat,cat,dsfsdfs,”;
var reCat = /cat/i;
alert(reCat.exec(data));  //Cat
3）match  得到查询数组
var data = “123123,213,12312,312,3,Cat,cat,dsfsdfs,”;
var reCat = /cat/gi;
var arrMactches = data.match(reCat)
for (var i=0;i < arrMactches.length ; i++)
{
alert(arrMactches[i]);   //Cat  cat
}
4） search  返回搜索位置  类似于indexof
var data = “123123,213,12312,312,3,Cat,cat,dsfsdfs,”;
var reCat = /cat/gi;
alert(data.search(reCat));  //23
5） replace  替换字符  利用正则替换
var data = “123123,213,12312,312,3,Cat,cat,dsfsdfs,”;
var reCat = /cat/gi;
alert(data.replace(reCat,”libinqq”));
6）split   利用正则分割数组
var data = “123123,213,12312,312,3,Cat,cat,dsfsdfs,”;
var reCat = /\,/;
var arrdata = data.split(reCat);
for (var i = 0; i < arrdata.length; i++)
{
alert(arrdata[i]);
}
3、常用表达式收集：
"^\\d+$"　　//非负整数（正整数 + 0）
"^[0-9]*[1-9][0-9]*$"　　//正整数
"^((-\\d+)|(0+))$"　　//非正整数（负整数 + 0）
"^-[0-9]*[1-9][0-9]*$"　　//负整数
"^-?\\d+$"　　　　//整数
"^\\d+(\\.\\d+)?$"　　//非负浮点数（正浮点数 + 0）
"^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$"
//正浮点数
"^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$"　　//非正浮点数（负浮点数 + 0）
"^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$"
//负浮点数
"^(-?\\d+)(\\.\\d+)?$"　　//浮点数
"^[A-Za-z]+$"　　//由26个英文字母组成的字符串
"^[A-Z]+$"　　//由26个英文字母的大写组成的字符串
"^[a-z]+$"　　//由26个英文字母的小写组成的字符串
"^[A-Za-z0-9]+$"　　//由数字和26个英文字母组成的字符串
"^\\w+$"　　//由数字、26个英文字母或者下划线组成的字符串
"^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$"　　　　//email地址
"^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$"　　//url
"^[A-Za-z0-9_]*$"。
============================================正则表达式基础知识==============================================
^ 匹配一个输入或一行的开头，/^a/匹配"an A"，而不匹配"An a" 
$ 匹配一个输入或一行的结尾，/a$/匹配"An a"，而不匹配"an A" 
* 匹配前面元字符0次或多次，/ba*/将匹配b,ba,baa,baaa 
+ 匹配前面元字符1次或多次，/ba+/将匹配ba,baa,baaa 
? 匹配前面元字符0次或1次，/ba?/将匹配b,ba 
(x) 匹配x保存x在名为$1...$9的变量中 
x|y 匹配x或y 
{n} 精确匹配n次 
{n,} 匹配n次以上 
{n,m} 匹配n-m次 
[xyz] 字符集(character set)，匹配这个集合中的任一一个字符(或元字符) 
[^xyz] 不匹配这个集合中的任何一个字符 
[\b] 匹配一个退格符 
\b 匹配一个单词的边界 
\B 匹配一个单词的非边界 
\cX 这儿，X是一个控制符，/\cM/匹配Ctrl-M 
\d 匹配一个字数字符，/\d/ = /[0-9]/ 
\D 匹配一个非字数字符，/\D/ = /[^0-9]/ 
\n 匹配一个换行符 
\r 匹配一个回车符 
\s 匹配一个空白字符，包括\n,\r,\f,\t,\v等 
\S 匹配一个非空白字符，等于/[^\n\f\r\t\v]/ 
\t 匹配一个制表符 
\v 匹配一个重直制表符 
\w 匹配一个可以组成单词的字符(alphanumeric，这是我的意译，含数字)，包括下划线，如[\w]匹配"$5.98"中的5，等于[a-zA-Z0-9] 
\W 匹配一个不可以组成单词的字符，如[\W]匹配"$5.98"中的$，等于[^a-zA-Z0-9]。 