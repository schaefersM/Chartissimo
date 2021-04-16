import { checkDayData, checkHourData, labelGenerator } from ".";

export default function checkFetchedDataGallery(
	data,
	config,
	type,
	fetchHour,
	hours,
	defaultGraphNames,
	customGraphNames,
	colorIds,
	reset = false
) {
	let validData = [];
	let labels;

	if (data[0][0] && typeof data[0][0].hour === "number") {
		validData = data.map((item) => checkDayData(item));
		labels = labelGenerator("hour", fetchHour, reset);
	} else if (data[0][0] && typeof data[0][0].minute === "number") {
		validData = data.map((item) => checkHourData(item));
		labels = reset
			? labelGenerator("minute", fetchHour, reset)
			: labelGenerator("minute", fetchHour, reset, hours);
	} else {
		console.log("invalid Data");
	}

	//TODO Datasetslabel in einer Funktion für Browser and ChartPage Komponent

	const newDatasets = validData.map((data, index) => {
		const type = defaultGraphNames[index].split("-")[0];
		return {
			label: customGraphNames[index],
			yAxisID: type,
			fill: false,
			pointRadius: 3,
			backgroundColor: colorIds[index],
			borderColor: colorIds[index],
			data,
		};
	});
	let newOptions = { ...config.options };
	if (type === "comparison") {
		newOptions = {
			...newOptions,
			scales: {
				xAxes: [...newOptions.scales.xAxes],
				yAxes: [
					{
						...newOptions.scales.yAxes[0],
						scaleLabel: {
							...newOptions.scales.yAxes[0].scaleLabel,
							fontColor: colorIds[0],
						},
						display:
							defaultGraphNames[0].split("-")[0] === "temperature"
								? true
								: false,
					},
					{
						...newOptions.scales.yAxes[1],
						scaleLabel: {
							...newOptions.scales.yAxes[1].scaleLabel,
							fontColor:
								defaultGraphNames[0].split("-")[0] === "humidity"
									? colorIds[0]
									: colorIds[1],
						},
						display:
							defaultGraphNames[0].split("-")[0] === "humidity" ||
							defaultGraphNames[1]
								? true
								: false,
					},
				],
			},
		};
	}

	return {
		labels,
		datasets: newDatasets,
		options: newOptions,
	};
}
