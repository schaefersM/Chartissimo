const ChartState = {
    chartType: "",
    chartIndex: null,
    charts: [],
    configType: "",
    defaultOptions: {},
    fetchModalTitle: "",
    fetchParameter: {
        date: "",
        host: "",
        hour: "",
        type: "",
    },
    position: "",
    showMapModal: false,
    showFetchModal: false,
    triggerRerenderCharts: false,
};

export default ChartState;
