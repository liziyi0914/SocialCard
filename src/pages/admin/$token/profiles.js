import react from 'react';
import {
	Table,
	Card,
	Button,
	Form,
	Input,
	Modal,
	List
} from 'antd';
import { API } from '../../../utils';

class ProfilesPage extends react.Component {

	formA = react.createRef();
	formB = react.createRef();

	columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: (text,record)=><Button type='link' onClick={()=>{this.setState({selectedProfile:record.id});this.refresh();}}>{text}</Button>
		},
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '头像',
			dataIndex: 'avatar',
			key: 'avatar'
		},
		{
			title: '路径',
			dataIndex: 'path',
			key: 'path'
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			render: (text,rec)=>[<Button onClick={()=>this.openModalA(rec)}>编辑</Button>,<Button type='primary' onClick={()=>this.askDelA(rec)} danger>删除</Button>]
		}
	];

	constructor() {
		super();
		this.state = {
			showModalA: false,
			showModalB: false,
			profiles: [],
			selectedProfile: null,
			groups: []
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		API.get('/profiles')
			.then(resp=>resp.json())
			.then(json=>this.setState({profiles:json}));
		if(this.state.selectedProfile!=null) {
			API.get('/group/'+this.state.selectedProfile)
				.then(resp=>resp.json())
				.then(json=>this.setState({groups:json}));
		}
	}

	openModalA(init={id:null,name:'',avatar:'',path:''}) {
		this.formA.current.setFieldsValue(init);
		this.setState({showModalA:true});
	}

	openModalB(init={id:null,name:'',profile_id:this.state.selectedProfile}) {
		this.formB.current.setFieldsValue(init);
		this.setState({showModalB:true});
	}

	closeModalA() {
		this.setState({showModalA: false});
	}

	closeModalB() {
		this.setState({showModalB: false});
	}

	submitA(values) {
		API.post('/profile/'+values.path,this.props.match.params.token,values)
			.then(resp=>resp.status)
			.then(code=>{
				this.closeModalA();
				this.refresh();
			})
			.catch(console.log);
	}

	submitB(values) {
		API.post('/group/'+values.id,this.props.match.params.token,values)
			.then(resp=>resp.status)
			.then(code=>{
				this.closeModalB();
			    this.refresh();
			})
			.catch(console.log);
	}

	askDelA(rec) {
		Modal.confirm({
			content: `确认删除${rec.name}？`,
			okText: '删除',
			cancelText: '取消',
			okButtonProps: { danger: true },
			onOk: ()=>{
				API.delete('/profile/'+rec.path,this.props.match.params.token)
					.then(()=>this.refresh());
			}
		});
	}

	askDelB(item) {
		Modal.confirm({
			content: `确认删除${item.name}？`,
			okText: '删除',
			cancelText: '取消',
			okButtonProps: { danger: true },
			onOk: ()=>{
				API.delete('/group/'+item.id,this.props.match.params.token)
					.then(()=>this.refresh());
			}
		});
	}

	render() {
		return (
		<div>
			<Card>
				<Table columns={this.columns} dataSource={this.state.profiles}/>
				<Button type='primary' onClick={()=>this.openModalA()}>添加</Button>
			</Card>
			<br/>
			{this.state.selectedProfile!=null&&(
			<Card>
				<List
					dataSource={this.state.groups}
					renderItem={item=>(
						<List.Item
							actions={[<Button onClick={()=>this.openModalB(item)}>编辑</Button>,<Button type='primary' onClick={()=>this.askDelB(item)} danger>删除</Button>]}
						>{item.name}</List.Item>
					)}
				/>
				<Button type='primary' onClick={()=>this.openModalB()}>添加</Button>
			</Card>
			)}
			<Modal
				visible={this.state.showModalA}
				footer={null}
				onCancel={()=>this.closeModalA()}
				forceRender
			>
				<Form
					ref={this.formA}
					onFinish={v=>this.submitA(v)}
				>
					<Form.Item name='id'/>
					<Form.Item
						name='name'
						label='名称'
						rules={[
							{
								required: true,
								message: '请输入名称'
							}
						]}
					><Input/></Form.Item>
					<Form.Item
						name='avatar'
			            label='头像'
			            rules={[
							{
								required: true,
								message: '请输入头像链接'
							}
						]}
					><Input/></Form.Item>
					<Form.Item
			            name='path'
			            label='路径'
			            rules={[
							{
								required: true,
								message: '请输入路径'
							}
						]}
					><Input/></Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit'>提交</Button>
						<Button onClick={()=>this.closeModalA()}>取消</Button>
					</Form.Item>
				</Form>
			</Modal>
			<Modal
				visible={this.state.showModalB}
			    footer={null}
				onCancel={()=>this.closeModalB()}
			    forceRender
			>
				<Form
			        ref={this.formB}
					onFinish={v=>this.submitB(v)}
				>
			        <Form.Item name='id'/>
			        <Form.Item
			            name='name'
			            label='名称'
			            rules={[
							{
								required: true,
								message: '请输入名称'
							}
						]}
			        ><Input/></Form.Item>
					<Form.Item name='profile_id'/>
			        <Form.Item>
						<Button type='primary' htmlType='submit'>提交</Button>
			            <Button onClick={()=>this.closeModalB()}>取消</Button>
			        </Form.Item>
			    </Form>
			</Modal>
		</div>
		);
	}

}

export default ProfilesPage;
