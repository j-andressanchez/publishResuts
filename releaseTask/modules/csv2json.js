const fs = require('fs');
const csv = require('csv-parser');

module.exports = async function csv2Json(inCsv) {  
    return new Promise((resolve, reject) => {
        console.log("Iniciando conversión de JTL a JSON...");
        const jsonArray = [];

        fs.createReadStream(inCsv)
            .pipe(csv())
            .on('data', (row) => {
                let filteredRow = filterProperties(row);
                jsonArray.push(filteredRow);
            })
            .on('end', () => {
                resolve(jsonArray);
                console.log('Proceso de conversión JTL a JSON completado.');
            })
            .on('error', (error) => {
                reject(error);
                console.error('Error al procesar el archivo CSV:', error);
            });
    });
}

function filterProperties(row){

    //Valores que no se quieren guardar en la table
    let excludedProperties = [
        "elapsed",
        "success",
        "Connect",
        "responseMessage",
        "dataType",
        "grpThreads",
        "allThreads",
        "bytes",
        "sentBytes"
    ]

    let filteredRow = {};

    for (let key in row) {
        if(!excludedProperties.includes(key)){
            filteredRow[key] = row[key];
        }
    }

    return filteredRow;
}
