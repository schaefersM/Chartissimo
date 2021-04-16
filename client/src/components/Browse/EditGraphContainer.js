import { isMobile } from "react-device-detect";
import { PropTypes } from "prop-types";
import React from "react";
import DeleteGraph from "./DeleteGraph";
import UpdateGraphColor from "./UpdateGraphColor";
import UpdateGraphName from "./UpdateGraphName";

const EditGraphContainer = ({
	chartIndex,
	color,
	graphName,
	rowIndex,
	rowType,
}) => {
	return (
		<div
			className={`d-flex flex-row flex-nowrap justify-content-around mb-3 ${
				isMobile
					? "edit-graph-container-mobile"
					: "edit-graph-container"
			}`}
		>
			<div
				className={
					isMobile
						? "edit-graph-container-label-mobile"
						: "edit-graph-container-label"
				}
			>
				<span>{graphName}</span>
			</div>
			<div className="pl-4 edit-graph-container-update-name">
				<UpdateGraphName chartIndex={chartIndex} rowIndex={rowIndex} />
			</div>
			<div className="pl-4 edit-graph-container-update-color">
				<UpdateGraphColor
					chartIndex={chartIndex}
					color={color}
					rowIndex={rowIndex}
					rowType={rowType}
				/>
			</div>
			<div className="pl-4 edit-graph-container-delete-graph">
				<DeleteGraph chartIndex={chartIndex} rowIndex={rowIndex} />
			</div>
		</div>
	);
};

EditGraphContainer.propTypes = {
	chartIndex: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	graphName: PropTypes.string.isRequired,
	rowIndex: PropTypes.number.isRequired,
	rowType: PropTypes.string.isRequired,
};


export default EditGraphContainer;
