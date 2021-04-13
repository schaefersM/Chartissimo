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
    id, 
    isSavedChart,
    toggleEditGraphModal,
    toggleEditChartModal, 
    toggleSaveChartModal, 
    showEditGraphModal,
    showEditChartModal,
}) => { 
  
    const icons = [
		{
			dispatcher: true,
			dispatchFunction: {
				type: "toggleMapModal",
				payload: { chartId: id, position: "addGraph", chartType },
			},
			icon: faPlusCircle,
			shown: false,
		},
		{
			cb: toggleEditGraphModal,
			dispatcher: false,
			icon: faEdit,
			shown: showEditGraphModal,
		},
		{
			cb: toggleEditChartModal,
			dispatcher: false,
			icon: faCog,
			shown: showEditChartModal,
		},
		{
			cb: toggleSaveChartModal,
			dispatcher: false,
			icon: faStar,
			shown: isSavedChart,
		},
	];

	const Icons = icons.map(
		({ cb, dispatcher, dispatchFunction, icon, shown }, i) => {
			return (
				<ChartControllerItem
					cb={cb}
					dispatcher={dispatcher}
					dispatchFunction={dispatchFunction}
					icon={icon}
					key={i}
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
	id: PropTypes.number.isRequired,
	isSavedChart: PropTypes.bool.isRequired,
	toggleEditGraphModal: PropTypes.func.isRequired,
	toggleEditChartModal: PropTypes.func.isRequired,
	toggleSaveChartModal: PropTypes.func.isRequired,
};

export default React.memo(ChartController);
