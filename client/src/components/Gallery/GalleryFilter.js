import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const GalleryFilter = ({
	locationValues,
	changeLocationValue,
	changeTypeValue,
	typeValues,
}) => {
	const locationOptions = [
		{ value: "kostbar", label: "Kostbar" },
		{ value: "architektur", label: "FB Architektur" },
		{ value: "wirtschaft", label: "FB Wirtschaft" },
		{ value: "informatik", label: "FB Informatik" },
	];

	const typeOptions = [
		{ value: "comparison", label: "Comparison" },
		{ value: "temperature", label: "Temperature" },
		{ value: "humidity", label: "Humidity" },
	];

	return (
		<>
			<div className="gallery-filter-item">
				<Select
					isClearable={true}
					isMulti={true}
					isSearchable={false}
					onChange={changeLocationValue}
					options={locationOptions}
					placeholder={"Location..."}
					value={locationValues}
				/>
			</div>
			<div className="gallery-filter-item">
				<Select
					isClearable={true}
					isMulti={true}
					isSearchable={false}
					onChange={changeTypeValue}
					options={typeOptions}
					placeholder={"Charttype..."}
					value={typeValues}
				/>
			</div>
		</>
	);
};

GalleryFilter.propTypes = {
	locationValues: PropTypes.array.isRequired,
	changeLocationValue: PropTypes.func.isRequired,
	changeTypeValue: PropTypes.func.isRequired,
	typeValues: PropTypes.array.isRequired,
};

export default GalleryFilter;
