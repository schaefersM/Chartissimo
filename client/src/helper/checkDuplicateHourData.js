/**
 * Überprüft, ob es sich um tägliche oder stündliche Daten handelt und
 *
 * Überprüft, ob in diesem Diagramm Graphen gezeichnet wurden (checkHourList), die nicht aus der selben Stunde wie checkHour stammen.
 * Wenn ja, dann werden werden die labels (X-Achse) so :00 und nicht so xx:00 dargestellt, damit die Graphen sinnvoll zugeordnet werden können.
 *
 * Beispiel 1:
 *
 * checkHour = "25";
 *
 * HINWEIS: Wenn checkHour = "25", dann liegt ein täglicher Datensatz vor und
 * und die vorherigen Datensätze MÜSSEN ebenfalls tägliche Datensätze sein.
 *
 * checkHourList = ["25", "25", "25"]
 *
 * labels = ["00:00", "01:00", "02:00" ...]
 *
 * Beispiel 2:
 *
 * checkHour = "15";
 *
 * checkHourList = ["13","15","16"]
 *
 * labels = [":00",":01",":02" ...]
 *
 *
 * Beispiel 3:
 *
 * checkHour = "15";
 *
 * checkHourList = ["15","15","15"]
 *
 * labels = ["15:00","15:01","15:02" ...]
 */

export default function checkDuplicateHourData(checkHour, checkHourList) {
	let labels;

	if (checkHour !== "25") {
		//checks for duplicate Hours
		if (
			checkHourList.filter((x) => x === checkHour).length <
			checkHourList.length
		) {
			labels = Array.from(new Array(60), (_, minute) =>
				minute < 10 ? `:0${minute}` : `:${minute}`
			);
		} else {
			labels = Array.from(new Array(60), (_, minute) =>
				minute < 10
					? `${checkHour}:0${minute}`
					: `${checkHour}:${minute}`
			);
		}
	} else {
		labels = Array.from(new Array(24), (_, hour) =>
			hour < 10 ? `0${hour}:00` : `${hour}:00`
		);
	}

	return labels;
}
