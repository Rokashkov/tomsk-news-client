module.exports = {
	apps : [{
		name : 'next',
		script : './node_modules/next/dist/bin/next',
		args: 'start',
		env:{
			PORT: 80
		}
	}]
}