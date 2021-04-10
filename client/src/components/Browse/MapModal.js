import Modal from "react-bootstrap/Modal";
import React from "react";
import FetchModal from "./FetchModal";
import Marker from "./Marker";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const MapModal = () => {
	const data = [
		{
			host: "wirtschaft",
			name: "FB Wirtschaft",
			id: "markerWirtschaft",
		},
		{
			host: "kostbar",
			name: "Kostbar",
			id: "markerKostbar",
		},
		{
			host: "informatik",
			name: "FB Informatik",
			id: "markerInformatik",
		},
		{
			host: "architektur",
			name: "FB Architektur",
			id: "markerArchitektur",
		},
	];

	const chartDispatch = useChartDispatch();
	const { showFetchModal, showMapModal } = useChartStore();

	const MapMarker = data.map((data) => {
		return <Marker key={data.id} data={data} />;
	});

	return (
		<Modal
			centered={true}
			dialogClassName="map-modal-dialog"
			onHide={() =>
				chartDispatch({
					type: "toggleMapModal",
					payload: {
						chartId: null,
						chartType: "all",
						position: null,
					},
				})
			}
			show={showMapModal}
		>
			<Modal.Header closeButton className="map-modal-header">
				<Modal.Title>
					<span className="text-white">.</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="map-modal-body">{MapMarker}</Modal.Body>
			{showFetchModal && showMapModal && <FetchModal />}
		</Modal>
	);
};

export default MapModal;
