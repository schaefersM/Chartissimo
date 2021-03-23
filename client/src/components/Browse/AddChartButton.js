import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
import MapComponent from "./MapComponent";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";


const AddChartButton = () => {

    const chartDispatch = useChartDispatch();
    
    const { charts, showMap } = useChartStore();
    
    return (
        <div>
            {
                showMap && <MapComponent />
            }
            <div style={{ textAlign: "center" }}>
                <div>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        size="4x"
                        onClick={() =>
                            chartDispatch({
                                type: "toggleMap",
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
