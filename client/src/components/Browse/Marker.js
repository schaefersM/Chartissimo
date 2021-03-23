import PropTypes from "prop-types";
import React from 'react'
import Pi from '../../png/Pi.png'
import { useChartStore, useChartDispatch } from "../../stores/chartStore";


const Marker = ({data : { name, id, host }}) => {
 
    const chartDispatch = useChartDispatch();
    const { showMap } = useChartStore();

    const styles = {
        position: "relative",
        display: showMap === true ? 'block' : 'none'
    }
    return (
        <input 
            className="marker" 
            id={id} 
            onClick={() => chartDispatch({
                type: 'toggleModal', payload: { 
                    labelName: name, 
                    host, 
                    hostLocation: name 
                }
            })}
            type="image" 
            src={Pi} 
            alt="PI" 
            style={styles}
        />
        
    )
}

Marker.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Marker;