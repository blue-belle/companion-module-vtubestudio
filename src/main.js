import { InstanceBase, Regex, InstanceStatus } from '@companion-module/base'
import { UpgradeScripts } from './upgrades.js'
import { UpdateActions } from './actions.js'
import { UpdateFeedbacks } from './feedbacks.js'
import { UpdateVariableDefinitions } from './variables.js'

export { UpgradeScripts }

export default class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}
	socket = new WebSocket('ws://localhost:8001');
	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions

		this.socket.addEventListener('open', () => { //Executes when connection is succesfully established
			console.log('Websocket connection established...');
			if (!this.config.AuthenticationToken) { //skip if token is already set
				this.getAuthToken()
			}
			else {
				this.sendAuthToken()
			}
		})
		this.socket.addEventListener('message', (event) => {
			const decoded = JSON.parse(event.data)
			if (decoded?.messageType === 'AuthenticationTokenResponse'){ //if the response type is an authentication token
				const authToken = decoded.data.authenticationToken
				console.log('Authentication token is: ', authToken)
				this.config.AuthenticationToken = authToken
				this.saveConfig(this.config)
			}
		    else {
				console.log(JSON.parse(event.data))
			}
		});
	}
	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
	}
	//Request a new token from VTS
	getAuthToken() {
		const data =  {"apiName":"VTubeStudioPublicAPI","apiVersion":"1.0","requestID":"SomeID","messageType":"AuthenticationTokenRequest","data":{"pluginName":"Bitfocus Companion","pluginDeveloper":"blue-belle"}}
		this.socket.send(JSON.stringify(data)) //Send Request
	}
	//Send our token to vts to authenticate this session
	sendAuthToken() {
		const data =  {
			"apiName": "VTubeStudioPublicAPI",
			"apiVersion": "1.0",
			"requestID": "SomeID",
			"messageType": "AuthenticationRequest",
			"data": {
				"pluginName": "Bitfocus Companion",
				"pluginDeveloper": "blue-belle",
				"authenticationToken": this.config.AuthenticationToken
			}
		}
		this.socket.send(JSON.stringify(data)) //Send Request

	}
	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 8,
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 4,
				regex: Regex.PORT,
			},
			{
				type: 'textinput',
				id: 'AuthenticationToken',
				label: 'Authentication Token',
				width: 64,
			},
		]
	}

	updateActions() {
		UpdateActions(this)
	}

	updateFeedbacks() {
		UpdateFeedbacks(this)
	}

	updateVariableDefinitions() {
		UpdateVariableDefinitions(this)
	}
}
