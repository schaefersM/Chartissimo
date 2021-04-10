const ChartState = {
	chartId: null,
	chartType: "",
	charts: [],
	configType: "",
	customGlobalOptions: {},
	fetchInformation: {
		date: "",
		host: "",
		hostLocation: "",
		hour: "",
		type: "",
	},
	fetchModalLabel: "",
	position: "",
	showEditGraphModal: false,
	showMapModal: false,
	showFetchModal: false,
	triggerRerenderAfterDefaultConfigChanged: false,
};

export default ChartState;
