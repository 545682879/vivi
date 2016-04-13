let React = require('react');
let ReactDOM = require('react-dom');
let TimeUp = require('./timeUp'); 
console.log('TimeUp',TimeUp)
/*
var Frame =React.createClass({
	getInitialState: function(){
		return {flag: true};
	},
	
	handleFrameClick: function(){
		this.setState({flag:!this.state.flag});
	},
	
	render: function(){
		var color;
		if(this.state.flag){
			color = 'red';
		}else{
			color = 'blue';
		}
		return(<div style={{backgroundColor: color}}>
					<TimeUp name="Nate" onClick={this.handleFrameClick.bind(this)}/>
			</div>);
	}
});
console.log("frame", Frame);
*/

var Frame = class frame extends React.Component{
	constructor(props) {
        super(props);
		this.state = {flag: true}
    }

	handleFrameClick(){
		this.setState({flag:!this.state.flag});
	}
	
	render(){
		var color;
		if(this.state.flag){
			color = 'red';
		}else{
			color = 'blue';
		}
		return(<div style={{backgroundColor: color}}>
					<TimeUp name="Nate" onClick={this.handleFrameClick.bind(this)}/>
			</div>);
	}
	
}

ReactDOM.render(<Frame />, document.getElementById('id1'));