"use strict";
define(function(require, exports, module) {
	require("../css/main");
	var react = require("jquery");
	var react = require("react");
	var reactDom = require("reactDom");
	
	var header = React.createClass({displayName: "header",
		getDefaultProps: function() {
			return {
			  names: ['a', 'b', 'c']
			};
		},
		handleClick: function(event) {
			var newColor = $(event.target).val()
			console.log('newColor:' + newColor);
			this.setState({color: newColor});
		},
		render: function () {
			var names = this.props.names;
			return (
				React.createElement("ul", null, 
					
						names.map(function(name) {
						  return React.createElement("li", null, "name");
						})
					
				)
			);
		}
	});
	
	// �����ĵ� 
	/*ReactDOM.render(
		<header />,
		document.getElementById('example')
  	);
	*/
	module.exports = header;
	
});