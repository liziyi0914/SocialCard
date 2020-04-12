
const URL = 'http://lzy2002.com:5000';

var API = {
	get: (path)=>fetch(URL+path),
	post: (path,token,data)=>fetch(URL+path,{
		method: 'POST',
		mode: 'cors',
		body: JSON.stringify({
			token: token,
			data: data
		})
	}),
	delete: (path,token)=>fetch(URL+path,{
		method: 'DELETE',
		mode: 'cors',
		body: JSON.stringify({
			token: token
		})
	}),
};

export { API };
