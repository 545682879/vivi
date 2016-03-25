"use strict";
define(function(require, exports, module) {
	require("../css/main.css");
	var react = require("jquery");
	var react = require("react");
	var reactDom = require("reactDom");
	
	var header = React.createClass({displayName: "header",
	
		propTypes: {
			// �������� prop Ϊָ���� JS �����������ͣ�Ĭ����������Щ�����ǿ�ѡ��
			initValue: React.PropTypes.number,
		    names: React.PropTypes.array,
			optionalBool: React.PropTypes.bool,
			optionalFunc: React.PropTypes.func,
			optionalNumber: React.PropTypes.number,
			optionalObject: React.PropTypes.object,
			optionalString: React.PropTypes.string,

			// ���Ա���Ⱦ�Ķ��� numbers, strings, elements �� array
			optionalNode: React.PropTypes.node,

			//  React Ԫ��
			optionalElement: React.PropTypes.element,

			// �� JS �� instanceof ���������� prop Ϊ����ʵ����
			//optionalMessage: React.PropTypes.instanceOf(Message),

			// �� enum ������ prop ֻ����ָ����ֵ��
			optionalEnum: React.PropTypes.oneOf(['News', 'Photos']),

			// �����Ƕ������������е�һ��
			optionalUnion: React.PropTypes.oneOfType([
			  React.PropTypes.string,
			  React.PropTypes.number
			  //,React.PropTypes.instanceOf(Message)
			]),

			// ָ���������ɵ�����
			optionalArrayOf: React.PropTypes.arrayOf(React.PropTypes.number),

			// ָ�����͵����Թ��ɵĶ���
			optionalObjectOf: React.PropTypes.objectOf(React.PropTypes.number),

			// �ض� shape �����Ķ���
			optionalObjectWithShape: React.PropTypes.shape({
			  color: React.PropTypes.string,
			  fontSize: React.PropTypes.number
			}),

			// �������ͼ��� `isRequired` ��ʹ prop ���ɿա�
			requiredFunc: React.PropTypes.func.isRequired,

			// ���ɿյ���������
			requiredAny: React.PropTypes.any.isRequired,

			// �Զ�����֤����������֤ʧ����Ҫ����һ�� Error ���󡣲�Ҫֱ��ʹ�� `console.warn` �����쳣����Ϊ���� `oneOfType` ��ʧЧ��
			customProp: function(props, propName, componentName) {
			  if (!/matchme/.test(props[propName])) {
				return new Error('Validation failed!');
			  }
			}
		},
	
		getDefaultProps: function() {
			return {
				//initValue: 'a',
			    names: ['a', 'b', 'c']
				//names: {'a':'aaaa'}
			}
		},
		handleClick: function(event) {
			
		},
		render: function () {
			var names = this.props.names;
			return (
				React.createElement("ul", null, 
					
						names.map(function(name) {
						  return React.createElement("li", {key: name}, name);
						})
					
				)
			);
		}
	});

	module.exports = header;
	
});