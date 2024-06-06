const config = {
	mode: 'production',
	entry: {
		main: './src/js/main.js',
		index: './src/js/index.js',
		product: './src/js/product-info.js',
		products: './src/js/products.js',
		contacts: './src/js/contacts.js',

		// products pages
		herbicides: './src/js/products-pages/herbicides.js',
		fungicides: './src/js/products-pages/fungicides.js',
		insecticides: './src/js/products-pages/insecticides.js',
		desiccants: './src/js/products-pages/desiccants.js',
		poisoners: './src/js/products-pages/poisoners.js',
		adjuvants: './src/js/products-pages/adjuvants.js'
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
