/**
    Füllt den Datensatz mit leeren Werten, damit dieser richtig angezeigt wird:
        
        * input: 
        * [    
        *   {value: 5, minute: 2},
        *   {value: 9, minute: 3},
        *   {value: 10, minute: 5}
        * ]
        * 
        * output:    
        * [      
        *   {value: null, minute: 0},
        *   {value: null, minute: 1},
        *   {value: 5, minute: 2},
        *   {value: 9, minute: 3},
        *   {value: null, minute: 4},
        *   {value: 10, minute: 5},
        *   {value: null, minute: 6},
        *   ...
        * ]
    **/

export default function checkHourData(data) {
	const checkHours = Array.from(new Array(60), (_, minute) => ({
		minute,
		value: null,
	}));

	data = [...data, ...checkHours];

	const newData = data.filter((elem, index) => {
		return index === data.findIndex((obj) => obj.minute === elem.minute);
	});

	newData.sort((a, b) => a.minute - b.minute);

	const values = newData.map((item) => item.value);

	return values;
}
