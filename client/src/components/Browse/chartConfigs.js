/**
 * @type Diagrammkonfiguration
 * @property Array colorIds - Alle "colorId" der gezeichneten Graphen
 * @property Array defaultGraphNames - Alle Namen der ursprünglich gezeichneten Graphen
 * @property Array customGraphNames - Liste defaultGraphNames und ggf. veränderte Namen der Graphen
 * @property Object customOptions - Object mit den benutzerdefinierten Optionen (fontSize etc.)
 * @property Object data - ChartsJS Object mit Datensätzen für die Graphen und die X-Achse
 * @property Array graphs - Alle "checkString" der gezeichneten Graphen
 * @property Array hosts - Alle Hosts der gezeichneten Graphen
 * @property Array hours - Alle Zeitparameter der gezeichneten Graphen
 * @property boolean isSaved - Hat der User den Chart gespeichert?
 * @property Object options - ChartJS Object mit Optionen für das Diagramm
 * @property string previousHour - Letzter Zeitparameter
 * @property string savingChartName - Name des Diagramms unter dem der User es gespeichert hat.
 * @property string type: Art der Konfiguration
 */

const compConfig = {
	colorIds: [],
	defaultGraphNames: [],
	customGraphNames: [],
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
						suggestedMin: 0,
						suggestedMax: 40,
					},
					type: "linear",
				},
				{
					display: true,
					id: "humidity",
					position: "right",
					scaleLabel: {
						display: true,
						fontColor: "#6242f4",
						fontSize: undefined,
						fontStyle: "bold",
						labelString: "humidity in %",
					},
					ticks: {
						fontColor: "black",
						fontSize: undefined,
						fontStyle: "bold",
						stepSize: 10,
						suggestedMin: 50,
						suggestedMax: 90,
					},
					type: "linear",
				},
			],
		},
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
	},
	previousHour: "",
	savingChartName: "",
	type: "comparison",
};

/**
 * @type Diagrammkonfiguration
 * @property Array colorIds - Alle "colorId" der gezeichneten Graphen
 * @property Array defaultGraphNames - Alle Namen der ursprünglich gezeichneten Graphen
 * @property Array customGraphNames - Liste defaultGraphNames und ggf. veränderte Namen der Graphen
 * @property Object customOptions - Object mit den benutzerdefinierten Optionen (fontSize etc.)
 * @property Object data - ChartsJS Object mit Datensätzen für die Graphen und die X-Achse
 * @property Array graphs - Alle "checkString" der gezeichneten Graphen
 * @property Array hosts - Alle Hosts der gezeichneten Graphen
 * @property Array hours - Alle Zeitparameter der gezeichneten Graphen
 * @property boolean isSaved - Hat der User den Chart gespeichert?
 * @property Object options - ChartJS Object mit Optionen für das Diagramm
 * @property string previousHour - Letzter Zeitparameter
 * @property string savingChartName - Name des Diagramms unter dem der User es gespeichert hat.
 * @property string type: Art der Konfiguration
 */
const tempConfig = {
	colorIds: [],
	defaultGraphNames: [],
	customGraphNames: [],
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
				fontSize: undefined,
				fontStyle: "bold",
			},
		},
		responsive: true,
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
						labelString: "temperature in °C",
						fontColor: "black",
						fontSize: undefined,
					},
					ticks: {
						fontColor: "black",
						fontSize: undefined,
						fontStyle: "bold",
						stepSize: 10,
						suggestedMin: 0,
						suggestedMax: 40,
					},
					type: "linear",
				},
			],
		},
		title: {
			display: true,
			fontColor: "black",
			fontSize: undefined,
			fontStyle: "bold",
			text: "comparison of temperature",
		},
		tooltips: {
			// axis: 'x',
			bodyFontSize: 14,
			footerFontSize: 14,
			intersect: true,
			mode: "index",
			titleFontSize: 14,
		},
	},
	previousHour: "",
	savingChartName: "",
	type: "temperature",
};

/**
 * @type Diagrammkonfiguration
 * @property Array colorIds - Alle "colorId" der gezeichneten Graphen
 * @property Array defaultGraphNames - Alle Namen der ursprünglich gezeichneten Graphen
 * @property Array customGraphNames - Liste defaultGraphNames und ggf. veränderte Namen der Graphen
 * @property Object customOptions - Object mit den benutzerdefinierten Optionen (fontSize etc.)
 * @property Object data - ChartsJS Object mit Datensätzen für die Graphen und die X-Achse
 * @property Array graphs - Alle "checkString" der gezeichneten Graphen
 * @property Array hosts - Alle Hosts der gezeichneten Graphen
 * @property Array hours - Alle Zeitparameter der gezeichneten Graphen
 * @property boolean isSaved - Hat der User den Chart gespeichert?
 * @property Object options - ChartJS Object mit Optionen für das Diagramm
 * @property string previousHour - Letzter Zeitparameter
 * @property string savingChartName - Name des Diagramms unter dem der User es gespeichert hat.
 * @property string type: Art der Konfiguration
 */
const humConfig = {
	colorIds: [],
	defaultGraphNames: [],
	customGraphNames: [],
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
				fontSize: undefined,
				fontStyle: "bold",
			},
		},
		responsive: true,
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
					id: "humidity",
					position: "left",
					scaleLabel: {
						display: true,
						fontColor: "black",
						fontSize: undefined,
						labelString: "humidity in %",
					},
					ticks: {
						fontColor: "black",
						fontSize: undefined,
						fontStyle: "bold",
						stepSize: 10,
						suggestedMin: 40,
						suggestedMax: 100,
					},
					type: "linear",
				},
			],
		},
		title: {
			display: true,
			fontColor: "black",
			fontSize: undefined,
			fontStyle: "bold",
			text: "comparison of humidity",
		},
		tooltips: {
			// axis: 'x',
			bodyFontSize: 14,
			intersect: true,
			footerFontSize: 14,
			mode: "index",
			titleFontSize: 14,
		},
	},
	previousHour: "",
	savingChartName: "",
	type: "humidity",
};

export { compConfig, tempConfig, humConfig };
