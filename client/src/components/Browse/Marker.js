import PropTypes from "prop-types";
import React from "react";
import Pi from "../../png/Pi.png";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const Marker = ({ data: { id, host, name } }) => {
	const chartDispatch = useChartDispatch();
	const { showMapModal } = useChartStore();

	const styles = {
		position: "relative",
		display: showMapModal === true ? "block" : "none",
	};
	return (
		<input
			alt={host}
			className="marker"
			id={id}
			onClick={() =>
				chartDispatch({
					type: "toggleFetchModal",
					payload: {
						fetchLabelName: name,
						host,
						hostLocation: name,
					},
				})
			}
			src={Pi}
			style={styles}
			type="image"
		/>
	);
};

Marker.propTypes = {
	data: PropTypes.object.isRequired,
};

export default Marker;
