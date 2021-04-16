import PropTypes from "prop-types";
import React from "react";
import Pi from "../../png/Pi.png";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const Marker = ({ displayname, hostid, hostname }) => {
	const chartDispatch = useChartDispatch();
	const { showMapModal } = useChartStore();

	return (
		<>
			{showMapModal && (
				<input
					alt={displayname}
					className={`position-relative d-block`}
					id={hostid}
					onClick={() =>
						chartDispatch({
							type: "toggleFetchModal",
							payload: {
								fetchModalTitle: displayname,
								host: hostname,
							},
						})
					}
					src={Pi}
					type="image"
				/>
			)}
		</>
	);
};

Marker.propTypes = {
	hostname: PropTypes.string.isRequired,
	hostid: PropTypes.string.isRequired,
	displayname: PropTypes.string.isRequired,
};

export default Marker;
