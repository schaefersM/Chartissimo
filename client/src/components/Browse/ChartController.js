import {
	faPlusCircle,
	faEdit,
	faCog,
	faStar,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import React from "react";
import ChartControllerItem from "./ChartControllerItem";

const ChartController = ({
	chartType,
	chartIndex,
	isSavedChart,
	showEditChartModal,
	showEditGraphModal,
	toggleEditChartModal,
	toggleEditGraphModal,
	toggleSaveChartModal,
}) => {
	const icons = [
		{
			dispatcher: true,
			dispatchFunction: {
				type: "toggleMapModal",
				payload: { chartIndex: chartIndex, position: "addGraph", chartType },
			},
			icon: faPlusCircle,
			name: "Add",
			shown: false,
		},
		{
			cb: toggleEditGraphModal,
			dispatcher: false,
			icon: faEdit,
			name: "Edit",
			shown: showEditGraphModal,
		},
		{
			cb: toggleEditChartModal,
			dispatcher: false,
			icon: faCog,
			name:"Configure",
			shown: showEditChartModal,
		},
		{
			cb: toggleSaveChartModal,
			dispatcher: false,
			icon: faStar,
			name: "Save",
			shown: isSavedChart,
		},
	];

	const Icons = icons.map(
		({ cb, dispatcher, dispatchFunction, icon, name, shown }) => {
			return (
				<ChartControllerItem
					cb={cb}
					dispatcher={dispatcher}
					dispatchFunction={dispatchFunction}
					icon={icon}
					key={name}
					shown={shown}
				/>
			);
		}
	);

	return (
		<div className="d-flex flex-row flex-nowrap justify-content-around chart-controller">
			{Icons}
		</div>
	);
};

ChartController.propTypes = {
	chartType: PropTypes.string.isRequired,
	chartIndex: PropTypes.number.isRequired,
	isSavedChart: PropTypes.bool.isRequired,
	toggleEditGraphModal: PropTypes.func.isRequired,
	toggleEditChartModal: PropTypes.func.isRequired,
	toggleSaveChartModal: PropTypes.func.isRequired,
};

export default React.memo(ChartController);
