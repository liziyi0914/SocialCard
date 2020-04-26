import react from 'react';
import {
	Layout,
	Menu
} from 'antd';
import router from 'umi/router';
import { API } from '../../../utils';

const { Header, Content, Sider, Footer } = Layout;

export default class extends react.Component {

	constructor() {
		super();
		this.state = {
			path: 'index'
		};
	}

	render() {
		var token = this.props.match.params.token;
		API.get('/token/'+token)
			.then(resp=>resp.status)
			.then(code=>{
				if(code==403) {
					router.push('/login');
				}
			});
		var locations = this.props.location.pathname.split('/');
		var loc = locations[locations.length-1];
		loc = loc==''?'index':loc;
		return (
		<Layout style={{height:'100%'}}>
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
			>
				<Menu
					mode="inline"
			        defaultSelectedKeys={loc}
			        style={{ height: '100%', borderRight: 0 }}
					onClick={e=>{
						locations[locations.length-1] = e.key=='index'?'':e.key;
						router.push(locations.join('/'));
					}}
			    >
					<Menu.Item key='index'>概览</Menu.Item>
			        <Menu.Item key='profiles'>Profiles</Menu.Item>
					<Menu.Item key='cards'>Cards</Menu.Item>
					<Menu.Item key='tokens'>令牌</Menu.Item>
				</Menu>
			</Sider>
			<Layout>
				<Header>Header</Header>
				<Content>{this.props.children}</Content>
				<Footer>Footer</Footer>
			</Layout>
		</Layout>);
	}

}

