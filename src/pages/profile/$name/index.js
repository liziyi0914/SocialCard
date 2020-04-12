import react from 'react';
import Profile from '../../../components/Profile';
import { API } from '../../../utils';

class ProfilePage extends react.Component {

	constructor() {
		super();
		this.state = {
			name: '',
			avatar: null,
			groups: []
		};
	}

	componentDidMount() {
		API.get('/completeProfile/'+this.props.match.params.name)
			.then(resp=>resp.json())
			.then(json=>{
				if(json.length==0)return;
				var groups = json.groups.map(g=>({name:g.name,logos:json.cards.filter(c=>c.group==g.id)}));
				this.setState({
					name: json.profile.name,
					avatar: json.profile.avatar,
					groups: groups
				});
			});
	}

	render() {
		return (
			<Profile name={this.state.name} avatar={this.state.avatar}>
			{this.state.groups.map(g=><Profile.Group {...g}/>)}
			</Profile>
		);
	}

}

export default ProfilePage;
