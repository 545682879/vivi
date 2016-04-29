var React = require('react');

class Hello extends React.Component{
    constructor(props) {
        super(props);
    }
	
	render() {
		return(<h1 ref="node">Hello {this.props.name}!</h1>)
	}
	componentDidMount(){
		let me = this,
			refs = me.refs;
	}
}

Hello.propTypes= {
};

module.exports = Hello;