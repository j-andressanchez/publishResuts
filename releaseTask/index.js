const taskLib = require('azure-pipelines-task-lib/task');
const path = require('path');
const fs = require('fs');

const archiveFiles = require('./modules/archiveFiles');
const attachFile = require('./modules/attachFile');
const csv2json = require('./modules/csv2json');
const dataLoader = require('./modules/dataLoader');
const filterReport = require('./modules/filterReport');

async function main() {

    try{
        const resultsPath = path.join(process.env.SYSTEM_ARTIFACTSDIRECTORY, 'testResults');
        const csvPath = path.join(resultsPath, 'report.jtl');
        const aggregatePath = path.join(resultsPath, 'Html', 'statistics.json');
        const reportData = fs.readFileSync(aggregatePath);
        const aggregateReport = JSON.parse(reportData);

        console.log('\n =====   Archive Files Task   ===== \n');
        const zipFilePath = await archiveFiles(resultsPath);

        console.log('\n =====   Attach Evidence Task   ===== \n');
        await attachFile(zipFilePath);

        console.log('\n =====   Load Data Task   ===== \n');
        const csvData = await csv2json(csvPath);
        const filteredReport = filterReport(aggregateReport);
        await dataLoader(csvData, filteredReport);

        // Fin de la tarea exitosa
        taskLib.setResult(taskLib.TaskResult.Succeeded, 'Publicación en TestCase finalizada exitosamente.');

    } catch (error) {
        console.error('Error en el procesamiento de la tarea:', error);
        taskLib.setResult(taskLib.TaskResult.Failed, error.message);
    }
}

main();