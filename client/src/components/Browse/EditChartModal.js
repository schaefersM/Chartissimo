import { isMobile } from "react-device-detect";
import Modal from "react-bootstrap/Modal";
import { scroller } from "react-scroll";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import EditChartContainer from "./EditChartContainer";

const EditChartModal = ({ chartIndex, name, showEditChartModal, setShowEditChartModal }) => {
    useEffect(() => {
		scroller.scrollTo(`${name}`, {
			duration: 500,
			smooth: true,
			offset: isMobile ? -50 : -100,
		});

		// eslint-disable-next-line
	}, [])


	return (
		<Modal
			show={showEditChartModal}
			aria-labelledby="example-custom-modal-styling-title"
			onHide={setShowEditChartModal}
			centered={true}
			dialogClassName={
				isMobile
					? "edit-chart-modal-dialog-mobile"
					: "edit-chart-modal-dialog"
			}
		>
			<Modal.Header
				closeButton
				className={
					isMobile
						? "edit-chart-modal-header-mobile"
						: "edit-chart-modal-header"
				}
			>
				<Modal.Title>
					<span className="text-white">.</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="edit-chart-modal-body">
				<div className="d-flex flex-column flex-nowrap justify-content-around edit-chart-modal-container">
					<EditChartContainer
						chartIndex={chartIndex}
						setShowEditChartModal={setShowEditChartModal}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
};

EditChartModal.propTypes = {
	chartIndex: PropTypes.number.isRequired,
	name: PropTypes.number.isRequired,
	showEditChartModal: PropTypes.bool.isRequired,
	setShowEditChartModal: PropTypes.func.isRequired,
};


export default EditChartModal;
