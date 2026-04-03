module.exports = function (self) {
	self.setActionDefinitions({
		sample_action: {
			name: 'My First Action',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.num)
			},


		},
		sample_action2: {
			name: 'Load Model',
			options: [
				{
					id: 'model',
					type: 'textinput',
					label: 'Model to Load:',

				},
			],
			callback: async (event) => {
				console.log('Attempting to load model', event.options.model)
			},


		},
	})
}
