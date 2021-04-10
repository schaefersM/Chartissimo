import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { useChartDispatch } from "../../stores/chartStore";

const ChartControllerItem = ({
	cb,
	dispatcher,
	dispatchFunction,
	icon,
	shown,
}) => {
	const chartDispatch = useChartDispatch();

	return (
		<div
			className={
				shown
					? "p-2 my-2 bg-secondary rounded"
					: "p-2 my-2 bg-light rounded"
			}
		>
			<FontAwesomeIcon
				className="cursor-pointer"
				color={shown ? "white" : "#212529"}
				icon={icon}
				onClick={
					dispatcher
						? () =>
								chartDispatch({
									type: dispatchFunction.type,
									payload: { ...dispatchFunction.payload },
								})
						: () => cb()
				}
				size="2x"
			/>
		</div>
	);
};

ChartControllerItem.propTypes = {
	cb: PropTypes.func,
	dispatcher: PropTypes.bool,
	dispatchFunction: PropTypes.object,
	icon: PropTypes.object.isRequired,
	shown: PropTypes.bool.isRequired,
};

export default ChartControllerItem;
