"use strict";
/**
 * 组件继承
 */
define(function(require, exports) {

	//依赖
	var $ = require('$'),
		Widget = require('widget'),
		Handlebars = require('handlebars');
		
	//类
	var myWidget = Widget.extend({
		//类名
		className: 'myWidget',
		element: null,
		attrs:{
			template: '<div style="width: 300px;color: red;">baga {{data1}} {{data2}} {{data3}}</div>',
			parentNode: '#abc', 
			data: {data1: 'data1', data2: 'data2', data3: 'data3'},
			model: {data1: 'data1', data2: 'data2', data3: 'data3'}
		},
		
		//初始
		initialize: function(config){
			var me = this;
			myWidget.superclass.initialize.call(me, config);
			console.log('initialize');
		},
		
		initProps: function(config){
			console.log('initProps');
		},

		parseElement:function(config){
			var me = this;
			myWidget.superclass.parseElement.call(me, config);
			console.log('parseElement');
		},

        // 从模板中构建 this.element
        parseElementFromTemplate: function() {
        	var temp = Handlebars.compile(this.get("template"));
            this.element = $(temp(this.get("data")));
        },

		setup: function(config){
			var me = this;
			console.log('setup');
			console.log(this.element);
			//this.render();
			var temp = Handlebars.compile(this.get("template"));
			$(me.get("parentNode")).append($(temp(this.get("data")))) ;
		}

	});

	return myWidget;

});
