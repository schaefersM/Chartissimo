import { Line, defaults } from "react-chartjs-2";
import PropTypes from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import ChartController from "./ChartController";
import EditGraphModal from "./EditGraphModal"
import Options from "./Options";
import SaveChartModal from "./SaveChartModal";
import { useChartStore } from "../../stores/chartStore";
import { useAuthStore } from "../../stores/authStore";

const Chart = ({ 
    config: { 
        colorIds, 
        customTableNames, 
        data, 
        graphs, 
        hosts, 
        hours, 
        id: name, 
        isSaved, 
        options, 
        options: { 
            customOptions 
        }, 
        previousHour,
        tableNames, 
        type, 
    }, 
    id 
}) => {
        
    const { isAuthenticated } = useAuthStore();
    const { triggerRerenderAfterDefaultConfigChanged, customGlobalOptions, showEditGraphModal } = useChartStore();

    const initialRender = useRef(true);
    const lineChart = useRef();

    const [isSavedChart, setIsSavedChart] = useState(isSaved ? true : false);
    const [showOptions, setShowOptions] = useState(false);
    const [showSaveChartModal, setShowSaveChartModal] = useState(false);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            if (isAuthenticated && customGlobalOptions.fontSize) {
                const setConfig = () => {
                    defaults.global.defaultFontSize =
                        customGlobalOptions.fontSize;
                    defaults.global.legend.labels.defaultFontSize =
                        customGlobalOptions.fontSize;
                    lineChart.current.chartInstance.update();
                };
                setConfig();
            } else {
                defaults.global.defaultFontSize = customGlobalOptions.fontSize;
                defaults.global.legend.labels.defaultFontSize =
                    customGlobalOptions.fontSize;
            }
        }
        // eslint-disable-next-line
    }, [triggerRerenderAfterDefaultConfigChanged]);


    useEffect(() => {
        if (!isSaved) {
            setIsSavedChart(false);
        }
        // eslint-disable-next-line
    }, [data]);
    
    const toggleOptions = () => {
        setShowOptions((prevState) => !prevState);
    };
    
    const toggleSaveChart = () => {
        setShowSaveChartModal((prevState) => !prevState);
    };


    return (
        <div>
            <div id={id}>
                <Line
                    name={name}
                    data={data}
                    options={options}
                    ref={lineChart}
                />
                <ChartController
                    toggleOptions={toggleOptions}
                    toggleSaveChart={toggleSaveChart}
                    showOptions={showOptions}
                    isSavedChart={isSavedChart}
                    id={id}
                    chartType={type}
                />
                {showEditGraphModal && 
                    <EditGraphModal 
                        datasets={data.datasets}
                        chartId={id}                    
                    />}
                {showOptions && (
                    <Options options={options} id={id} lineChart={lineChart} />
                )}
                {showSaveChartModal && (
                    <SaveChartModal
                        toggleSaveChart={toggleSaveChart}
                        show={showSaveChartModal}
                        data={{
                            graphs,
                            tableNames,
                            customTableNames,
                            hosts,
                            customOptions,
                            colorIds,
                            hours,
                            previousHour,
                        }}
                        name={name}
                        setIsSavedChart={setIsSavedChart}
                        isSavedChart={isSavedChart}
                        id={id}
                        type={type}
                        chartRef={lineChart}
                    />
                )}
            </div>
        </div>
    );
};

Chart.propTypes = {
    config: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
};

export default Chart;
