import React from "react";
import ChartWrapper from "./ChartWrapper";
import { useChartStore } from "../../stores/chartStore";

const Charts = () => {
	const { charts } = useChartStore();

	const Charts = charts
		? charts.map((config, i) => {
				return <ChartWrapper config={config} id={i} key={config.id} />;
		  })
		: null;

	return <div>{Charts}</div>;
};

export default Charts;
