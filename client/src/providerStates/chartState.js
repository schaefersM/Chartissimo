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
    showEditGraphModal: false,
    showMapModal: false,
    showFetchModal: false,
    triggerRerenderAfterDefaultConfigChanged: false,
};

export default ChartState;