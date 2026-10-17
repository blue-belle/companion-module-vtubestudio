

module.exports = function (self) {
	self.setActionDefinitions({
		authenticate_action: {
			name: 'Get Auth Token',
			options: [
				{
					id: 'authToken',
					type: 'textinput',
					label: 'Authentication Token',

				},
			],
			hasResult: true,
			callback: async (event) => {
//				console.log('Authentication token has been requested')
				// this line wants to set the "authToken" value on the config page to the result of the authenticate functin, which the console does indicate is grabbing the right token. I just don't know the syntax to "send" the information from actions.js to main.js, and vice-versa.'
				//instance.config.authToken=authenticate()
//				self.saveConfig(authenticate())
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


// Listen for messages and executes when a message is received from the server.



// seems to be for sending a different type of command, probably for testing.
function sendCommand() {
	const data = {"apiName":"VTubeStudioPublicAPI","apiVersion":"1.0","requestID":"SomeID","messageType":"AvailableModelsRequest"}
	socket.send(JSON.stringify(data))
}
