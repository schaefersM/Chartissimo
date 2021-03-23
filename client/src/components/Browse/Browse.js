import { defaults } from "react-chartjs-2";
import React, { useEffect } from "react";
import AddChartButton from "./AddChartButton"
import Charts from "./Charts"
import { useAuthStore } from "../../stores/authStore";
import { useChartStore, useChartDispatch } from "./../../stores/chartStore";


const Browse = () => {

    const { isAuthenticated, user, readyToRender } = useAuthStore();

    const chartDispatch = useChartDispatch();

    const { triggerRerenderAfterDefaultConfigChanged, customGlobalOptions } = useChartStore();

    useEffect(() => {
        chartDispatch({ type: "resetCharts" });
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchConfig = async () => {
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
                    `http://${process.env.REACT_APP_BACKEND_IP}:5000/api/user/${user_id}/config`,
                    options
                );
                if (response.status === 404) {
                    defaults.global.defaultFontSize = 16;
                    defaults.global.legend.labels.defaultFontSize = 16;
                    customGlobalOptions.fontSize = 16;
                } else {
                    const data = await response.json();
                    const { fontSize } = data;
                    customGlobalOptions.fontSize = fontSize
                    defaults.global.defaultFontSize = fontSize;
                    defaults.global.legend.labels.defaultFontSize = fontSize;
                }
            };
            fetchConfig();
        } else {
            defaults.global.defaultFontSize = 16;
            defaults.global.legend.labels.defaultFontSize = 16;
            customGlobalOptions.fontSize = 16;
        }
    }, [readyToRender, triggerRerenderAfterDefaultConfigChanged]);

    return (
            <div>
                <Charts/>
                <AddChartButton/>
            </div>
    );
};
export default Browse;
