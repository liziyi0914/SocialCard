import react from 'react';
import {
	Button,
	Input,
	Form
} from 'antd';
import router from 'umi/router';

class IndexPage extends react.Component {

	render() {
		return (
		<div>
			<Form
				onFinish={data=>router.push(`/profile/${data.profile}`)}
			>
				<Form.Item
					label='Profile'
					name='profile'
					rules={[{required:true,message:'请输入Profile！'}]}
				><Input/></Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>打开</Button>
				</Form.Item>
			</Form>
		</div>
		);
	}

}

export default IndexPage;
