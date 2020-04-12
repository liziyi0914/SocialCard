import react from 'react';

class IndexPage extends react.Component {

	render() {
		return (
		<div><br/><br/>{this.props.match.params.token}</div>
		);
	}

}

export default IndexPage;
