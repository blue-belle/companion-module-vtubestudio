const { InstanceBase, Regex, runEntrypoint, InstanceStatus } = require('@companion-module/base')
const UpgradeScripts = require('./upgrades')
const UpdateActions = require('./actions')
const UpdateFeedbacks = require('./feedbacks')
const UpdateVariableDefinitions = require('./variables')
const vts = require("vtubestudio");
const ApiClient = vts.ApiClient;
const fs = require("fs")



// API CLIENT OPTIONS
function setAuthToken(authenticationToken) {
	console.log(autenticationToken);
//	fs.writeFileSync("./authToken.txt", authenticationToken, {
	//	encoding: "utf-8",
	//});

}

function getAuthToken() {
	console.log("Trying to retrieve the auth token");
	//return fs.readFileSync("./authToken.txt", "utf-8");
}

const options = {
	authTokenGetter: getAuthToken,
	authTokenSetter: setAuthToken,
	pluginName: "Bitfocus Companion",
	pluginDeveloper: "blue-belle",
};

const apiClient = new ApiClient(options);



// BOILERPLATE CODE FROM COMPANION
//
//
class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)
	}

	async init(config) {
		this.config = config

		this.updateStatus(InstanceStatus.Ok)

		this.updateActions() // export actions
		this.updateFeedbacks() // export feedbacks
		this.updateVariableDefinitions() // export variable definitions
	}



	// When module gets deleted
	async destroy() {
		this.log('debug', 'destroy')
	}

	async configUpdated(config) {
		this.config = config
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
