import { Element } from "react-scroll";
import PropTypes from "prop-types";
import React from "react";
import Chart from "./Chart";

const ChartWrapper = ({ config, id }) => {
    
    return (
        <>
            <Element
                name={`${config.id}`}
                className="element content-wrapper mt-2"
            >
                <Chart id={id} config={config}/>
            </Element>
            <hr/>
        </>
    );
};

ChartWrapper.propTypes = {
    config: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
};

export default ChartWrapper;