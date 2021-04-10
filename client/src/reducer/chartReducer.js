export default function chartReducer(state, action) {
	const { type, payload } = action;

	switch (type) {
		case "addNewChart":
			return {
				...state,
				showMapModal: !state.showMapModal,
				showFetchModal: !state.showFetchModal,
				charts: [...payload],
			};
		case "changeDate":
			return {
				...state,
				fetchInformation: {
					...state.fetchInformation,
					date: payload,
				},
			};
		case "changeHour":
			return {
				...state,
				fetchInformation: {
					...state.fetchInformation,
					hour: payload,
				},
			};
		case "fetchData":
			return {
				...state,
				fetchInformation: {
					...state.fetchInformation,
					type: payload.type,
					hour: payload.hour,
				},
			};
		case "rerenderCharts":
			return {
				...state,
				triggerRerenderAfterDefaultConfigChanged: !state.triggerRerenderAfterDefaultConfigChanged,
			};
		case "resetCharts":
			return {
				...state,
				charts: [],
			};
		case "resetFetchData":
			return {
				...state,
				fetchInformation: {
					hour: "",
					type: "",
					date: "",
					host: "",
				},
			};
		case "setCustomGlobalOptions":
			return {
				...state,
				triggerRerenderAfterDefaultConfigChanged: !state.triggerRerenderAfterDefaultConfigChanged,
				customGlobalOptions: {
					...state.customGlobalOptions,
					...payload,
				},
			};
		case "toggleEditGraphModal":
			return {
				...state,
				showEditGraphModal: !state.showEditGraphModal,
			};
		case "toggleFetchModal":
			return {
				...state,
				showFetchModal: !state.showFetchModal,
				fetchModalLabel: payload.fetchLabelName,
				fetchInformation: {
					...state.fetchInformation,
					date: "",
					host: payload.host,
					hostLocation: payload.hostLocation,
				},
			};
		case "toggleMapModal":
			return {
				...state,
				chartId: payload.chartId,
				position: payload.position,
				showMapModal: !state.showMapModal,
				chartType: payload.chartType,
			};

		case "updateChart":
			return {
				...state,
				charts: [...payload],
			};
		default:
			break;
	}
}
