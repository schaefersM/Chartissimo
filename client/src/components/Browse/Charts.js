import React from 'react'
import ChartWrapper from "./ChartWrapper";
import { useChartStore } from "../../stores/chartStore";


const Charts = () => {
    
    const { charts } = useChartStore();
    
    const Charts = charts ? charts.map((config, i) => {
        return <ChartWrapper key={config.id} id={i} config={config} />;
    }) : null;

    return (
        <div>
            {Charts}
        </div>
    )
}

export default Charts;
