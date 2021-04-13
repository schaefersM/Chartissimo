import { Line, defaults } from "react-chartjs-2";
import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import ChartController from "./ChartController";
import EditGraphModal from "./EditGraphModal";
import EditChartModal from "./EditChartModal";
import SaveChartModal from "./SaveChartModal";
import { useChartStore } from "../../stores/chartStore";
import { useAuthStore } from "../../stores/authStore";

const Chart = ({
	config: {
		colorIds,
		customOptions,
		customTableNames,
		data,
		graphs,
		hosts,
		hours,
		id: name,
		isSaved,
		options,
		previousHour,
		tableNames,
		type,
	},
	id,
}) => {
	const { isAuthenticated } = useAuthStore();
	const {
		triggerRerenderAfterDefaultConfigChanged,
		customGlobalOptions,
	} = useChartStore();

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
			if (isAuthenticated && customGlobalOptions.fontSize) {
				const setConfig = () => {
					defaults.global.defaultFontSize =
						customGlobalOptions.fontSize;
					defaults.global.legend.labels.defaultFontSize =
						customGlobalOptions.fontSize;
					lineChart.current.chartInstance.update();
				};
				setConfig();
			} else {
				defaults.global.defaultFontSize = customGlobalOptions.fontSize;
				defaults.global.legend.labels.defaultFontSize =
					customGlobalOptions.fontSize;
			}
		}
		// eslint-disable-next-line
	}, [triggerRerenderAfterDefaultConfigChanged]);

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
			<div id={id}>
				<Line
					name={name}
					data={data}
					options={options}
					ref={lineChart}
				/>
				<ChartController
					chartType={type}
					id={id}
					isSavedChart={isSavedChart}
					showEditChartModal={showEditChartModal}
					showEditGraphModal={showEditGraphModal}
					toggleEditChartModal={toggleEditChartModal}
					toggleEditGraphModal={toggleEditGraphModal}
					toggleSaveChartModal={toggleSaveChartModal}
				/>
				{showEditGraphModal && (
					<EditGraphModal
						chartId={id}
						datasets={data.datasets}
						lineChart={lineChart}
						setShowEditGraphModal={setShowEditGraphModal}
						showEditGraphModal={showEditGraphModal}
					/>
				)}
				{showEditChartModal && (
					<EditChartModal
						id={id}
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
							tableNames,
							customTableNames,
							hosts,
							customOptions,
							colorIds,
							hours,
							previousHour,
						}}
						name={name}
						setIsSavedChart={setIsSavedChart}
						isSavedChart={isSavedChart}
						id={id}
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
	id: PropTypes.number.isRequired,
};

export default Chart;
