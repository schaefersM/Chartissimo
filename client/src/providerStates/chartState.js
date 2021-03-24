const ChartState = {
    chartType: "",
    chartId: null,
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
    showMapModal: false,
    showFetchModal: false,
    triggerRerenderAfterDefaultConfigChanged: false,
};

export default ChartState;