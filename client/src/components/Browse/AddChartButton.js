import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
import MapModal from "./MapModal";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";


const AddChartButton = () => {

    const chartDispatch = useChartDispatch();
    
    const { charts, showMapModal } = useChartStore();
    
    return (
        <div>
            {
                showMapModal && <MapModal />
            }
            <div style={{ textAlign: "center" }}>
                <div>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        size="4x"
                        onClick={() =>
                            chartDispatch({
                                type: "toggleMapModal",
                                payload: {
                                    chartId: charts.length,
                                    position: "",
                                    chartType: "all",
                                },
                            })
                        }
                        className="cursor-pointer"
                    />
                </div>
                <div>
                    <span>Click to add a chart</span>
                </div>
            </div>
        </div>
    );
}

export default AddChartButton
