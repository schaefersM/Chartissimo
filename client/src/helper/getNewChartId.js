/**
 * Diese Funktion wird nur benutzt, falls ich jemals wieder versuche das Feature zu implementieren,
 * mit dem man Diagramme zwischen den vorhandenen Diagrammen einfügen kann.
 * 
 * Prüft, ob das neue Diagramm vor oder nach dem bisherigen Diagramm eingefügt werden soll.
*/

export default function getNewChartId (position, chartId) {

    //calculates the new chartId when a Chart is added
    if (!position && chartId - 1) {
        return 0;
    } else if (position === "before" && chartId < 1) {
        return 0;
    } else if (position === "after") {
        return chartId + 1;
    } else if (position === "before") {
        return chartId;
    }
};
