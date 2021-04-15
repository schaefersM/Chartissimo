import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { scroller } from "react-scroll";
import {
	checkFetchedBrowseData,
	checkTimeChange,
	getConfig,
} from "../../helper";
import { Comparison, Celsius, Humidity } from "../../png";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const FetchModal = () => {
	const chartDispatch = useChartDispatch();
	const {
		charts,
		chartId,
		chartType,
		customGlobalOptions,
		fetchInformation: { host, date },
		fetchModalLabel,
		position,
		showFetchModal,
	} = useChartStore();

	const [errorMessage, setErrorMessage] = useState("");
	const [fetchHour, setHour] = useState("25");

	const fetchData = async (type) => {
		try {
			const options = {
				method: "GET",
				headers: {
					Accept: "application/json",
				},
			};
			const response = await fetch(
				`http://${process.env.REACT_APP_BACKEND_IP}:5000/api/data/categories/${type}?date=${date}&location=${host}&hour=${fetchHour}`,
				options
			);
			if (!response.ok) {
				const { errorMessage } = await response.json();
				setErrorMessage(errorMessage);
				setHour("25");
			} else {
				const data = await response.json();
				return data;
			}
		} catch (e) {
			console.log(e);
		}
	};
	const toggleFetch = (e) => {
		if (date === "") {
			setErrorMessage("Date must contain a value");
		} else {
			chartDispatch({
				type: "fetchData",
				payload: { type: e.target.id, hour: fetchHour },
			});
			prepareFetch(e.target.id);
		}
	};

	/**
	 *
	 * @param {String} type - Kategorie des angefragten Graphs (comparison, temperature oder humidity)
	 *
	 * @function
	 * Prüft, ob
	 ** entweder:
	 *
	 *      ein Graph zu einem vorhandenen Diagramm hinzugefügt werden soll
	 *      Daraufhin prüft er, ob:
	 *      der Graph bereits gezeichnet wurde und
	 *      zwischen stündlichen und täglichen Daten gewechselt wird und somit das bisherige Diagramm zurückgesetzt wird.
	 *      **HINWEIS: "comparison"-Diagramm werden immer zurückgesetzt.**
	 *
	 *
	 ** oder:
	 *
	 *      ein neues Diagramm erstellt werden soll.
	 *
	 */

	const prepareFetch = async (type) => {
		try {
			let config;
			const checkString = `${type}-${host}-${date}-${fetchHour}`;
			if (position === "addGraph") {
				config = charts[chartId];
				if (config.graphs.includes(checkString)) {
					setErrorMessage("Graph was already drawn");
				} else {
					const check =
						type === "comparison"
							? { fetch: true, reset: true }
							: checkTimeChange(config.previousHour, fetchHour);
					if (!check.reset) {
						setHour("25");
					}
					const { fetch, reset } = check;
					if (fetch) {
						const data =
							type === "comparison"
								? await fetchData(type)
								: [await fetchData(type)];
						if (data) {
							const checkedData = reset
								? checkFetchedBrowseData(
										data,
										config,
										type,
										host,
										date,
										fetchHour,
										reset
								  )
								: checkFetchedBrowseData(
										data,
										config,
										type,
										host,
										date,
										fetchHour
								  );
							addGraph(reset, checkedData, config, type);
						}
					}
				}
			} else {
				const id = 100000 * Math.random();
				config = { ...getConfig(type), id };
				const data =
					type === "comparison"
						? await fetchData(type)
						: [await fetchData(type)];
				if (data) {
					const checkedData = checkFetchedBrowseData(
						data,
						config,
						type,
						host,
						date,
						fetchHour
					);
					addNewChart(checkedData, type, config);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	/**
	 * Wenn reset, dann wird das Diagramm zurückgesetzt, indem die Datensätze mit den neuen überprüften Datensätzen ersetzt werden.
	 *
	 * Wenn nicht reset, dann werden die neuen überprüften Datensätze dem Diagramm hinzugefügt
	 */

	const addGraph = (reset, checkedData, config, type) => {
		const { datasets, labels, colorId, options } = checkedData;
		const checkString = `${type}-${host}-${date}-${fetchHour}`;
		config.id = 100000 * Math.random();
		if (reset) {
			config = {
				...config,
				data: { labels, datasets },
				options,
				previousHour: fetchHour,
				hours: [fetchHour],
				hosts: [host],
				tableNames:
					datasets.length > 1
						? [datasets[0].label, datasets[1].label]
						: [datasets[0].label],
				customTableNames:
					datasets.length > 1
						? [datasets[0].label, datasets[1].label]
						: [datasets[0].label],
				graphs: [checkString],
				colorIds: [colorId],
			};
		} else {
			config = {
				...config,
				data: {
					labels,
					datasets: [...config.data.datasets, ...datasets],
				},
				options,
				previousHour: fetchHour,
				hours: [...config.hours, fetchHour],
				hosts: [...config.hosts, host],
				tableNames:
					datasets.length > 1
						? [
								...config.tableNames,
								datasets[0].label,
								datasets[1].label,
						  ]
						: [...config.tableNames, datasets[0].label],
				customTableNames:
					datasets.length > 1
						? [
								...config.customTableNames,
								datasets[0].label,
								datasets[1].label,
						  ]
						: [...config.customTableNames, datasets[0].label],

				graphs: [...config.graphs, checkString],
				colorIds: [...config.colorIds, ...colorId],
			};
		}
		charts.splice(chartId, 1, config);
		chartDispatch({ type: "addNewChart", payload: charts });
		scroller.scrollTo(`${config.id}`, {
			duration: 1500,
			delay: 200,
			smooth: true,
		});
	};

	/**
	 * Es wird ein neues Diagramm erstellt und mit den neuen überprüften Daten befüllt
	 * @param {Object} checkedData - Rückgabewert der Funktion checkFetchedBrowseData
	 * @param {String} type - Kategorie des angefragten Graphs (comparison, temperature oder humidity)
	 */

	const addNewChart = (checkedData, type, config) => {
		const { datasets, labels, colorId, options } = checkedData;
		const checkString = `${type}-${host}-${date}-${fetchHour}`;
		const newConfig = {
			...config,
			data: { labels, datasets },
			previousHour: fetchHour,
			// customOptions: customGlobalOptions,
			hours: [fetchHour],
			hosts: [host],
			options,
			tableNames:
				datasets.length > 1
					? [datasets[0].label, datasets[1].label]
					: [datasets[0].label],
			customTableNames:
				datasets.length > 1
					? [datasets[0].label, datasets[1].label]
					: [datasets[0].label],
			colorIds: [...colorId],
			graphs: [checkString],
		};
		charts.push(newConfig);
		chartDispatch({ type: "addNewChart", payload: charts });
		scroller.scrollTo(`${newConfig.id}`, {
			duration: 1500,
			delay: 200,
			smooth: true,
			offset: -100,
		});
	};

	const resetHourButton =
		fetchHour !== "25" ? (
			<FontAwesomeIcon
				icon={faTimesCircle}
				onClick={() => setHour("25")}
				className="cursor-pointer pl-1"
				color={"#7e7e7e"}
			/>
		) : null;

	const selectOptions = Array.from(new Array(23), (_, hour) =>
		hour < 10 ? `0${hour}:00` : `${hour}:00`
	).map((time, i) => {
		return (
			<option key={i} value={`${i}`}>
				{time}
			</option>
		);
	});

	return (
		<div>
			<Modal
				show={showFetchModal}
				aria-labelledby="example-custom-modal-styling-title"
				onHide={() =>
					chartDispatch({
						type: "toggleFetchModal",
						payload: { fetchLabelName: "", host: "" },
					})
				}
				centered={true}
				className="fetch-modal"
				dialogClassName="fetch-modal-dialog"
			>
				<Modal.Header closeButton className="fetch-modal-header">
					<Modal.Title className="fetch-modal-header-title">
						<span className="fetch-modal-header-title-label">
							{fetchModalLabel}
						</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="fetch-modal-body">
					{errorMessage && (
						<p className="text-danger font-weight-bold">
							{errorMessage}
						</p>
					)}
					<div className="fetch-modal-body-datepick-wrapper">
						<input
							className="fetch-modal-body-datepick"
							type="date"
							name="listDate"
							onChange={(e) =>
								chartDispatch({
									type: "changeDate",
									payload: e.target.value,
								})
							}
						/>
					</div>
					<div className="fetch-modal-body-timeselect-wrapper">
						<select
							className="fetch-modal-body-timeselect"
							onChange={(e) => setHour(e.target.value)}
							value={fetchHour}
						>
							<option value="25">daily</option>
							{selectOptions}
						</select>
						{resetHourButton}
					</div>
					<div className="fetch-modal-body-chooseGraphContainer">
						{chartType === "all" && (
							<div className="fetch-modal-body-chooseGraph">
								<input
									type="image"
									src={Comparison}
									alt="Comparison"
									id="comparison"
									onClick={toggleFetch}
								/>
								<input
									type="image"
									src={Celsius}
									alt="Celsius"
									id="temperature"
									onClick={toggleFetch}
								/>
								<input
									type="image"
									src={Humidity}
									alt="Humidity"
									id="humidity"
									onClick={toggleFetch}
								/>
							</div>
						)}
						{chartType === "comparison" && (
							<div className="fetch-modal-body-chooseGraph">
								<input
									type="image"
									src={Comparison}
									alt="Comparison"
									id="comparison"
									onClick={toggleFetch}
								/>
							</div>
						)}
						{chartType === "temperature" && (
							<div className="fetch-modal-body-chooseGraph">
								<input
									type="image"
									src={Celsius}
									alt="Celsius"
									id="temperature"
									onClick={toggleFetch}
								/>
							</div>
						)}
						{chartType === "humidity" && (
							<div className="fetch-modal-body-chooseGraph">
								<input
									type="image"
									src={Humidity}
									alt="Humidity"
									id="humidity"
									onClick={toggleFetch}
								/>
							</div>
						)}
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default FetchModal;
