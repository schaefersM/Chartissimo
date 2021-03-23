import {
    checkDayData,
    checkHourData,
    labelGenerator
} from ".";


export default function checkFetchedDataGallery (
    data,
    config,
    type,
    fetchHour,
    hours,
    tableNames,
    customTableNames,
    colorIds,
    reset = false
) {
    let validData = [];
    let labels;

    //testing!
    if (data[0][0] && typeof data[0][0].hour === "number") {
        validData = data.map((item) => checkDayData(item));
        //testing!
        labels = labelGenerator("hour", fetchHour, reset);
        // labels = Array.from(new Array(24), (_, hour) =>
        //     hour < 10 ? `0${hour}:00` : `${hour}:00`
        // );
    } else if (data[0][0] && typeof data[0][0].minute === "number") {
        validData = data.map((item) => checkHourData(item));
        //testing!
        labels = reset
            ? labelGenerator("minute", fetchHour, reset)
            : labelGenerator("minute", fetchHour, reset, config.hours);
        // labels = reset
        //     ? checkDuplicateHourData(fetchHour, [])
        //     : checkDuplicateHourData(fetchHour, config.hours);
    } else {
        console.log(data)
        console.log("invalid Data");
    }

    // if (type === "comparison") {
    //     if (typeof data[0][0].hour === "number") {
    //         console.log(1)
    //         validData = data.map((item) => checkDayData(item));
    //         labels = Array.from(new Array(24), (_, hour) =>
    //             hour < 10 ? `0${hour}:00` : `${hour}:00`
    //         );
    //     } else {
    //         console.log(2)
    //         validData = data.map((item) => checkHourData(item));
    //         labels = Array.from(new Array(60), (_, minute) =>
    //             minute < 10
    //                 ? `${hour}:0${minute}`
    //                 : `${hour}:${minute}`
    //         );
    //     }
    // } else {
    //     if (typeof data[0][0].hour === "number") {
    //         console.log(3)
    //         validData = data.map((item) => checkDayData(item));
    //         labels = Array.from(new Array(24), (_, hour) =>
    //             hour < 10 ? `0${hour}:00` : `${hour}:00`
    //         );
    //     } else if (typeof data[0][0].minute === "number") {
    //         console.log(4)
    //         validData = data.map((item) => checkHourData(item));
    //         labels = checkDuplicateHourData(fetchHour, hours);
    //     } else if (typeof data[0].hour === "number") {
    //         console.log(5)
    //         validData = [data].map((item) => checkDayData(item));
    //         labels = Array.from(new Array(24), (_, hour) =>
    //             hour < 10 ? `0${hour}:00` : `${hour}:00`
    //         );
    //     } else {
    //         console.log(6);
    //         validData = [data].map((item) => checkHourData(item));
    //         labels = checkDuplicateHourData(fetchHour, hours);
    //     }
    // }

    //TODO Datasetslabel in einer Funktion für Browser and ChartPage Komponent

    const newDatasets = validData.map((data, index) => {
        const type = tableNames[index].split("-")[0];
        return {
            label: customTableNames[index],
            yAxisID: type,
            fill: false,
            pointRadius: 3,
            backgroundColor: colorIds[index],
            borderColor: colorIds[index],
            data,
        };
    });
    let newOptions = { ...config.options };
    if (type === "comparison") {
        newOptions = {
            ...newOptions,
            scales: {
                xAxes: [...newOptions.scales.xAxes],
                yAxes: [
                    {
                        ...newOptions.scales.yAxes[0],
                        scaleLabel: {
                            ...newOptions.scales.yAxes[0].scaleLabel,
                            fontColor: colorIds[0],
                        },
                        display:
                            tableNames[0].split("-")[0] === "temperature"
                                ? true
                                : false,
                    },
                    {
                        ...newOptions.scales.yAxes[1],
                        scaleLabel: {
                            ...newOptions.scales.yAxes[1].scaleLabel,
                            fontColor:
                                tableNames[0].split("-")[0] === "humidity"
                                    ? colorIds[0]
                                    : colorIds[1],
                        },
                        display:
                            tableNames[0].split("-")[0] === "humidity" ||
                            tableNames[1]
                                ? true
                                : false,
                    },
                ],
            },
        };
    }

    return {
        labels,
        datasets: newDatasets,
        options: newOptions,
    };
};