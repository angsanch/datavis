const options = {
	definition: {
	  openapi: '3.0.0',
	  info: {
		title: 'API Documentation',
		version: '1.0.0',
		description: 'API details',
	  },
	},
	apis: ['./src/routes/*.js'], // Path to the API docs (adjust as needed)
  };
  
  module.exports = options;
  