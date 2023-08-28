const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

const config = require('../config.json');

module.exports =  async function dataLoader(csvData, aggregateJson) {

    const credential = new AzureNamedKeyCredential(config.accountName, config.accountKey);
    const tableClient = new TableClient(`https://${config.accountName}.table.core.windows.net`, config.tableName, credential);

    //Valores que se desean cambiar específicamente el nombre
    let propertyMap = {
        timeStamp: "Timestamp"
    }

    for(let csvRow in csvData){
        const csvLabel = csvRow.label;
        console.log(`Procesando fila para la etiqueta: ${csvLabel}`);

        if(aggregateJson[csvLabel]){
            const newRecord = {
                PartitionKey: process.env.SYSTEM_TEAMPROJECT
            };

            for(let key in csvRow){
                let newKey = propertyMap || capitalizeFirstLetter(key);
                newRecord[newKey] = csvRow[key];
            }

            for(let key in aggregateJson[csvLabel]){
                let newKey = capitalizeFirstLetter(key);
                newRecord[newKey] = aggregateJson[csvLabel][key];
            }

            await tableClient.createEntity(newRecord);
            console.log(`Registro insertado para la etiqueta: ${csvLabel}`);
        }
    }
    console.log("Carga de datos en la storage completada.");
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}