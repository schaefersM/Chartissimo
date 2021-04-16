import { isMobile } from "react-device-detect";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types"
import React from "react";
import EditGraphContainer from './EditGraphContainer'

const EditGraphModal = ({
	chartIndex,
	datasets,
	setShowEditGraphModal,
	showEditGraphModal,
}) => {
	const Container = datasets[0]
		? datasets.map(({ backgroundColor, label, yAxisID }, i) => {
				return (
					<div key={label}>
						<EditGraphContainer
							color={backgroundColor}
							chartIndex={chartIndex}
							graphName={label}
							rowIndex={i}
							rowType={yAxisID}
						/>
						<hr className="edit-graph-container-hr" />
					</div>
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
			onHide={setShowEditGraphModal}
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
	chartIndex: PropTypes.number.isRequired,
	datasets: PropTypes.array.isRequired,
};

export default EditGraphModal;
