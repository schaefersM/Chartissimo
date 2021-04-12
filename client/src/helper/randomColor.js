export default function randomColor(colorIds) {
	const graphColor = Math.floor(0x1000000 * Math.random()).toString(16);
	if (!colorIds.includes(graphColor))
		return `#${`000000${graphColor}`.slice(-6)}`;
	else {
		randomColor(colorIds);
	}
}
