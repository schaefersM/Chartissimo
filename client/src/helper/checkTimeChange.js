/***
 * Wenn die angefragte Zeiteinheit, z.B. tägliche Daten,
 * sich von der bisherigen Zeiteinheit, z.B. stündliche Daten, unterscheidet,
 * dann wird der Benutzer gefragt, ob er das bisherige Diagramm überschreiben möchte.
 */

export default function checkTimeChange (checkHour, fetchHour) {

    let confirm;
    if (checkHour !== "" && fetchHour !== "25" && checkHour === "25") {
        confirm = window.confirm("Change between daily and hourly datasets ");
        return {
            fetch: confirm,
            reset: confirm,
        };
    } else if (checkHour !== "" && fetchHour === "25" && checkHour !== "25") {
        confirm = window.confirm("Change between hourly and daily datasets ");
        return { fetch: confirm, reset: confirm };
    } else {
        return {
            fetch: true,
            reset: false,
        };
    }
};
