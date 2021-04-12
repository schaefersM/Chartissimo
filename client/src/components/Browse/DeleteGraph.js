import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { checkDuplicateHourData } from "../../helper";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const DeleteGraph = ({ chartId, rowId }) => {
	const { charts } = useChartStore();
	const chartDispatch = useChartDispatch();

	const deleteGraph = () => {
		let newChart = { ...charts[chartId] };
		const {
			colorIds,
			customTableNames,
			data,
			data: { datasets },
			data: { labels },
			graphs,
			hosts,
			hours,
			options,
			options: { scales },
			options: {
				scales: { yAxes },
			},
			tableNames,
			type,
		} = newChart;
		const newDatasets = [...datasets];
		newDatasets.splice(rowId, 1);
		const newTableNames = [...tableNames];
		newTableNames.splice(rowId, 1);
		const newCustomTableNames = [...customTableNames];
		newCustomTableNames.splice(rowId, 1);
		const newGraphs = [...graphs];
		newGraphs.splice(rowId, 1);
		const newHours = [...hours];
		const newColorIds = [...colorIds];
		const newHosts = [...hosts];
		let newLabels;
		if (type !== "comparison") {
			newHours.splice(rowId, 1);
			newHosts.splice(rowId, 1);
			newLabels = checkDuplicateHourData(newHours.slice(-1)[0], newHours);
		}
		if (!newDatasets.length) {
			charts.splice(chartId, 1);
		} else {
			const newYAxes = [...yAxes];
			if (type === "comparison") {
				newColorIds.splice(rowId, 1);
				const newYAxe = { ...yAxes[rowId] };
				newYAxe.display = false;
				newYAxes.splice(rowId, 1, newYAxe);
			}
			newChart = {
				...newChart,
				colorIds: newColorIds,
				customTableNames: newCustomTableNames,
				data: {
					...data,
					datasets: newDatasets,
					labels: type !== "comparison" ? newLabels : labels,
				},
				graphs: type === "comparison" ? [] : newGraphs,
				hosts: type !== "comparison" ? newHosts : hosts,
				hours: type !== "comparison" ? newHours : hours,
				options: {
					...options,
					scales: {
						...scales,
						yAxes: newYAxes,
					},
				},
				tableNames: newTableNames,
			};
			charts.splice(chartId, 1, newChart);
		}

		chartDispatch({ type: "updateChart", payload: charts });
	};

	return (
		<div>
			<FontAwesomeIcon
				className="cursor-pointer"
				icon={faTrash}
				onClick={deleteGraph}
			/>
		</div>
	);
};

DeleteGraph.propTypes = {
	chartId: PropTypes.number.isRequired,
	rowId: PropTypes.number.isRequired,
};

export default DeleteGraph;
