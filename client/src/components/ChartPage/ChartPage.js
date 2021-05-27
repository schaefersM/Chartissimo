import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ChartFetcher from "./ChartFetcher";
import { useAuthStore } from "../../stores/authStore";
import { useChartDispatch } from "../../stores/chartStore";

const ChartPage = (props) => {

	const { chartId } = props.match.params;

	const { user } = useAuthStore();

	const chartDispatch = useChartDispatch();

	const history = useHistory();

	const [chartData, setChartData] = useState({});

	useEffect(() => {
		chartDispatch({ type: "eraseCharts" });
		const fetchChartInformation = async () => {
			const { user_id } = user;
			const options = {
				credentials: "include",
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			};
			const response = await fetch(
				`http://${process.env.REACT_APP_BACKEND_IP}:${process.env.REACT_APP_API_PORT}/api/user/${user_id}/charts/${chartId}`,
				options
			);
			if (!response.ok) {
				history.push("/404");
			} else {
				const data = await response.json();
				setChartData(data);
			}
		};
		fetchChartInformation();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<ChartFetcher chartData={chartData} />
		</div>
	);
};

ChartPage.propTypes = {
	props: PropTypes.object,
};

export default ChartPage;
