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
				fetchParameter: {
					...state.fetchParameter,
					date: payload,
				},
			};
		case "changeHour":
			return {
				...state,
				fetchParameter: {
					...state.fetchParameter,
					hour: payload,
				},
			};
		case "rerenderCharts":
			return {
				...state,
				triggerRerenderCharts: !state.triggerRerenderCharts,
			};
		case "eraseCharts":
			return {
				...state,
				charts: [],
			};
		case "setDefaultOptions":
			return {
				...state,
				triggerRerenderCharts: !state.triggerRerenderCharts,
				defaultOptions: {
					...state.defaultOptions,
					...payload,
				},
			};
		case "setFetchParameter":
			return {
				...state,
				fetchParameter: {
					...state.fetchParameter,
					type: payload.type,
					hour: payload.hour,
				},
			};
		case "toggleFetchModal":
			return {
				...state,
				showFetchModal: !state.showFetchModal,
				fetchModalTitle: payload.fetchModalTitle,
				fetchParameter: {
					...state.fetchParameter,
					date: "",
					host: payload.host,
				},
			};
		case "toggleMapModal":
			return {
				...state,
				chartIndex: payload.chartIndex,
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
