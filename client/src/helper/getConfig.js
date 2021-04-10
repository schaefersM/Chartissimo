import {
	compConfig,
	tempConfig,
	humConfig,
} from "../components/Browse/chartConfigs";

export default function getConfig(type) {
	switch (type) {
		case "comparison":
			return compConfig;
		case "temperature":
			return tempConfig;
		case "humidity":
			return humConfig;
		default:
			break;
	}
}
