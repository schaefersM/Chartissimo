import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import SaveConfigModal from "./SaveConfigModal";
import { setChartFontsize } from "../../helper";
import { useAuthStore } from "../../stores/authStore";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const Options = ({ id, options }) => {
	const { isAuthenticated, user } = useAuthStore();

	const chartDispatch = useChartDispatch();
	const { charts, customGlobalOptions } = useChartStore();

	const charttitleRef = useRef();

	const [chartTitle, setChartTitle] = useState("");
	const [fontSize, setFontSize] = useState(
		charts[id].customOptions.fontSize
			? charts[id].customOptions.fontSize
			: customGlobalOptions.fontSize
	);
	const [initialFontSize] = useState(
		charts[id].customOptions.fontSize
			? charts[id].customOptions.fontSize
			: customGlobalOptions.fontSize
	);
	const [showsaveConfigModal, setShowSaveConfigModal] = useState(false);

	const changeChartTitle = () => {
		setChartTitle(charttitleRef.current.value);
		let newChart = charts[id];
		newChart = {
			...newChart,
			options: {
				...newChart.options,
				title: {
					...newChart.options.title,
					text: charttitleRef.current.value
						? charttitleRef.current.value
						: options.title.text,
				},
			},
		};
		charts.splice(id, 1, newChart);
		chartDispatch({ type: "updateChart", payload: charts });
	};

	const handleChange = (e) => {
		setChartTitle(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			changeChartTitle();
			setChartTitle("");
		}
	};

	const handleRange = (e) => {
		setFontSize(e);
		const newChart = setChartFontsize(charts[id], e);
		charts.splice(id, 1, newChart);
		chartDispatch({ type: "updateChart", payload: charts });
	};

	const handleSave = async (e) => {
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
				alert(await response.json());
				console.log("nope");
				return null;
			} else {
				chartDispatch({
					type: "setCustomGlobalOptions",
					payload: { fontSize },
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	// const handleSubmit = () => {
	//     changeChartTitle();
	//     setChartTitle("");
	// };

	return (
		<div className="bg-success mb-2 py-2 px-2 rounded-bottom">
			<div className="fontsize-container d-flex flex-row flex-nowrap mb-2">
				<span className="text-light font-weight-bold">Fontsize </span>
				<Slider
					min={10}
					max={32}
					startPoint={fontSize}
					defaultValue={initialFontSize}
					className="fontsize-slider py-2 ml-2"
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
				{/* ist nötig, weil lineChart.current.chartInstance.update() ein Error wirft, wenn die neue fontSize === aktuelle fontSize ist*/}
				{fontSize !== initialFontSize && (
					<button
						onClick={
							isAuthenticated
								? handleSave
								: () =>
										setShowSaveConfigModal(
											(prevState) => !prevState
										)
						}
						className="ml-2 btn btn-light btn-sm "
					>
						Save as default fontsize
					</button>
				)}
			</div>
			<div className="">
				<form className="charttitle-container form-inline">
					<label
						className="charttitle-label text-light font-weight-bold"
						hmtlfor="new-charttitle"
					>
						Charttitle
					</label>
					<input
						className="charttitle-input form-control form-control-sm"
						id="new-charttitle"
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						placeholder={"Insert a new title"}
						ref={charttitleRef}
						type="text"
						value={chartTitle}
					/>
				</form>
			</div>
			{showsaveConfigModal && (
				<SaveConfigModal
					config={{ fontSize }}
					setShowSaveConfigModal={setShowSaveConfigModal}
					show={showsaveConfigModal}
				/>
			)}
		</div>
	);
};

Options.propTypes = {
	id: PropTypes.number.isRequired,
	lineChart: PropTypes.object.isRequired,
	options: PropTypes.object.isRequired,
};

export default React.memo(Options);
