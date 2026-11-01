
export function UpdateActions(self) {
	self.setActionDefinitions({
		getHotkeys: {
			name: 'Get Hotkeys',
			options: [

			],
			callback: async (event) => {
				const data = {"apiName":"VTubeStudioPublicAPI","apiVersion":"1.0","requestID":"SomeID","messageType":"HotkeysInCurrentModelRequest","data":{"modelID":"Optional_UniqueIDOfModel","live2DItemFileName":"Optional_Live2DItemFileName"}}
				self.socket.send(JSON.stringify(data))
			},
		},
	})
}
function sendCommand() {
	const data = {
		"apiName": "VTubeStudioPublicAPI",
		"apiVersion": "1.0",
		"requestID": "SomeID",
		"messageType": "HotkeysInCurrentModelRequest",
		"data": { "modelID": "Optional_UniqueIDOfModel", "live2DItemFileName": "Optional_Live2DItemFileName" }
	}
	socket.send(JSON.stringify(data))
}
