(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{Al62:function(e,t,a){"use strict";a.d(t,"a",function(){return l});var n="https://scapi.liziyi0914.com",l={get:e=>fetch(n+e),post:(e,t,a)=>fetch(n+e,{method:"POST",mode:"cors",body:JSON.stringify({token:t,data:a})}),delete:(e,t)=>fetch(n+e,{method:"DELETE",mode:"cors",body:JSON.stringify({token:t})})}},VL1K:function(e,t,a){"use strict";a.r(t);a("5NDa");var n=a("5rEg"),l=(a("y8nQ"),a("Vl3Y")),r=(a("IzEo"),a("bx4M")),s=(a("g9YV"),a("wCAj")),o=(a("2qtc"),a("kLXV")),i=(a("+L6B"),a("2/Rp")),c=a("p0pE"),m=a.n(c),d=a("q1tI"),u=a.n(d),h=a("Al62");class p extends u.a.Component{constructor(){super(),this.form=u.a.createRef(),this.columns=[{title:"ID",dataIndex:"id",key:"id"},{title:"\u540d\u79f0",dataIndex:"name",key:"name"},{title:"\u6807\u9898",dataIndex:"title",key:"title"},{title:"icon",dataIndex:"icon",key:"icon"},{title:"url",dataIndex:"url",key:"url",render:e=>u.a.createElement("a",{href:e},e)},{title:"\u989c\u8272",dataIndex:"color",key:"color",render:e=>u.a.createElement("div",{style:{backgroundColor:e,minWidth:"1em",minHeight:"1em"}}," ")},{title:"\u7c7b\u578b",dataIndex:"type",key:"type"},{title:"\u63cf\u8ff0",dataIndex:"description",key:"description"},{title:"\u5206\u7ec4",dataIndex:"group",key:"group",render:(e,t)=>this.state.groups[t.group.id]},{title:"\u64cd\u4f5c",dataIndex:"action",key:"action",render:(e,t)=>[u.a.createElement(i["a"],{onClick:()=>this.openModal(m()({},t,{group_id:t.group.id}))},"\u7f16\u8f91"),u.a.createElement(i["a"],{type:"primary",onClick:()=>this.askDel(t),danger:!0},"\u5220\u9664")]}],this.state={showModal:!1,ds:[],groups:{}}}componentDidMount(){this.refresh()}refresh(){h["a"].get("/cards").then(e=>e.json()).then(e=>this.setState({ds:e})),h["a"].get("/groups").then(e=>e.json()).then(e=>{var t={};e.forEach(e=>t[e.id]=e.profile.name+"-"+e.name),this.setState({groups:t})})}openModal(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{id:null,name:"",title:"",icon:"",url:"",color:"",type:"",description:"",group_id:null};this.form.current.setFieldsValue(e),this.setState({showModal:!0})}closeModal(){this.setState({showModal:!1})}submit(e){h["a"].post("/card/"+e.name,this.props.match.params.token,e).then(()=>{this.closeModal(),this.refresh()})}askDel(e){o["a"].confirm({content:"\u786e\u8ba4\u5220\u9664".concat(e.name,"\uff1f"),okText:"\u5220\u9664",cancelText:"\u53d6\u6d88",okButtonProps:{danger:!0},onOk:()=>h["a"].delete("/card/"+e.name,this.props.match.params.token).then(()=>this.refresh())})}render(){return u.a.createElement("div",null,u.a.createElement(r["a"],{style:{width:"100%"}},u.a.createElement(s["a"],{columns:this.columns,dataSource:this.state.ds,scroll:{x:!0}}),u.a.createElement(i["a"],{type:"primary",onClick:()=>this.openModal()},"\u6dfb\u52a0")),u.a.createElement(o["a"],{visible:this.state.showModal,footer:null,onCancel:()=>this.closeModal(),forceRender:!0},u.a.createElement(l["a"],{ref:this.form,onFinish:e=>this.submit(e)},u.a.createElement(l["a"].Item,{name:"id"}),u.a.createElement(l["a"].Item,{name:"name",label:"\u540d\u79f0",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u540d\u79f0"}]},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,{name:"title",label:"\u6807\u9898",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u6807\u9898"}]},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,{name:"icon",label:"icon",rules:[{required:!0,message:"\u8bf7\u8f93\u5165icon"}]},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,{name:"url",label:"URL",rules:[{required:!0,message:"\u8bf7\u8f93\u5165URL"}]},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,{name:"color",label:"\u989c\u8272",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u989c\u8272"}]},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,{name:"type",label:"\u7c7b\u578b",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u7c7b\u578b"}]},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,{name:"description",label:"\u63cf\u8ff0",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u63cf\u8ff0"}]},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,{name:"group_id",label:"\u5206\u7ec4"},u.a.createElement(n["a"],null)),u.a.createElement(l["a"].Item,null,u.a.createElement(i["a"],{type:"primary",htmlType:"submit"},"\u63d0\u4ea4"),u.a.createElement(i["a"],{onClick:()=>this.closeModal()},"\u53d6\u6d88")))))}}t["default"]=p}}]);