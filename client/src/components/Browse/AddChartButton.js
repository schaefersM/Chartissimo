import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MapModal from "./MapModal";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const AddChartButton = () => {
	const chartDispatch = useChartDispatch();

	const { charts, showMapModal } = useChartStore();

	return (
		<div>
			{showMapModal && <MapModal />}
			<div className="d-flex flex-column">
				<FontAwesomeIcon
					className="cursor-pointer mx-auto"
					icon={faPlusCircle}
					onClick={() =>
						chartDispatch({
							type: "toggleMapModal",
							payload: {
								chartId: charts.length,
								chartType: "all",
								position: "",
							},
						})
					}
					size="4x"
				/>
				<span className="mx-auto">Click to add a chart</span>
			</div>
		</div>
	);
};

export default AddChartButton;
