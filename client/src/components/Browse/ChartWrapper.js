import { Element } from "react-scroll";
import PropTypes from "prop-types";
import React from "react";
import Chart from "./Chart";

const ChartWrapper = ({ config, id }) => {
	return (
		<>
			<Element
				className="element content-wrapper mt-2"
				name={`${config.id}`}
			>
				<Chart config={config} id={id} />
			</Element>
			<hr />
		</>
	);
};

ChartWrapper.propTypes = {
	config: PropTypes.object.isRequired,
	id: PropTypes.number.isRequired,
};

export default ChartWrapper;
