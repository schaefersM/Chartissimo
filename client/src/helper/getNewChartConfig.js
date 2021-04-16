export default function getNewChartConfig(checkedData, config, chartData) {
	const { datasets, labels, options } = checkedData;

	const {
		data: {
			colorIds,
			customGraphNames,
			graphs,
			hours,
			previousHour,
			defaultGraphNames,
		},
		hosts,
		name,
	} = chartData;

	const newConfig = {
		...config,
		colorIds,
		customGraphNames,
		data: { labels, datasets },
		graphs,
		hours,
		hosts,
		isSaved: true,
		options,
		previousHour,
		savingChartName: name,
		defaultGraphNames,
	};

	return newConfig;
}
