let React = require('react');
let ReactDOM = require('react-dom');
let TimeUp = require('./timeUp'); 


seajs.config({
	base: 'http://static.alipayobjects.com',
	alias: {
	'jquery': 'jquery/1.7.2/jquery',
	'index': 'arale-qrcode/1.1.0/index'
	}
});


//console.log('TimeUp',TimeUp);
/*
console.log('sea',sea);

console.log('sea',seajs);
	seajs.config({
		paths: {
			jquery: 'https://alinw.alipayobjects.com/jquery',
			arale: 'https://alinw.alipayobjects.com/arale'
		},
		alias: {
			"jquery": 'jquery/1.7.2/jquery'
		}
	});
	
	seajs.use(['jquery'], function($){
		console.log('a',$);
	});


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
					<div id="qrcodeDefault" ref="qrcodeDefault"></div>
			</div>);
	}
	
	componentDidMount(){
		var me = this;
		seajs.use(['index','jquery'], function(qrcode,$){
			console.log(qrcode);
			var qrnode = new qrcode({
				text: ""
			});
			$(ReactDOM.findDOMNode(me.refs.qrcodeDefault)).append(qrnode);
		});
	}
	
}

ReactDOM.render(<Frame />, document.getElementById('id1'));