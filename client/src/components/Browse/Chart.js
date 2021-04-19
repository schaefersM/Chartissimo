import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import ChartController from "./ChartController";
import EditGraphModal from "./EditGraphModal";
import EditChartModal from "./EditChartModal";
import SaveChartModal from "./SaveChartModal";
import { useChartStore } from "../../stores/chartStore";

const Chart = ({
	config: {
		colorIds,
		customOptions,
		customGraphNames,
		data,
		defaultGraphNames,
		graphs,
		hosts,
		hours,
		id: name,
		isSaved,
		options,
		previousHour,
		type,
	},
	chartIndex,
}) => {
	const { triggerRerenderCharts } = useChartStore();

	const initialRender = useRef(true);
	const lineChart = useRef();

	const [isSavedChart, setIsSavedChart] = useState(isSaved ? true : false);
	const [showEditGraphModal, setShowEditGraphModal] = useState(false);
	const [showEditChartModal, setShowEditChartModal] = useState(false);
	const [showSaveChartModal, setShowSaveChartModal] = useState(false);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			if(!customOptions.fontSize) {
				console.log("update")
				lineChart.current.chartInstance.update();
			} else {
				console.log("ignore")
			}
		}
		// eslint-disable-next-line
	}, [triggerRerenderCharts]);

	useEffect(() => {
		if (!isSaved) {
			setIsSavedChart(false);
		}
		// eslint-disable-next-line
	}, [data]);

	const toggleEditGraphModal = () => {
		setShowEditGraphModal((prevState) => !prevState);
	};

	const toggleEditChartModal = () => {
		setShowEditChartModal((prevState) => !prevState);
	};

	const toggleSaveChartModal = () => {
		setShowSaveChartModal((prevState) => !prevState);
	};
	
	return (
		<div>
			<div>
				<Line
					name={name}
					data={data}
					options={options}
					ref={lineChart}
				/>
				<ChartController
					chartType={type}
					chartIndex={chartIndex}
					isSavedChart={isSavedChart}
					showEditChartModal={showEditChartModal}
					showEditGraphModal={showEditGraphModal}
					toggleEditChartModal={toggleEditChartModal}
					toggleEditGraphModal={toggleEditGraphModal}
					toggleSaveChartModal={toggleSaveChartModal}
				/>
				{showEditGraphModal && (
					<EditGraphModal
						chartIndex={chartIndex}
						datasets={data.datasets}
						lineChart={lineChart}
						setShowEditGraphModal={setShowEditGraphModal}
						showEditGraphModal={showEditGraphModal}
					/>
				)}
				{showEditChartModal && (
					<EditChartModal
						chartIndex={chartIndex}
						name={name}
						setShowEditChartModal={setShowEditChartModal}
						showEditChartModal={showEditChartModal}
					/>
				)}
				{showSaveChartModal && (
					<SaveChartModal
						toggleSaveChartModal={toggleSaveChartModal}
						showSaveChartModal={showSaveChartModal}
						data={{
							graphs,
							defaultGraphNames,
							customGraphNames,
							hosts,
							customOptions,
							colorIds,
							hours,
							previousHour,
						}}
						name={name}
						setIsSavedChart={setIsSavedChart}
						isSavedChart={isSavedChart}
						chartIndex={chartIndex}
						type={type}
						chartRef={lineChart}
					/>
				)}
			</div>
		</div>
	);
};

Chart.propTypes = {
	config: PropTypes.object.isRequired,
	chartIndex: PropTypes.number.isRequired,
};

export default Chart;
