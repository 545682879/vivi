Boolean(undefined)  //false
Boolean(null)    //false
Boolean(0) == false
Boolean(1) == true
Boolean("") == false
Boolean('abc') == true
Boolean('false')  == true
//真值，假值
//undefined, null, false, 0, NaN, "" ; 其他的所有值，包括对象

//所有的对象都是真值
Boolean (new Boolean(false))  //true
Boolean ([])	//true
Boolean ({})	//true

Number({valueOf:function(){return 123}})
String({toString:function(){return 'abc'}})

!![] == true
!!{} == true
!!null == false
!!'' == false
!!true == true
!!123 == true
!!0 == false

