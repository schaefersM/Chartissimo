import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { LoginComponent } from "../Auth";
import { useAuthStore } from "../../stores/authStore";
import { useChartDispatch } from "../../stores/chartStore";

const SaveConfigModal = ({ setShowSaveConfigModal, show, config }) => {
	const { user } = useAuthStore();

	const chartDispatch = useChartDispatch();

	const [showLoginComponent, setShowLoginComponent] = useState(false);

	useEffect(() => {
		const handleSubmit = async () => {
			const { user_id } = user;
			const options = {
				credentials: "include",
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					config,
				}),
			};
			const response = await fetch(
				`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_API_PORT}/api/user/${user_id}/config`,
				options
			);

			if (response.status === 404) {
				console.log(await response.json());
			} else {
				setShowSaveConfigModal((prevState) => !prevState);
				chartDispatch({ type: "rerenderCharts" });
			}
		};
		if (user) {
			try {
				handleSubmit();
			} catch (e) {
				console.log(e);
			}
		}
	}, [chartDispatch, config, setShowSaveConfigModal, user]);

	return (
		<Modal
			centered={true}
			onHide={() => setShowSaveConfigModal((prevState) => !prevState)}
			show={show}
		>
			<Modal.Header
				className="map-modal-header"
				closeButton
			></Modal.Header>
			<Modal.Body className="d-block text-center mx-auto">
				<div>
					<div className=" mb-2">
						<h4 className="font-weight-bold">
							Update your default configuration
						</h4>
					</div>
					<div>
						<div>
							<span>
								You have to be logged in before saving your
								configuration.
							</span>
						</div>
						{!showLoginComponent && (
							<div>
								<button
									className="btn btn-success mt-2"
									onClick={() =>
										setShowLoginComponent(
											(prevState) => !prevState
										)
									}
								>
									Login
								</button>
							</div>
						)}
						{showLoginComponent && <LoginComponent />}
						<div>
							<button
								className="btn btn-secondary mt-2"
								onClick={() => {
									setShowSaveConfigModal(false);
								}}
							>
								Continue without login and saving
							</button>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

SaveConfigModal.propTypes = {
	config: PropTypes.object.isRequired,
	setShowSaveConfigModal: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
};

export default SaveConfigModal;
