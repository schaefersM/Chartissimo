import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { LoginComponent } from "../Auth";
import { useAuthStore } from "../../stores/authStore";
import { useChartDispatch, useChartStore } from "../../stores/chartStore";

const SaveChartModal = ({
	chartRef,
	data: {
		colorIds,
		customOptions,
		customGraphNames,
		hours,
		hosts,
		graphs,
		previousHour,
		defaultGraphNames,
	},
	chartIndex,
	isSavedChart,
	name,
	setIsSavedChart,
	showSaveChartModal,
	toggleSaveChartModal,
	type,
}) => {
	const { isAuthenticated, user } = useAuthStore();

	const chartDispatch = useChartDispatch();
	const { charts, defaultOptions } = useChartStore();

	const nameRef = useRef();

	const [chartName, setChartName] = useState("");
	const [errorText, setErrorText] = useState("");
	const [savingChartName] = useState(charts[chartIndex].savingChartName);
	const [showLoginComponent, setShowLoginComponent] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			nameRef.current.focus();
		}
	}, [isAuthenticated]);

	const handleChange = (e) => {
		setErrorText("");
		setChartName(e.target.value);
	};

	const handleDismiss = async () => {
		try {
			const { user_id } = user;
			const options = {
				credentials: "include",
				method: "DELETE",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: savingChartName,
				}),
			};

			const response = await fetch(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/api/user/${user_id}/charts/${name}`,
				options
			);

			if (!response.ok) {
				const { errorMessage } = await response.json();
				setErrorText(errorMessage);
				setChartName("");
				return null;
			} else {
				charts[chartIndex].savingChartName = "";
				charts[chartIndex].isSaved = false;
				chartDispatch({ type: "updateChart", payload: charts });
				setChartName("");
				setIsSavedChart(false);
				toggleSaveChartModal();
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			if (!isSavedChart) {
				e.preventDefault();
				handleSubmit();
			} else {
				e.preventDefault();
				handleUpdate();
			}
		}
	};

	const handleSubmit = async () => {
		if (chartName !== "") {
			try {
				hosts = [...new Set(hosts)];
				const { user_id } = user;
				const options = {
					credentials: "include",
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						user_id,
						data: {
							defaultGraphNames,
							customGraphNames,
							graphs,
							previousHour,
							hours,
							colorIds,
						},
						id: name,
						name: chartName,
						chartType: type,
						hosts,
						customOptions: customOptions.fontSize
							? customOptions
							: defaultOptions,
						image,
					}),
				};

				const response = await fetch(
					`http://${process.env.REACT_APP_BACKEND_IP}:5000/api/user/${user_id}/charts`,
					options
				);

				if (!response.ok) {
					const { errorMessage } = await response.json();
					setErrorText(errorMessage);
					setChartName("");
					return null;
				} else {
					charts[chartIndex].savingChartName = chartName
						? chartName
						: savingChartName;
					charts[chartIndex].isSaved = true;
					chartDispatch({ type: "updateChart", payload: charts });
					setIsSavedChart(true);
					toggleSaveChartModal();
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			setErrorText("Type in a name");
		}
	};

	const handleUpdate = async () => {
		if (chartName !== "" || savingChartName) {
			try {
				const { user_id } = user;
				const options = {
					credentials: "include",
					method: "PUT",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name: chartName ? chartName : savingChartName,
						id: name,
						defaultGraphNames,
						customGraphNames,
						colorIds,
						customOptions: customOptions.fontSize
							? customOptions
							: defaultOptions,
						image,
					}),
				};
				const response = await fetch(
					`http://${process.env.REACT_APP_BACKEND_IP}:5000/api/user/${user_id}/charts/${name}`,
					options
				);

				if (!response.ok) {
					const { errorMessage } = await response.json();
					setErrorText(errorMessage);
					setChartName("");
					return null;
				} else {
					charts[chartIndex].savingChartName = chartName
						? chartName
						: savingChartName;
					charts[chartIndex].isSaved = true;
					chartDispatch({ type: "updateChart", payload: charts });
					setChartName("");
					setIsSavedChart(true);
					toggleSaveChartModal();
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			setErrorText("Type in a name");
		}
	};

	const image = chartRef.current.chartInstance.canvas.toDataURL(
		"image/png",
		0.5
	);

	return (
		<Modal
			centered={true}
			contentClassName={isAuthenticated ? "savechart-modal-content" : ""}
			dialogClassName={
				showLoginComponent
					? "savechart-modal-login-dialog"
					: "savechart-modal-dialog"
			}
			onHide={toggleSaveChartModal}
			show={showSaveChartModal}
		>
			<Modal.Header
				className="savechart-modal-header"
				closeButton
			></Modal.Header>
			<Modal.Body className="pt-0 mx-auto d-block text-center">
				<div className="mb-2 ">
					<h4 className="font-weight-bold">
						{isSavedChart
							? "Update your saved chart"
							: "Save your chart"}
					</h4>
				</div>
				{isAuthenticated ? (
					<div>
						<div className="mb-2">
							{errorText && (
								<span className="text-danger">{errorText}</span>
							)}
						</div>
						<div>
							<div>
								<input
									className="mr-3 savechart-modal-input mx-auto"
									onChange={handleChange}
									onKeyDown={handleKeyDown}
									placeholder={
										isSavedChart
											? "Insert a new name"
											: "Insert a name"
									}
									ref={nameRef}
									type="text"
									value={chartName}
								/>
							</div>
							<button
								className="btn btn-success mt-2"
								onClick={
									isSavedChart ? handleUpdate : handleSubmit
								}
							>
								{isSavedChart ? "Update Chart" : "Save Chart"}
							</button>
						</div>
						<div>
							{isSavedChart && (
								<button
									className="btn btn-danger mt-2"
									onClick={handleDismiss}
								>
									Dismiss Chart
								</button>
							)}
						</div>
					</div>
				) : (
					<div>
						<div>
							<span className="savechart-modal-login-text text-center mx-auto d-block mb-2">
								You have to be logged in before saving your
								chart
							</span>
						</div>
						{!showLoginComponent && (
							<div>
								<button
									className="btn btn-success mt-2"
									onClick={() =>
										setShowLoginComponent(
											(prevState) => !prevState
										)
									}
								>
									Login
								</button>
							</div>
						)}
						{showLoginComponent && <LoginComponent />}
						<div>
							<button
								className="btn btn-secondary  mt-2"
								onClick={() => {
									toggleSaveChartModal();
								}}
							>
								Continue without login and saving
							</button>
						</div>
					</div>
				)}
			</Modal.Body>
		</Modal>
	);
};

SaveChartModal.propTypes = {
	data: PropTypes.object.isRequired,
	chartIndex: PropTypes.number.isRequired,
	isSavedChart: PropTypes.bool.isRequired,
	name: PropTypes.number.isRequired,
	setIsSavedChart: PropTypes.func.isRequired,
	showSaveChartModal: PropTypes.bool.isRequired,
	toggleSaveChartModal: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
};

export default SaveChartModal;
