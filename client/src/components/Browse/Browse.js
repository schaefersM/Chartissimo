import { defaults } from "react-chartjs-2";
import React, { useEffect } from "react";
import AddChartButton from "./AddChartButton";
import Charts from "./Charts";
import { useAuthStore } from "../../stores/authStore";
import { useChartStore, useChartDispatch } from "./../../stores/chartStore";

const Browse = () => {
	const { isAuthenticated, user } = useAuthStore();

	const chartDispatch = useChartDispatch();

	const { defaultOptions } = useChartStore();

	useEffect(() => {
		chartDispatch({ type: "eraseCharts" });
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			const fetchDefaultOptions = async () => {
				const { user_id } = user;
				const options = {
					credentials: "include",
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				};
				try {
					const response = await fetch(
						`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_API_PORT}/api/user/${user_id}/config`,
						options
					);
					if (response.ok) {
						const { fontSize } = await response.json();
						defaultOptions.fontSize = fontSize;
						defaults.global.defaultFontSize = fontSize;
						defaults.global.legend.labels.defaultFontSize =
							fontSize;
					} else {
						defaultOptions.fontSize = 16;
						defaults.global.defaultFontSize = 16;
						defaults.global.legend.labels.defaultFontSize = 16;
					}
				} catch (e) {
					defaultOptions.fontSize = 16;
					defaults.global.defaultFontSize = 16;
					defaults.global.legend.labels.defaultFontSize = 16;
				}
			};
			fetchDefaultOptions();
		} else {
			defaultOptions.fontSize = 16;
			defaults.global.defaultFontSize = 16;
			defaults.global.legend.labels.defaultFontSize = 16;
		}
		// eslint-disable-next-line
	}, [isAuthenticated]);

	return (
		<div>
			<Charts />
			<AddChartButton />
		</div>
	);
};
export default Browse;
