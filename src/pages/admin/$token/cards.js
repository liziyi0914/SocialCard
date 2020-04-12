import react from 'react';
import {
	Card,
	Button,
	Form,
	Input,
	Modal,
	Table
} from 'antd';
import { API } from '../../../utils';

class CardsPage extends react.Component {

	form = react.createRef();

	columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '标题',
			dataIndex: 'title',
			key: 'title'
		},
		{
			title: 'icon',
			dataIndex: 'icon',
			key: 'icon'
		},
		{
			title: 'url',
			dataIndex: 'url',
			key: 'url',
			render: text=><a href={text}>{text}</a>
		},
		{
			title: '颜色',
			dataIndex: 'color',
			key: 'color',
			render: text=><div style={{backgroundColor:text,minWidth:'1em',minHeight:'1em'}}> </div>
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type'
		},
		{
			title: '描述',
			dataIndex: 'description',
			key: 'description'
		},
		{
			title: '分组',
			dataIndex: 'group',
			key: 'group',
			render: (text,record)=>this.state.groups[record.group.id]
		},
		{
			title: '操作',
			dataIndex: 'action',
			key: 'action',
			render: (text,record)=>[<Button onClick={()=>this.openModal({...record,group_id:record.group.id})}>编辑</Button>,<Button type='primary' onClick={()=>this.askDel(record)} danger>删除</Button>]
		}
	];

	constructor() {
		super();
		this.state = {
			showModal: false,
			ds: [],
			groups: {}
		};
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		API.get('/cards')
			.then(resp=>resp.json())
			.then(json=>this.setState({ds:json}));
		API.get('/groups')
			.then(resp=>resp.json())
			.then(json=>{
				var gs = {};
				json.forEach(g=>gs[g.id]=g.profile.name+'-'+g.name);
				this.setState({groups:gs});
			});
	}

	openModal(init={id: null,name: '',title: '',icon: '',url: '',color: '',type: '',description: '',group_id: null}) {
		this.form.current.setFieldsValue(init);
		this.setState({showModal:true});
	}

	closeModal() {
		this.setState({showModal:false});
	}

	submit(values) {
		API.post('/card/'+values.name,this.props.match.params.token,values)
			.then(()=>{
				this.closeModal();
				this.refresh();
			});
	}

	askDel(rec) {
		Modal.confirm({
			content: `确认删除${rec.name}？`,
			okText: '删除',
			cancelText: '取消',
			okButtonProps: { danger: true },
			onOk: ()=>API.delete('/card/'+rec.name,this.props.match.params.token).then(()=>this.refresh())
		});
	}

	render() {
		return (
		<div>
			<Card style={{width:'100%'}}>
				<Table columns={this.columns} dataSource={this.state.ds} scroll={{x:true}}/>
				<Button type='primary' onClick={()=>this.openModal()}>添加</Button>
			</Card>
			<Modal
				visible={this.state.showModal}
				footer={null}
				onCancel={()=>this.closeModal()}
				forceRender
			>
				<Form
					ref={this.form}
					onFinish={v=>this.submit(v)}
				>
					<Form.Item name='id'/>
					<Form.Item
						name='name'
						label='名称'
						rules={[{required:true,message:'请输入名称'}]}
					><Input/></Form.Item>
					<Form.Item
						name='title'
						label='标题'
						rules={[{required:true,message:'请输入标题'}]}
					><Input/></Form.Item>
					<Form.Item
						name='icon'
						label='icon'
						rules={[{required:true,message:'请输入icon'}]}
					><Input/></Form.Item>
					<Form.Item
						name='url'
						label='URL'
						rules={[{required:true,message:'请输入URL'}]}
					><Input/></Form.Item>
					<Form.Item
						name='color'
						label='颜色'
						rules={[{required:true,message:'请输入颜色'}]}
					><Input/></Form.Item>
					<Form.Item
						name='type'
						label='类型'
						rules={[{required:true,message:'请输入类型'}]}
					><Input/></Form.Item>
					<Form.Item
						name='description'
						label='描述'
						rules={[{required:true,message:'请输入描述'}]}
					><Input/></Form.Item>
					<Form.Item
						name='group_id'
						label='分组'
					><Input/></Form.Item>
					<Form.Item>
						<Button type='primary' htmlType='submit'>提交</Button>
						<Button onClick={()=>this.closeModal()}>取消</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
		);
	}

}

export default CardsPage;
