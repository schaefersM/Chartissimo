import { 
    checkDayData, 
    checkHourData, 
    labelGenerator, 
    randomColor 
} from './'


/**
    * 
    * Prüft, ob die Datensätze unvollständig sind.
    * Generiert ggf. neue X- und Y-Achsen.
    * Generiert Optionen für den Datensatz, die u.a. den Namen und ggf. die generierte Graphenfarbe enthält
    * @returns labels: die neuen Labels (x-Achse)
    * @returns datasets: die überprüften Datensätze
    * @returns options: die neuen Optionen
    * @returns colorId: die generierte Graphenfarbe
    */

export default function checkFetchedBrowseData(
    data,
    config,
    type,
    host,
    date,
    fetchHour,
    reset = false
) {
    
    let hour = fetchHour < 10 ? `0${fetchHour}` : `${fetchHour}`;
    let validData;
    let labels;
    //Testing!
    //If you want to delete the following if statement you have to delete the line in FetchModal:
    // const data = type === "comparison" ? await fetchData(type) : [await fetchData(type)]
    // and uncomment const data = await fetchData(type)
    //only "comparison" datasets are two dimensional
    if (data[0][0] && typeof data[0][0].hour === "number") {
        validData = data.map((item) => checkDayData(item));
        //testing
        labels = labelGenerator("hour", fetchHour, reset)
        // labels = Array.from(new Array(24), (_, hour) =>
        //     hour < 10 ? `0${hour}:00` : `${hour}:00`
        // );
    } else if (data[0][0] && typeof data[0][0].minute === "number") {
        validData = data.map((item) => checkHourData(item));
        //testing
        labels = reset
            ? labelGenerator("minute", fetchHour, reset)
            : labelGenerator("minute", fetchHour, reset, config.hours)
        // labels = reset
        //     ? checkDuplicateHourData(fetchHour, [])
        //     : checkDuplicateHourData(fetchHour, config.hours);
    } else {
        console.log("invalid Data");
    }

    // if (type === "comparison") {
    //     if (typeof data[0][0].hour === "number") {
    //         validData = data.map((item) => checkDayData(item));
    //         labels = Array.from(new Array(24), (_, hour) =>
    //             hour < 10 ? `0${hour}:00` : `${hour}:00`
    //         );
    //     } else {
    //         validData = data.map((item) => checkHourData(item));
    //         labels = Array.from(new Array(60), (_, minute) =>
    //             minute < 10 ? `${hour}:0${minute}` : `${hour}:${minute}`
    //         );
    //     }
    // } else if (typeof data[0].hour === "number") {
    //     validData = [data].map((item) => checkDayData(item));
    //     labels = Array.from(new Array(24), (_, hour) =>
    //         hour < 10 ? `0${hour}:00` : `${hour}:00`
    //     );
    // } else {
    //     validData = [data].map((item) => checkHourData(item));
    //     labels = reset
    //         ? checkDuplicateHourData(fetchHour, [])
    //         : checkDuplicateHourData(fetchHour, config.hours);
    // }

    //TODO Datasetslabel in einer Funktion für Browser and ChartPage Komponent
    const datasetLabel =
        hour !== "25" ? `${host}-${date}-${hour}:00` : `${host}-${date}`;
    const datasetTemp = {
        label: `temperature-${datasetLabel}`,
        yAxisID: "temperature",
    };
    const datasetHum = {
        label: `humidity-${datasetLabel}`,
        yAxisID: "humidity",
    };
    const datasetOptions = {
        fill: false,
        pointRadius: 3, //definiert die Größe der Punkte
    };
    let newDatasetTemp;
    let newDatasetHum;
    let newOptions = { ...config.options };
    switch (type) {
        case "comparison":
            newDatasetTemp = { ...datasetTemp, ...datasetOptions };
            newDatasetTemp.backgroundColor = newDatasetTemp.borderColor =
                "#f44242";
            newDatasetTemp.data = validData[0];
            newDatasetHum = { ...datasetHum, ...datasetOptions };
            newDatasetHum.backgroundColor = newDatasetHum.borderColor =
                "#6242f4";
            newDatasetHum.data = validData[1];
            newOptions = {
                ...newOptions,
                scales: {
                    xAxes: [...newOptions.scales.xAxes],
                    yAxes: [
                        {
                            ...newOptions.scales.yAxes[0],
                            display: true,
                        },
                        {
                            ...newOptions.scales.yAxes[1],
                            display: true,
                        },
                    ],
                },
            };
            return {
                labels,
                datasets: [newDatasetTemp, newDatasetHum],
                colorId: ["#f44242", "#6242f4"],
                options: newOptions,
            };
        case "temperature":
            const tempColor = randomColor(config.colorIds);
            newDatasetTemp = { ...datasetTemp, ...datasetOptions };
            newDatasetTemp.backgroundColor = newDatasetTemp.borderColor = tempColor;
            newDatasetTemp.data = validData[0];
            return {
                labels,
                datasets: [newDatasetTemp],
                colorId: [tempColor],
                options: newOptions,
            };
        case "humidity":
            const humColor = randomColor(config.colorIds);
            newDatasetHum = { ...datasetHum, ...datasetOptions };
            newDatasetHum.backgroundColor = newDatasetHum.borderColor = humColor;
            newDatasetHum.data = validData[0];
            return {
                labels,
                datasets: [newDatasetHum],
                colorId: [humColor],
                options: newOptions,
            };
        default:
            break;
    }
};
