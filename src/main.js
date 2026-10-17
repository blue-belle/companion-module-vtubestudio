const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
//const vts = require("vtubestudio");
//const ApiClient = vts.ApiClient;


// API CLIENT OPTIONS
//function setAuthToken(authenticationToken) {
//	console.log(This.autenticationToken);
//	this.instance.config.accessToken = authenticationToken;
//}


//const options = {
//	authTokenGetter: getAuthToken,
//	authTokenSetter: setAuthToken,
//	pluginName: "Bitfocus Companion",
//	pluginDeveloper: "blue-belle",
//	//pluginIcon: fs.readFileSync("/icon.txt")
//};



// BOILERPLATE CODE FROM COMPANION
 class ModuleInstance extends InstanceBase {
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

		this.socket.addEventListener('open', () => { // Executes when the connection is successfully established.
			console.log('WebSocket connection established...');
			if (!this.config.AuthenticationToken.length)  { //skip if token is already set
				this.authenticate()
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
		});
	}

	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config

	}

	//Authentication function
	 authenticate() {
		const data =  {"apiName":"VTubeStudioPublicAPI","apiVersion":"1.0","requestID":"SomeID","messageType":"AuthenticationTokenRequest","data":{"pluginName":"Bitfocus Companion","pluginDeveloper":"blue-belle"}}
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

runEntrypoint(ModuleInstance, UpgradeScripts)


