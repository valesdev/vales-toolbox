
module.exports = [
	{
		'path': '/',
		'component': require('./views/home.vue'),
	},
	{
		'path': '/text-encoding',
		'component': require('./views/tool-text-encoding.vue'),
		'meta': {
			'title': 'Text Encoding',
		},
	},
	{
		'path': '/base64',
		'component': require('./views/tool-base64.vue'),
		'meta': {
			'title': 'Base64',
		},
	},
	{
		'path': '/repayment-calc',
		'component': require('./views/tool-repayment-calc.vue'),
		'meta': {
			'title': '贷款计算',
		},
	},
	{
		'path': '*',
		'component': require('./views/404.vue'),
	},
]

