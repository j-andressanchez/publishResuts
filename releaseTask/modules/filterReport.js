const exclude = [
    "transaction",
    "sampleCount",
    "pct1ResTime",
    "pct2ResTime",
    "pct3ResTime"
]

module.exports = function filterJson(inputJson) {
    const filteredJson = {};

    for (const key in inputJson) {
        const originalObject = inputJson[key];
        const filteredObject = {};

        for (const prop in originalObject) {
            if (!exclude.includes(prop)) {
                filteredObject[prop] = originalObject[prop];
            }
        }

        filteredJson[key] = filteredObject;
    }

    return filteredJson;
};