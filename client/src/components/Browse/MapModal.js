import Modal from 'react-bootstrap/Modal' 
import React from 'react'
import FetchModal from './FetchModal'
import Marker from './Marker'
import { useChartStore, useChartDispatch } from "../../stores/chartStore";


const MapModal = () => {

    const data = 
    [
        {
            left: "9.3em",
            top: "18.2em",
            lng: 51.493472,
            lat: 7.419198,
            host: 'wirtschaft',
            name: 'FB Wirtschaft',
            id: 'markerWirtschaft'
        },
        {
            left: "23em",
            top: "1.5em",
            lng: 51.494455,
            lat: 7.420397,
            host: 'kostbar',
            name: 'Kostbar',
            id: 'markerKostbar'
        },
        {
            left: "19em",
            top: "12em",
            lng: 51.493721,
            lat: 7.420151,
            host: 'informatik',
            name: 'FB Informatik',
            id: 'markerInformatik'
        },
        {
            left: "33.8em",
            top: "3em",
            lng: 51.494074,
            lat: 7.421450,
            host: 'architektur',
            name: 'FB Architektur',
            id: 'markerArchitektur'
        }
    ]

    const chartDispatch = useChartDispatch();
    const { showMapModal, showFetchModal } = useChartStore();

    const MapMarker = data ? data.map((data, i) => {
        return <Marker key={i} data={data} />;
    }) : null;

    return (
        <Modal
            show={showMapModal}
            onHide={() =>
                chartDispatch({
                    type: "toggleMapModal",
                    payload: {
                        chartId: null,
                        position: null,
                        chartType: "all",
                    },
                })
            }
            centered={true}
            dialogClassName="map-modal-dialog"
        >
            <Modal.Header closeButton className="map-modal-header">
                <Modal.Title >
                    <span className="text-white">.</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="map-modal-body">{MapMarker}</Modal.Body>
            {showMapModal && showFetchModal && <FetchModal />}
        </Modal>
    );
    }

export default MapModal;