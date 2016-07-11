function throwIn(x, exception){
	var i = 0;
	try{
		if(exception && typeof exception === 'string'){
			throw new Error(exception);
		}else if(x === 0){
			throw new Error("wrong denominator!");
		}else{
			i = 100 / x;
		}
		return i;
	}catch(e){
		console.log(e);
	}finally{
		console.log('finally!');
	}

}

//Error 构造器
//Error
//EvalError 在标准中未使用，只是为了兼容上一版本
//RangeError
new Array(-1)  //VM102:1 Uncaught RangeError: Invalid array length
//ReferenceError
unknownVaraiable  //VM105:1 Uncaught ReferenceError: unknownVaraiable is not defined
//SyntaxError
eval('3+')  //SyntaxError: Unexpected end of input
//TypeError
undefined.foo  //TypeError: Cannot read property 'foo' of undefined
//URIError
decodeURI('%2') //URIError: URI malformed
