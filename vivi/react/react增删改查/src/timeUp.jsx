var React = require('react');

class TimeUp extends React.Component{
	constructor(props) {
        super(props);
		this.state = {count: 0}
    }
	
	resetState(){
		//console.log(this.state.count);
	}
	
	handleClick(){
		this.setState({count : this.state.count+1})
		console.log(this.state.count);
	}
	
	componentDidMount() {
		//setInterval(this.handleClick.bind(this), 1000);
	}
	
	componentWillUpdate(nextProps, nextState) {
		console.log('Component WILL UPDATE!');
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log('Component DID UPDATE!')
	}

	render(){
		console.log('a');
		return(<div>
					<span name={this.props.name}>Count£º{this.state.count}</span>
					<input type='button' name="button" onClick={this.props.onClick}/>{/*onClick={this.handleClick.bind(this)}*/}
			   </div>)
	}
}


TimeUp.propTypes= {

};

module.exports = TimeUp;