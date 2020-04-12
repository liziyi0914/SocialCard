import react from 'react';
import Card from '../../../components/Card';
import { API } from '../../../utils';

class IndexPage extends react.Component {

	constructor() {
		super();
		this.state = {
		};
	}

	componentDidMount() {
		API.get('/card/'+this.props.match.params.name+'?tracker='+this.props.match.params.tracker)
			.then(resp=>resp.json())
			.then(json=>{
				this.setState(json)
			});
	}

	render() {
		return (
			<Card
			{...this.state}
			/>
		);
	}

}

export default IndexPage;
