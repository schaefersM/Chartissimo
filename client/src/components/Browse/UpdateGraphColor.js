import PropTypes from "prop-types";
import React from "react";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const UpdateGraphColor = ({ chartIndex, color, rowType, rowIndex }) => {
	const chartDispatch = useChartDispatch();
	const { charts } = useChartStore();

	const changeGraphColor = (e) => {
		const newColorValue = e.target.value;
		let newChart = { ...charts[chartIndex] };
		const {
			colorIds,
			data,
			data: { datasets },
			options,
			options: { scales },
			options: {
				scales: { yAxes },
			},
			type,
		} = newChart;
		let newYAxes = [...yAxes];
		if (type === "comparison") {
			let newYAxe;
			if (rowType === "temperature") {
				newYAxe = yAxes[0];
				newYAxe.scaleLabel.fontColor = newColorValue;
				newYAxes.splice(0, 1, newYAxe);
			} else {
				newYAxe = yAxes[1];
				newYAxe.scaleLabel.fontColor = newColorValue;
				newYAxes.splice(1, 1, newYAxe);
			}
		}
		const newDataset = { ...datasets[rowIndex] };
		newDataset.backgroundColor = newDataset.borderColor = newColorValue;
		const newDatasets = [...datasets];
		newDatasets.splice(rowIndex, 1, newDataset);
		const newColorIds = [...colorIds[rowIndex]];
		newColorIds.splice(rowIndex, 1, newColorValue);
		colorIds.splice(rowIndex, 1, newColorValue);
		newChart = {
			...newChart,
			colorIds,
			data: {
				...data,
				datasets: newDatasets,
			},
			options: {
				...options,
				scales: {
					...scales,
					yAxes: newYAxes,
				},
			},
		};
		charts.splice(chartIndex, 1, newChart);
		chartDispatch({ type: "updateChart", payload: charts });
	};

	return (
		<input
			type="color"
			value={color}
			onChange={changeGraphColor}
			className="cursor-pointer align-middle edit-graph-container-color-input"
		/>
	);
};

UpdateGraphColor.propTypes = {
	chartIndex: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	rowType: PropTypes.string.isRequired,
	rowIndex: PropTypes.number.isRequired,
};

export default UpdateGraphColor;
