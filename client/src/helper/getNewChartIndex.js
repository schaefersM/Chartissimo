/**
 * Diese Funktion wird nur benutzt, falls ich jemals wieder versuche das Feature zu implementieren,
 * mit dem man Diagramme zwischen den vorhandenen Diagrammen einfügen kann.
 *
 * Prüft, ob das neue Diagramm vor oder nach dem bisherigen Diagramm eingefügt werden soll.
 */

export default function getNewChartIndex(position, chartIndex) {
	if (!position && chartIndex - 1) {
		return 0;
	} else if (position === "before" && chartIndex < 1) {
		return 0;
	} else if (position === "after") {
		return chartIndex + 1;
	} else if (position === "before") {
		return chartIndex;
	}
}
