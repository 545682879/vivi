function getImagePromise(imageName){
	return new Promise(function(resolve, reject){
		//var num = Math.random();
		var image = new Image();
		image.onload = function() {
		  resolve(image);
		};
		image.width = "200";
		image.height = "200";
		image.onerror = function() {
		  reject(new Error('Could not load image at Chrysanthemum.jpg'));
		};
		image.src = imageName;
	});
};

var p1 = new Promise(function(resolve, reject){
  	//var num = Math.random();
    var image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at Chrysanthemum.jpg'));
    };

    image.src = 'Chrysanthemum.jpg';

});

var p2 = new Promise(function(resolve, reject){
  resolve(p1);
});
/*
p2.then(function(image){
	$(image).insertBefore($('#content'));
	//console.log(image);
}).then(function(){
  console.log('Image load successful!');
}).catch(function(error){
	$('#content').html(error);
});
*/
/*
var promise = new Promise(function(resolve, reject){
  $.ajax({url:'http://30.10.0.98:3000/a.txt', type:'get'}).done(function(data){
    console.log(data);
    if(data == 'abc'){
      resolve(data);
    }else{
      reject(new Error());
    }
  });

});
*/
//必须全部返回
Promise.all([getImagePromise('Jellyfish.jpg'), getImagePromise('Koala.jpg'), getImagePromise('Lighthouse.jpg'), getImagePromise('Penguins.jpg')]).then(function (posts) {
	posts.forEach(function(item, index){
		$(item).insertBefore($('#content'));
	});
  
}).catch(function(reason){
  console.log('sorry, have error',reason);
});

//有一个返回就可以
Promise.race([getImagePromise('Jellyfish.jpg'), getImagePromise('Koala.jpg'), getImagePromise('Lighthouse.jpg'), getImagePromise('Penguins.jpg')]).then(function (posts) {
		$(posts).insertBefore($('#content'));
}).catch(function(reason){
  console.log('sorry, have error',reason);
});

Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      console.log('done:' + reason);
    });
};

//将jQuery的 Deffered 方法转换为 Promise
var jsPromise = Promise.resolve($.ajax('http://127.0.0.1:3000/abc.json'));
jsPromise.then(function(data){
  console.log("data:" + JSON.stringify(data));
}).catch(function(error){
  console.log("error:" + error);
});

//thenable对象指的是具有then方法的对象
var thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

var p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});

//参数不是具有then方法的对象，或根本就不是对象
var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});


//不带有任何参数
var p = Promise.resolve();

p.then(function () {
  console.log('No parameter!');
}).done(function(e){console.log('onFulfilled'); throw new Error('error')}, function(e){console.log('onRejected')});

//Reject 方法
var p = Promise.reject('出错了');
// 等同于
//var p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s){
  console.log(s);
});


