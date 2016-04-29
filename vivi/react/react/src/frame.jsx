var React = require('react');
var seajs = require('seajs');
console.log(seajs);
var Hello = React.createClass({
	render: function(){
		return (
			<h1>Hello {this.props.name}!</h1>
	    );
	}
});