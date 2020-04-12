import react from 'react';
import {
	Card,
	Button,
	Form,
	Input
} from 'antd';
import router from 'umi/router';
import sha256 from 'crypto-js/sha256';
import { API } from '../utils';

class LoginPage extends react.Component {

	onFinish(values) {
		var pwd = String(sha256(values.name+'.'+String(sha256(values.pwd))));
		API.get('/login?user='+values.name+'&pwd='+pwd)
			.then(resp=>resp.json())
			.then(json=>{
				router.push('/admin/'+json.token+'/');
			});
	}

	render() {
		return (
		<div style={{textAlign:'center'}}>
			<Card>
				<h1>登录</h1>
				<Form
					onFinish={(v)=>this.onFinish(v)}
				>
					<Form.Item
						label='账号'
						name='name'
						rules={[
							{
								required: true,
								message: '请输入账号'
							}
						]}
					><Input/></Form.Item>
					<Form.Item
						label='密码'
						name='pwd'
						rules={[
							{
								required: true,
								message: '请输入密码'
							}
						]}
					><Input.Password/></Form.Item>
					<Form.Item><Button type='primary' htmlType='submit'>登录</Button></Form.Item>
				</Form>
			</Card>
		</div>
		);
	}

}

export default LoginPage;
