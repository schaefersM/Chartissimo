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
    modalLabel: "",
    position: "",
    showMap: false,
    showModal: false,
    triggerRerenderAfterDefaultConfigChanged: false,
};

export default ChartState;