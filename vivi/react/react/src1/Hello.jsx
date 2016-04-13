var React = require('react');

class Hello extends React.Component{
    constructor(props) {
        super(props);
    }
	
	render() {
		return(<h1>Hello {this.props.name}!</h1>)
	}
}

Hello.propTypes= {
};

module.exports = Hello;