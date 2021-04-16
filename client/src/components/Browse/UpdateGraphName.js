// import { faSave } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { useChartDispatch, useChartStore } from "../../stores/chartStore";

const UpdateGraphName = ({ chartIndex, rowIndex }) => {
	const chartDispatch = useChartDispatch();
	const { charts } = useChartStore();

	const nameRef = useRef(true);

	const [errorText, setErrorText] = useState("Insert a new name");
	const [name, setName] = useState("");

	const changeGraphName = () => {
		let newChart = { ...charts[chartIndex] };
		const {
			customGraphNames,
			data,
			data: { datasets },
		} = newChart;
		if (customGraphNames.includes(name)) {
			setErrorText("Name already taken");
		} else {
			customGraphNames.splice(rowIndex, 1, name);
			datasets[rowIndex].label = name;
			newChart = {
				...newChart,
				customGraphNames,
				data: {
					...data,
					datasets,
				},
			};
			setErrorText("Insert a new name");
			charts.splice(chartIndex, 1, newChart);
			chartDispatch({ type: "updateChart", payload: charts });
		}
	};

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			submitChange();
		}
	};

	const submitChange = () => {
		if (name !== "") {
			changeGraphName();
			setName("");
		} else {
			setErrorText("Type in a new name!");
		}
	};

	// Mobile only function
	// Prevent weird behaviour when the mobile url bar toggles.
	const focusing = () => {
		setTimeout(() => {
			nameRef.current.blur();
			nameRef.current.focus();
		}, 0);
	};

	return (
		<div>
			<input
				className={
					errorText !== "Insert a new name"
						? "error-placeholder align-top"
						: "light-placeholder align-top"
				}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				placeholder={errorText}
				type="text"
				value={name}
				ref={nameRef}
				onClick={isMobile ? focusing : null}
			/>
			{/* {!isMobile && <FontAwesomeIcon
                icon={faSave}
                size="2x"
                onClick={submitChange}                    
                className="cursor-pointer"
            />} */}
		</div>
	);
};

UpdateGraphName.propTypes = {
	chartIndex: PropTypes.number.isRequired,
	rowIndex: PropTypes.number.isRequired,
};

export default UpdateGraphName;
