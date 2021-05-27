import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import ChartWrapper from "../Browse/ChartWrapper";
import {
	checkFetchedChartPageData,
	getConfig,
	getNewChartConfig,
	setChartFontsize,
} from "../../helper";
import { useChartStore, useChartDispatch } from "../../stores/chartStore";

const ChartFetcher = ({ chartData }) => {
	const chartDispatch = useChartDispatch();
	const { charts } = useChartStore();

	const initialRender = useRef(true);

	useEffect(() => {
		const fetchData = async (chartData) => {
			const {
				chartType: configType,
				customOptions: { fontSize },
				data: {
					colorIds,
					customGraphNames,
					hours,
					previousHour,
					defaultGraphNames,
				},
				id,
			} = chartData;

			const data = await Promise.all(
				defaultGraphNames.map(async (query, _) => {
					let [type, host, year, month, day, hour] = query.split("-");
					hour = hour ? hour.split(":")[0] : "25";
					const date = `${year}-${month}-${day}`;
					const realFetch = async () => {
						try {
							const options = {
								method: "GET",
								headers: {
									Accept: "application/json",
								},
							};
							const response = await fetch(
								`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_API_PORT}/api/data/categories/${type}?date=${date}&location=${host}&hour=${hour}`,
								options
							);
							if (response.status === 404) {
								console.log(await response.json());
							} else {
								const data = await response.json();
								return data;
							}
						} catch (e) {
							console.log(e);
						}
					};
					const fetchedData = await realFetch();
					return fetchedData;
				})
			);

			const config = { ...getConfig(configType), id };

			const checkedData = checkFetchedChartPageData(
				data,
				config,
				configType,
				previousHour,
				hours,
				defaultGraphNames,
				customGraphNames,
				colorIds
			);

			const newConfig = getNewChartConfig(checkedData, config, chartData);
			const newChart = setChartFontsize(newConfig, fontSize);
			charts.push(newChart);
			chartDispatch({ type: "addNewChart", payload: charts });
		};

		if (initialRender.current) {
			initialRender.current = false;
		} else {
			fetchData(chartData);
		}
		// eslint-disable-next-line
	}, [chartData]);

	const Charts = charts.map((config, i) => {
		return <ChartWrapper key={config.id} chartIndex={i} config={config} />;
	});

	return <div>{Charts}</div>;
};

ChartFetcher.propTypes = {
	chartData: PropTypes.object.isRequired,
};

export default ChartFetcher;
