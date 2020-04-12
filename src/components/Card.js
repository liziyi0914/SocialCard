import react from 'react';
import { createFromIconfontCN, CopyOutlined } from '@ant-design/icons';
import { Card, Button, message } from 'antd';
import styles from './Card.css';
import Jump from './Jump';
import QR from './QR';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Logo = createFromIconfontCN({
	  scriptUrl: '//at.alicdn.com/t/font_1270946_vr0pymbfi7.js'
});

export default class extends react.Component {

	static defaultProps = {
		color: '#2196F3',
		icon: 'alipay',
		title: '标题',
		url: 'Null',
		description: '描述',
		type: 'qr'
	};

	types = {};

	render() {
		this.types = {
			qr: false,
			jump: false,
			img: false,
			copy: false
		};
// jump:wechat=liziyi0914@friend.wechat,alipay=$liziyi0914@friend.alipay
		this.props.type.split(';').forEach(t=>{
			if(t.startsWith('jump')) {
				this.types.jump = t.split(':')[1].split(',').map(i=>i.split('='));
			} else {
				this.types[t] = true;
			}
		});
		Jump.execute(this.types.jump,navigator.userAgent);
		var url = this.props.url=='$'?window.location.href:this.props.url;
		return (
		<div className={styles.card} style={{background:this.props.color}}>
			<div className={styles.head}>
				<div className={styles.logoDiv}>
					<Logo type={`icon-${this.props.icon}`} className={styles.logo} style={{background:this.props.color}}/>
				</div>
				<div className={styles.title}>{this.props.title}</div>
			</div>
			<div className={styles.content}>
				{this.types.qr?<QR value={url}/>:<img src={url}/>}
				{this.types.copy?<Card className={styles.copy}><div>{this.props.url}<CopyToClipboard text={this.props.url} onCopy={()=>message.success('复制成功！')}><Button type='link'><CopyOutlined /></Button></CopyToClipboard></div></Card>:<div className={styles.desc}>{this.props.description}</div>}
			</div>
		</div>
		);
	}

}

