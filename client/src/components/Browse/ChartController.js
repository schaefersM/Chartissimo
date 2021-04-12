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
	toggleOptions,
	toggleSaveChart,
	showOptions,
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
			dispatcher: true,
			dispatchFunction: {
				type: "toggleEditGraphModal",
			},
			icon: faEdit,
			shown: false,
		},
		{
			cb: toggleOptions,
			dispatcher: false,
			icon: faCog,
			shown: showOptions,
		},
		{
			cb: toggleSaveChart,
			dispatcher: false,
			icon: faStar,
			shown: isSavedChart,
		},
	];

	let Icons = icons.map(
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
	showOptions: PropTypes.bool.isRequired,
	toggleOptions: PropTypes.func.isRequired,
	toggleSaveChart: PropTypes.func.isRequired,
};

export default React.memo(ChartController);
