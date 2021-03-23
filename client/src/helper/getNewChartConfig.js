export default function getNewChartConfig (checkedData, config, chartData) {
    
    const { 
        datasets, 
        labels, 
        options 
    } = checkedData;

    const { 
        data: { 
            colorIds, 
            customTableNames, 
            graphs, 
            hours, 
            previousHour, 
            tableNames, 
        },
        hosts, 
        name, 
    } = chartData

    const newConfig = {
        ...config,
        colorIds,
        customTableNames,
        data: { labels, datasets },
        graphs,
        hours,
        hosts,
        isSaved: true,
        options,
        previousHour,
        savingChartName: name,
        tableNames,
    };

    return newConfig;
};

