import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types';
import React from "react";
import checkDuplicateHourData from "../../helper/checkDuplicateHourData"
import { useChartStore, useChartDispatch } from "../../stores/chartStore"


const DeleteGraph = ({ chartId, rowId }) => {

	const { charts } = useChartStore();
	const chartDispatch = useChartDispatch();

	const deleteGraph = () => {
		let newChart = { ...charts[chartId] };
		const {
			tableNames,
			customTableNames,
			graphs,
			hours,
			hosts,
			data,
			colorIds,
			data: { datasets },
			data: { labels },
			options,
			options: { scales },
			options: { scales: { yAxes } },
			type
		} = newChart;
		const newDatasets = [...datasets];
		newDatasets.splice(rowId, 1);
		const newTableNames = [...tableNames];
		newTableNames.splice(rowId, 1);
		const newCustomTableNames = [...customTableNames];
		newCustomTableNames.splice(rowId, 1);
		const newGraphs = [...graphs];
		newGraphs.splice(rowId, 1)
		const newHours = [...hours];
		const newColorIds = [...colorIds]
		const newHosts = [...hosts]
		let newLabels;
		if (type !== "comparison") {
			newHours.splice(rowId, 1);
			newHosts.splice(rowId, 1);
			newLabels = checkDuplicateHourData(newHours.slice(-1)[0], newHours);
		}
		if (!newDatasets.length) {
			charts.splice(chartId, 1);
			chartDispatch({type: "toggleEditGraphModal"})
			
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
				tableNames: newTableNames,
				customTableNames: newCustomTableNames,
				hours: type !== "comparison" ? newHours : hours,
				hosts: type !== "comparison" ? newHosts : hosts,
				colorIds: newColorIds,
				data: {
					...data,
					labels: type !== "comparison" ? newLabels : labels,
					datasets: newDatasets,
				},
				options: {
					...options,
					scales: {
						...scales,
						yAxes: newYAxes
					},
				},
				graphs: type === "comparison" ? [] : newGraphs
			};
			charts.splice(chartId, 1, newChart);
		}

		chartDispatch({ type: "updateChart", payload: charts })
	}

	return (
		<div>
			<FontAwesomeIcon
				icon={faTrash}
				onClick={deleteGraph}
				className="cursor-pointer"
			/>
		</div>
	);
};

DeleteGraph.propTypes = {
    chartId: PropTypes.number.isRequired,
    rowId: PropTypes.number.isRequired,
};

export default DeleteGraph;
