var arry = [];

console.log(Array.isArray(arry));

arry.push('apple');
arry.push('orange');
arry.push('pear');
arry.push('apple');

console.log(arry.indexOf('apple'));
console.log(arry.lastIndexOf('apple'));


var everyItem = arry.every(function(item, index){
	
	if(item.indexOf('p')>-1){
		return true;
	}
	
});

console.log('everyItem:' + everyItem);

var someItem = arry.some(function(item, index){
	
	if(item.indexOf('p')>-1){
		return true;
	}
	
});

console.log('someItem:' + someItem);

console.log('Array list:')
arry.forEach(function(item, index){
	console.log(item);
});

var mapArray = arry.map(function(item, index){
	return 'Fruit: ' + item ;
});

console.log(mapArray.join(','))

var filterArray = arry.filter(function(item, index){
	if(index>2){
		return true;
	}
});

console.log(filterArray.join(','));

var reduceArray = arry.reduce(function(item, next){
	return item + '-' + next;
})

console.log('reduceArray:' + reduceArray);

var reduceRightArray = arry.reduceRight(function(item, next){
	return item + '-' + next;
})

console.log('reduceRightArray:' + reduceRightArray);

