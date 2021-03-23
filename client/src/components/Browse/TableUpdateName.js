import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from 'react'
import { useChartDispatch, useChartStore } from "../../stores/chartStore";


const TableUpdateName = ({chartId, rowId}) => {

    const chartDispatch = useChartDispatch();
    const { charts } = useChartStore();

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

    return (
        <div>
            <input 
                className={errorText !== "Insert a new name" ? "error-placeholder mr-3" : "light-placeholder mr-3"}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={errorText} 
                type="text" 
                value={name} 
            />
            <FontAwesomeIcon
                icon={faSave}
                size="2x"
                onClick={submitChange}                    
                className="cursor-pointer align-bottom"
            />
        </div>
    )
}

TableUpdateName.propTypes = {
    chartId: PropTypes.number.isRequired,
    rowId: PropTypes.number.isRequired,
};

export default TableUpdateName;