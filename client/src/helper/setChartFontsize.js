export default function setChartFontsize(chart, fontSize) {
	const newYAxes = chart.options.scales.yAxes.map((scale, _) => {
		return {
			...scale,
			ticks: {
				...scale.ticks,
				fontSize,
			},
			scaleLabel: {
				...scale.scaleLabel,
				fontSize,
			},
		};
	});
	const newChart = {
		...chart,
		customOptions: {
			...chart.options.customOptions,
			fontSize,
		},
		options: {
			...chart.options,
			title: {
				...chart.options.title,
				fontSize,
			},
			legend: {
				...chart.options.legend,
				labels: {
					...chart.options.legend.labels,
					fontSize,
				},
			},
			scales: {
				xAxes: [
					{
						...chart.options.scales.xAxes[0],
						ticks: {
							...chart.options.scales.xAxes[0].ticks,
							fontSize,
						},
					},
				],
				yAxes: newYAxes,
			},
		},
	};

	return newChart;
}
