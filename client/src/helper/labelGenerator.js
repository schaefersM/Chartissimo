import { checkDuplicateHourData } from "./";
export default function labelGenerator(timeUnit, hour, reset, hourList = []) {
	let labels;

	if (timeUnit === "hour") {
		labels = Array.from(new Array(24), (_, hour) =>
			hour < 10 ? `0${hour}:00` : `${hour}:00`
		);
	} else if (timeUnit === "minute") {
		if (reset) {
			labels = Array.from(new Array(60), (_, minute) =>
				minute < 10 ? `${hour}:0${minute}` : `${hour}:${minute}`
			);
		} else {
			labels = checkDuplicateHourData(hour, hourList);
		}
	} else {
		console.log("invalid Data");
	}

	return labels;
}
