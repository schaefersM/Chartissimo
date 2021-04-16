import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";
import React from "react";
import { checkDuplicateHourData } from "../../helper";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const DeleteGraph = ({ chartIndex, rowIndex }) => {
	const { charts } = useChartStore();
	const chartDispatch = useChartDispatch();

	const deleteGraph = () => {
		let newChart = { ...charts[chartIndex] };
		const {
			colorIds,
			customGraphNames,
			data,
			data: { datasets, labels },
			defaultGraphNames,
			graphs,
			hosts,
			hours,
			options,
			options: { scales },
			options: {
				scales: { yAxes },
			},
			type,
		} = newChart;
		const newDatasets = [...datasets];
		newDatasets.splice(rowIndex, 1);
		const newDefaultGraphNames = [...defaultGraphNames];
		newDefaultGraphNames.splice(rowIndex, 1);
		const newCustomGraphNames = [...customGraphNames];
		newCustomGraphNames.splice(rowIndex, 1);
		const newGraphs = [...graphs];
		newGraphs.splice(rowIndex, 1);
		const newHours = [...hours];
		const newColorIds = [...colorIds];
		const newHosts = [...hosts];
		let newLabels;
		if (type !== "comparison") {
			newHours.splice(rowIndex, 1);
			newHosts.splice(rowIndex, 1);
			newLabels = checkDuplicateHourData(newHours.slice(-1)[0], newHours);
		}
		if (!newDatasets.length) {
			charts.splice(chartIndex, 1);
		} else {
			const newYAxes = [...yAxes];
			if (type === "comparison") {
				newColorIds.splice(rowIndex, 1);
				const newYAxe = { ...yAxes[rowIndex] };
				newYAxe.display = false;
				newYAxes.splice(rowIndex, 1, newYAxe);
			}
			newChart = {
				...newChart,
				colorIds: newColorIds,
				customGraphNames: newCustomGraphNames,
				data: {
					...data,
					datasets: newDatasets,
					labels: type !== "comparison" ? newLabels : labels,
				},
				graphs: newGraphs,
				hosts: type !== "comparison" ? newHosts : hosts,
				hours: type !== "comparison" ? newHours : hours,
				options: {
					...options,
					scales: {
						...scales,
						yAxes: newYAxes,
					},
				},
				defaultGraphNames: newDefaultGraphNames,
			};
			charts.splice(chartIndex, 1, newChart);
		}

		chartDispatch({ type: "updateChart", payload: charts });
	};

	return (
		<div>
			<FontAwesomeIcon
				className="cursor-pointer"
				icon={faTrash}
				onClick={deleteGraph}
				size={isMobile ? "2x" : "1x"}
			/>
		</div>
	);
};

DeleteGraph.propTypes = {
	chartIndex: PropTypes.number.isRequired,
	rowIndex: PropTypes.number.isRequired,
};

export default DeleteGraph;
