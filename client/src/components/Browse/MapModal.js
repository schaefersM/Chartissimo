import Modal from "react-bootstrap/Modal";
import React from "react";
import FetchModal from "./FetchModal";
import Marker from "./Marker";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const MapModal = () => {
	const data = [
		{
			hostname: "wirtschaft",
			displayname: "FB Wirtschaft",
			hostid: "markerWirtschaft",
		},
		{
			hostname: "kostbar",
			displayname: "Kostbar",
			hostid: "markerKostbar",
		},
		{
			hostname: "informatik",
			displayname: "FB Informatik",
			hostid: "markerInformatik",
		},
		{
			hostname: "architektur",
			displayname: "FB Architektur",
			hostid: "markerArchitektur",
		},
	];

	const chartDispatch = useChartDispatch();
	const { showFetchModal, showMapModal } = useChartStore();

	const MapMarker = data.map(({hostname, displayname, hostid}) => {
		return <Marker key={hostid} hostname={hostname} displayname={displayname} hostid={hostid} />;
	});

	return (
		<Modal
			centered={true}
			dialogClassName="map-modal-dialog"
			onHide={() =>
				chartDispatch({
					type: "toggleMapModal",
					payload: {
						chartIndex: null,
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
