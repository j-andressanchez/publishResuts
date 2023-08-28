const { execSync } = require('child_process');
const {format} = require('date-fns-tz');
const path = require('path');
const fs = require('fs')

function getDate() {
    const now = new Date();
    const timeZone = 'America/Bogota';
    const formattedTime = format(now, 'ddMMyyyy', { timeZone });
    return formattedTime;
}

module.exports = async function archiveFiles(resultsPath) {
    
    try {
        const zipName = `testPerformance_${getDate()}.zip`;
        const zipFilePath = path.join(resultsPath, zipName);

        // Ejecuta el comando zip para crear el archivo ZIP
        execSync(`zip -r "${zipFilePath}" "${path.basename(resultsPath)}"`);

        if (fs.existsSync(zipFilePath)) {
            const stats = fs.statSync(zipFilePath);
            const fileSizeInBytes = stats.size;
            const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convertir bytes a megabytes
            console.log('Archivo ZIP creado exitosamente.');
            console.log(`Archivo ${zipName} creado con tamaño: ${fileSizeInMB.toFixed(2)} MB`);
        } else {
            console.log('Error: El archivo ZIP no se ha creado.');
        }

        return zipFilePath;

    } catch (error) {
        console.error('Error al crear el archivo ZIP:', error.message);
    }
}