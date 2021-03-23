import MapModal from 'react-bootstrap/Modal' 
import React from 'react'
import FetchModal from './FetchModal'
import Marker from './Marker'
import { useChartStore, useChartDispatch } from "../../stores/chartStore";


const MapComponent = () => {

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
    const { showMap, showModal } = useChartStore();

    const MapMarker = data ? data.map((data, i) => {
        return <Marker key={i} data={data} />;
    }) : null;

    return (
            <MapModal 
                show={showMap} 
                onHide={() => chartDispatch({type: "toggleMap", payload: {chartId: null, position: null, chartType: "all"}})}
                centered={true}
                dialogClassName="map-modal-dialog"
            >
                <MapModal.Header closeButton className="map-modal-header">
                </MapModal.Header>
                <MapModal.Body className="map-modal-body">
                    {MapMarker}
                </MapModal.Body>
                {showMap && showModal &&
                    <FetchModal />
                }
            </MapModal>
        )
    }

export default MapComponent;