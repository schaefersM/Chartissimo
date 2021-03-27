import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";
import React, { useState, useRef } from 'react'
import { useChartDispatch, useChartStore } from "../../stores/chartStore";


const GraphName = ({chartId, rowId}) => {

    const chartDispatch = useChartDispatch();
    const { charts } = useChartStore();

    const nameRef = useRef(true);

    const [errorText, setErrorText] = useState("Insert a new name");
    const [name, setName] = useState('');

    const changeGraphName = () => {
        let newChart = { ...charts[chartId] };
        const {
            customTableNames,
            data,
            data: { datasets },
        } = newChart;
        if (customTableNames.includes(name)) {
            setErrorText("Name already taken");
        } else {
            customTableNames.splice(rowId, 1, name);
            datasets[rowId].label = name;
            newChart = {
                ...newChart,
                customTableNames,
                data: {
                    ...data,
                    datasets,
                },
            };
            setErrorText("Insert a new name");
            charts.splice(chartId, 1, newChart);
            chartDispatch({ type: "updateChart", payload: charts });
        }
    };

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
            submitChange();
		}
    };
    
    const submitChange = () => {
        if(name !== ''){
            changeGraphName()
            setName('');
        }
        else{
            setErrorText("Type in a new name!")
        }
    };

    // Mobile only function
    // Prevent weird behaviour when the mobile url bar toggles.
    const focusing = () => {
        setTimeout(() => {
            nameRef.current.blur();
            nameRef.current.focus();
        }, 0);
    }

    return (
        <div>
            <input 
                className={errorText !== "Insert a new name" ? "error-placeholder mr-3 align-top" : "light-placeholder mr-3 align-top"}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={errorText} 
                type="text" 
                value={name}
                ref={nameRef}
                onClick={isMobile ? focusing : null}
            />
            <FontAwesomeIcon
                icon={faSave}
                size="2x"
                onClick={submitChange}                    
                className="cursor-pointer"
            />
        </div>
    )
}

GraphName.propTypes = {
    chartId: PropTypes.number.isRequired,
    rowId: PropTypes.number.isRequired,
};

export default GraphName;