/***
 * @type Diagrammkonfiguration
 * @property string type: Art der Konfiguration
 * @property string previousHour - Letzter Zeitparameter
 * @property Array hours - Alle bisherigen Zeitparameter
 * @property Array graphs - Alle "checkString" der gezeichneten Graphen
 * @property Array colorIds - Alle "colorId" der gezeichneten Graphen
 * @property Array tableNames - Alle "labelNames" der gezeichneten Graphen
 * @property Object customOptions - Object mit den geänderten Optionen des Benutzers
 * @property Object data - ChartsJS Object mit Datensätzen für die Graphen und die X-Achse
 * @property Object options - ChartJS Object mit Optionen für das Diagramm 
 */

const compConfig = {
    colorIds: [],
    customTableNames: [],
    customOptions: {},
    data: {
        datasets: [],
        labels: [],
    },
    graphs: [],
    hosts: [],
    hours: [],
    isSaved: false,
    options: {
        aspectRatio: 2,
        legend: {
            labels: {
                fontColor: "black",
                fontSize: undefined,
                fontStyle: "bold",
            },
        },
        responsive: true,
        title: {
            display: true,
            fontColor: "black",
            fontSize: undefined,
            fontStyle: "bold",
            text: "comparison of temperature and humidity",
        },
        tooltips: {
            bodyFontSize: 14,
            footerFontSize: 14,
            intersect: true, 
            mode: "index",
            titleFontSize: 14,
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    ticks: {
                        fontColor: "black",
                        fontSize: undefined,
                        fontStyle: "bold",
                    },
                },
            ],
            yAxes: [
                {
                    display: true,
                    id: "temperature",
                    position: "left",
                    scaleLabel: {
                        display: true,
                        fontColor: "#f44242",
                        fontSize: undefined,
                        fontStyle: "bold",
                        labelString: "temperature in °C",
                    },
                    ticks: {
                        fontColor: "black",
                        fontSize: undefined,
                        fontStyle: "bold",
                        stepSize: 10,
                        suggestedMin: 0, //MinWert der Y-Achse
                        suggestedMax: 40, //MaxWert der Y-Achse
                    },
                    type: "linear",
                },
                {
                    display: true,
                    id: "humidity",
                    position: "right",
                    scaleLabel: {
                        display: true,
                        labelString: "humidity in %",
                        fontColor: "#6242f4",
                        fontStyle: "bold",
                        fontSize: undefined,
                    },
                    ticks: {
                        fontColor: "black",
                        fontSize: undefined,
                        fontStyle: "bold",
                        stepSize: 10,
                        suggestedMin: 50, //MinWert der Y-Achse
                        suggestedMax: 90, //MaxWert der Y-Achse
                    },
                    type: "linear",
                },
            ],
        },
    },
    previousHour: "",
    savingChartName: "",
    tableNames: [],
    type: "comparison",
};

/***
 * @type Diagrammkonfiguration
 * @property string type: Art der Konfiguration
 * @property string previousHour - Letzter Zeitparameter
 * @property Array hours - Alle bisherigen Zeitparameter
 * @property Array graphs - Alle "checkString" der gezeichneten Graphen
 * @property Array colorIds - Alle "colorId" der gezeichneten Graphen
 * @property Array tableNames - Alle "labelNames" der gezeichneten Graphen
 * @property Object data - ChartsJS Object mit Datensätzen für die Graphen und die X-Achse
 * @property Object options - ChartJS Object mit Optionen für das Diagramm 
 */

const tempConfig = {
    colorIds: [],
    customTableNames: [],
    customOptions: {},
    data: {
        datasets: [],
        labels: [],
    },
    graphs: [],
    hosts: [],
    hours: [],
    options: {
        legend: {
            labels: {
                fontColor: "black",
                fontStyle: "bold",
                fontSize: undefined,
            },
        },
        responsive: true,
        title: {
            display: true,
            fontColor: "black",
            fontStyle: "bold",
            fontSize: undefined,
            text: "comparison of temperature",
        },
        tooltips: {
            mode: "index",
            // axis: 'x',
            intersect: true, //Wenn Mobile Device, dann true
            bodyFontSize: 14,
            titleFontSize: 14,
            footerFontSize: 14,
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    ticks: {
                        fontColor: "black",
                        fontSize: undefined,
                        fontStyle: "bold",
                    },
                },
            ],
            yAxes: [
                {
                    display: true,
                    ticks: {
                        fontColor: "black",
                        fontSize: undefined,
                        fontStyle: "bold",
                        stepSize: 10,
                        suggestedMin: 0, //MinWert der Y-Achse
                        suggestedMax: 40, //MaxWert der Y-Achse
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "temperature in °C",
                        fontColor: "black",
                        fontSize: undefined,
                    },
                    id: "temperature",
                    type: "linear",
                    position: "left",
                },
            ],
        },
    },
    previousHour: "",
    savingChartName: "",
    tableNames: [],
    type: "temperature",
};

/***
 * @type Diagrammkonfiguration
 * @property string type: Art der Konfiguration
 * @property string previousHour - Letzter Zeitparameter
 * @property Array hours - Alle bisherigen Zeitparameter
 * @property Array graphs - Alle "checkString" der gezeichneten Graphen
 * @property Array colorIds - Alle "colorId" der gezeichneten Graphen
 * @property Array tableNames - Alle "labelNames" der gezeichneten Graphen
 * @property Object data - ChartsJS Object mit Datensätzen für die Graphen und die X-Achse
 * @property Object options - ChartJS Object mit Optionen für das Diagramm 
 */

const humConfig = {
    colorIds: [],
    customTableNames: [],
    customOptions: {},
    data: {
        datasets: [],
        labels: [],
    },
    graphs: [],
    hosts: [],
    hours: [],
    options: {
        legend: {
            labels: {
                fontColor: "black",
                fontStyle: "bold",
                fontSize: undefined,
            },
        },
        responsive: true,
        title: {
            display: true,
            fontColor: "black",
            fontStyle: "bold",
            fontSize: undefined,
            text: "comparison of humidity",
        },
        tooltips: {
            mode: "index",
            // axis: 'x',
            intersect: true, //Wenn Mobile Device, dann true
            bodyFontSize: 14,
            titleFontSize: 14,
            footerFontSize: 14,
        },
        scales: {
            xAxes: [
                {
                    display: true,
                    ticks: {
                        fontColor: "black",
                        fontSize: undefined,
                        fontStyle: "bold",
                    },
                },
            ],
            yAxes: [
                {
                    display: true,
                    ticks: {
                        fontColor: "black",
                        fontSize: undefined,
                        fontStyle: "bold",
                        stepSize: 10,
                        suggestedMin: 40, //MinWert der Y-Achse
                        suggestedMax: 100, //MaxWert der Y-Achse
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "humidity in %",
                        fontColor: "black",
                        fontSize: undefined,
                    },
                    id: "humidity",
                    type: "linear",
                    position: "left",
                },
            ],
        },
    },
    previousHour: "",
    savingChartName: "",
    tableNames: [],
    type: "humidity",
};

export {
    compConfig,
    tempConfig,
    humConfig
}