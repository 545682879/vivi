"use strict";
define(function(require, exports, module) {
	require("../css/main.css");
	var react = require("jquery");
	var react = require("react");
	var reactDom = require("reactDom");
	var header = require("./header");
	
	var frameComponent = React.createClass({displayName: "frameComponent",
		getInitialState: function() {
			return {color: "#00A2E8"}
		},
		
		handleClick: function(event) {
			var newColor = $(event.target).val()
			console.log('newColor:' + newColor);
			this.setState({color: newColor});
		},
		
		componentWillMount:function() {
			console.log('Component WILL MOUNT!')
		},
		componentDidMount:function() {
			console.log('Component DID MOUNT!')
		},
		componentWillReceiveProps:function(newProps) {
			console.log('Component WILL RECIEVE PROPS!')
		},
		shouldComponentUpdate:function(newProps, newState) {
			return true;
		},
		componentWillUpdate:function(nextProps, nextState) {
			console.log('Component WILL UPDATE!');
		},
		componentDidUpdate:function(prevProps, prevState) {
			console.log('Component DID UPDATE!')
		},
		componentWillUnmount:function() {
			console.log('Component WILL UNMOUNT!')
		},
  
		render: function () {
			return (
				React.createElement("div", {className: "frame"}, 
					React.createElement(header, null), 
					"Hello World!", 
					React.createElement("select", {name: "color", defaultValue: this.state.color, onChange: this.handleClick}, 
						React.createElement("option", {value: "#972F2F"}, "red"), 
						React.createElement("option", {value: "#00A2E8"}, "blue"), 
						React.createElement("option", {value: "#3B5C3A"}, "green")
					)
				)
			);
		}
	});
	
	// �����ĵ� 
	ReactDOM.render(
		React.createElement(frameComponent, null),
		document.getElementById('example')
  	);
	
	//module.exports = frameComponent;
	
});