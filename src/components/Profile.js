import react from 'react';
import router from 'umi/router';
import { createFromIconfontCN } from '@ant-design/icons';
import {
	Avatar,
	Row,
	Col
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from './Profile.css';

const Logo = createFromIconfontCN({
	  scriptUrl: '//at.alicdn.com/t/font_1270946_vr0pymbfi7.js'
});

class ProfileGroup extends react.Component {

	static defaultProps = {
		name: 'Name',
		logos: [],
		tracker: ''
	};

	render() {
		return (
		<div style={{margin:'1em 0'}}>
			<div style={{color:'#aaa'}}>{this.props.name}</div>
			<Row justify="space-around">
			{this.props.logos.map(logo=>(<Col span={5}><Logo type={`icon-${logo.icon}`} style={{color:logo.color,fontSize:'4em'}} onClick={()=>router.push(`/card/${logo.name}/${this.props.tracker}`)}/></Col>))}
			</Row>
		</div>
		);
	}

}

class Profile extends react.Component {

	static Group = ProfileGroup;

	static defaultProps = {
		name: 'Name',
		avatar: null
	};

	render() {
		return (
		<div className={styles.card}>
			<div>
			{this.props.avatar!=null?<Avatar size="large" src={this.props.avatar}/>:<Avatar size="large" icon={<UserOutlined />}/>}
				<span style={{fontSize:'1.75em',marginLeft:'0.25em',verticalAlign:'bottom'}}>{this.props.name}</span>
			</div>
			{this.props.children}
		</div>
		);
	}

}

export default Profile;
