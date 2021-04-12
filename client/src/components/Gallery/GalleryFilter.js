import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const GalleryFilter = ({
	locationValues,
	setLocationValues,
	setTypeValues,
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
					onChange={setLocationValues}
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
					onChange={setTypeValues}
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
	setLocationValues: PropTypes.func.isRequired,
	setTypeValues: PropTypes.func.isRequired,
	typeValues: PropTypes.array.isRequired,
};

export default GalleryFilter;
