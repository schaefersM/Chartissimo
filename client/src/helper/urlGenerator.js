export default function urlGenerator(baseUrl, data) {

    if (!baseUrl || !data) {
        throw new Error("No parameter")
    }

    let urlString = baseUrl;

    data.forEach(({ type, values }) => {
        values.forEach((value) => {
            urlString += value ? `${type}=${value}&` : "";
        });
    });
    
    return urlString;
}
