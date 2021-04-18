import PropTypes from "prop-types";
import React, { useState } from "react";
import { defaults } from "react-chartjs-2";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { setChartFontsize } from "../../helper";
import { useAuthStore } from "../../stores/authStore";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const EditChartContainer = ({ chartIndex, setShowEditChartModal }) => {
	const { isAuthenticated, user } = useAuthStore();
	const chartDispatch = useChartDispatch();
	const { charts, defaultOptions } = useChartStore();

	const [fontSize, setFontSize] = useState(
		charts[chartIndex].customOptions.fontSize
			? charts[chartIndex].customOptions.fontSize
			: defaultOptions.fontSize
	);
	const [initialFontSize] = useState(
		charts[chartIndex].customOptions.fontSize
			? charts[chartIndex].customOptions.fontSize
			: defaultOptions.fontSize
	);

	const handleRange = (e) => {
		setFontSize(e);
		const newChart = setChartFontsize(charts[chartIndex], e);
		charts.splice(chartIndex, 1, newChart);
		chartDispatch({ type: "updateChart", payload: charts });
	};

	const handleSave = async () => {
		try {
			const { user_id } = user;
			const options = {
				credentials: "include",
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					config: {
						fontSize,
					},
				}),
			};
			const response = await fetch(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/api/user/${user_id}/config`,
				options
			);

			if (!response.ok) {
				console.log(await response.json());
			} else {
				const newChart = setChartFontsize(charts[chartIndex], undefined);
				charts.splice(chartIndex, 1, newChart);
				chartDispatch({ type: "updateChart", payload: charts });
				chartDispatch({
					type: "setDefaultOptions",
					payload: { fontSize },
				});
				defaults.global.defaultFontSize = fontSize;
				defaults.global.legend.labels.defaultFontSize = fontSize;
				setShowEditChartModal((prevState) => !prevState);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<div className="edit-chart-modal-container-fontsize-container d-flex flex-column flex-nowrap">
				<span className="font-weight-bold mx-auto">Fontsize </span>
				<Slider
					min={10}
					max={32}
					startPoint={fontSize}
					defaultValue={initialFontSize}
					className="edit-chart-modal-container-fontsize-slider py-2"
					onChange={handleRange}
					railStyle={{
						backgroundColor: "darkgreen",
						height: "10px",
						marginRight: "1em",
					}}
					handleStyle={{
						backgroundColor: "#b9b9b9",
						borderStyle: "solid",
						borderWidth: "2px",
						borderColor: "#606060",
						padding: "8px",
					}}
					trackStyle={{
						backgroundColor: "#313131",
						height: "10px",
					}}
				/>
				{/* Wenn nicht eingeloggte Benutzer sich im LoginComponent einloggen können sollen ist {fontSize !== initialFontSize} nötig, weil lineChart.current.chartInstance.update() ein Error wirft*/}
				{isAuthenticated && (
					<button
						className="btn btn-sm edit-chart-modal-container-fontsize-button mx-auto mt-3"
						onClick={handleSave}
					>
						Save as default fontsize
					</button>
				)}
			</div>
		</div>
	);
};

EditChartContainer.propTypes = {
	chartIndex: PropTypes.number.isRequired,
	setShowEditChartModal: PropTypes.func.isRequired,
};

export default React.memo(EditChartContainer);
