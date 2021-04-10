import { isMobile } from "react-device-detect";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import React from "react";
import EditGraphContainer from "./EditGraphContainer";
import { useChartDispatch, useChartStore } from "../../stores/chartStore";

const EditGraphModal = ({ chartId, datasets }) => {
	const { showEditGraphModal } = useChartStore();
	const chartDispatch = useChartDispatch();

	const Container = datasets[0]
		? datasets.map(({ backgroundColor, label, yAxisID }, i) => {
				return (
					<>
						<EditGraphContainer
							backgroundColor={backgroundColor}
							chartId={chartId}
							key={label}
							label={label}
							rowId={i}
							rowType={yAxisID}
						/>
						<hr className="edit-graph-container-hr" />
					</>
				);
		  })
		: null;

	return (
		<Modal
			aria-labelledby="example-custom-modal-styling-title"
			centered={true}
			dialogClassName={
				isMobile
					? "edit-graph-modal-dialog-mobile"
					: "edit-graph-modal-dialog"
			}
			onHide={() =>
				chartDispatch({
					type: "toggleEditGraphModal",
				})
			}
			show={showEditGraphModal}
		>
			<Modal.Header
				closeButton
				className={
					isMobile
						? "edit-graph-modal-header-mobile"
						: "edit-graph-modal-header"
				}
			>
				<Modal.Title>
					<span className="text-white">.</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="edit-graph-modal-body">
				<div className="d-flex flex-column flex-nowrap justify-content-around edit-graph-modal-container">
					{Container}
				</div>
			</Modal.Body>
		</Modal>
	);
};

EditGraphModal.propTypes = {
	chartId: PropTypes.number.isRequired,
	datasets: PropTypes.array.isRequired,
};

export default EditGraphModal;
