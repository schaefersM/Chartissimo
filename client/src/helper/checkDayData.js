/**
    Füllt den Datensatz mit leeren Werten, damit dieser richtig angezeigt wird:
        
        * input: 
        * [    
        *   {value: 5, hour: 2},
        *   {value: 9, hour: 3},
        *   {value: 10, hour: 5}
        * ]
        * output:    
        * [      
        *   {value: null, hour: 0}
        *   {value: null, hour: 1}
        *   {value: 5, hour: 2},
        *   {value: 9, hour: 3},
        *   {value: null, hour: 4}
        *   {value: 10, hour: 5}
        *   {value: null, hour: 6}
        *   ...
        * ]
    **/

export default function checkDayData (data) {
    const checkHours = Array.from(new Array(24), (_, hour) => ({
        hour,
        value: null,
    }));

    data = [...data, ...checkHours];

    const newData = data.filter((elem, index) => {
        return index === data.findIndex((obj) => obj.hour === elem.hour);
    });

    newData.sort((a, b) => a.hour - b.hour);

    const values = newData.map((item) => item.value);
    
    return values;
};
