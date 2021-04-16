import { Element } from "react-scroll";
import PropTypes from "prop-types";
import React from "react";
import Chart from "./Chart";

const ChartWrapper = ({ config, chartIndex }) => {
	return (
		<>
			<Element
				className="element content-wrapper mt-2"
				name={`${config.id}`}
			>
				<Chart config={config} chartIndex={chartIndex} />
				<hr />
			</Element>
		</>
	);
};

ChartWrapper.propTypes = {
	config: PropTypes.object.isRequired,
	chartIndex: PropTypes.number.isRequired,
};

export default ChartWrapper;
