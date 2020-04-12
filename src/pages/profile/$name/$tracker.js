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
		API.get('/completeProfile/'+this.props.match.params.name+'?tracker='+this.props.match.params.tracker)
			.then(resp=>resp.json())
			.then(json=>{
				if(json.length==0)return;
				var group = {};
				json.forEach(item=>{
					if(group[item.group.name]==undefined) {
						group[item.group.name] = [];
					}
					group[item.group.name].push(item);
				});
				var groups = [];
				for(var g in group) {
					groups.push({name:g,logos:group[g]});
				}
				this.setState({
					name: json[0].group.profile.name,
					avatar: json[0].group.profile.avatar,
					groups: groups
				});
			});
	}

	render() {
		return (
			<Profile name={this.state.name} avatar={this.state.avatar}>
			{this.state.groups.map(g=><Profile.Group {...g} tracker={this.props.match.params.tracker}/>)}
			</Profile>
		);
	}

}

export default ProfilePage;
