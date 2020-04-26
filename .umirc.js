
// ref: https://umijs.org/config/
export default {
	history: 'hash',
	treeShaking: true,
	plugins: [
		// ref: https://umijs.org/plugin/umi-plugin-react.html
		['umi-plugin-react', {
			antd: true,
			dva: false,
			dynamicImport: {
				loadingComponent: './Loading',
				webpackChunkName: true
			},
			title: 'SocialCard',
			dll: false,
			fastClick: true,
			pwa: true,
			routes: {
				exclude: [
					/components\//,
				],
			},
		}],
	],
}
