import router from 'umi/router';
import { API } from '../utils';

class Jump {

	static matchers = {
		qq: / QQ\//,
		wechat: / MicroMessenger\//,
		alipay: /AlipayClient\//,
		zhihu: /ZhihuHybrid/,
		netease: /NeteaseMusic/,
		weibo: /Weibo/,
		yixin: /YiXin/
	};

	 static test(targets,ua) {
		 if(targets==false) {
			 return '_NULL_';
		 }
		 for(var target of targets) {
			 if(Jump.matchers[target[0]].test(ua)) {
				 return target[1];
			 }
		 }
		 return '_NULL_';
	}

	static execute(targets,ua) {
		var url = Jump.test(targets,ua);
		if(url!='_NULL_') {
			if(url.startsWith('$')) {
				var tmp = url.replace('$','');
				API.get('/card/'+tmp+'?tracker=@UA')
					.then(resp=>resp.json())
					.then(json=>window.location.href=json.url);
			} else {
				router.push(`/card/${url}/@UA`);
			}
		}
	}

}

export default Jump;
