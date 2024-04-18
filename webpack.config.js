const config = {
	mode: 'production',
	entry: {
		main: './src/js/main.js',
		index: './src/js/index.js',
		product: './src/js/product.js',
		contacts: './src/js/contacts.js'
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;
