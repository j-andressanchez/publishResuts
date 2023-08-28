const taskLib = require('azure-pipelines-task-lib/task');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async function attachFile(zipFilePath) {
    try {
        const orgUrl = process.env.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI;
        const token = process.env.SYSTEM_ACCESSTOKEN;
        const projectName = process.env.SYSTEM_TEAMPROJECT;
        const testCaseId = taskLib.getInput('TestCaseID', true);

        const fileName = path.basename(zipFilePath);
        const fileData = fs.readFileSync(zipFilePath);
        const attachmentApiUrl = `${orgUrl}/${projectName}/_apis/wit/attachments?fileName=${fileName}&api-version=7.1-preview.3`;

        // Subir el archivo adjunto a la API de Azure DevOps
        const attachmentResponse = await axios.post(attachmentApiUrl, fileData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/octet-stream'
            }
        });

        const attachmentUrl = attachmentResponse.data.url;

        const attachmentLink = {
            rel: 'AttachedFile',
            url: attachmentUrl,
            attributes: {
                comment: 'Se adjunta resultado de pruebas de performance realizada por pipeline.'
            }
        };

        const workItemUpdate = [
            {
                op: 'add',
                path: '/relations/-',
                value: attachmentLink
            }
        ];

        const updateApiUrl = `${orgUrl}/${projectName}/_apis/wit/workitems/${testCaseId}?api-version=7.1-preview.3`;

        await axios.patch(updateApiUrl, workItemUpdate, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json-patch+json'
            }
        });

        console.log('Work Item actualizado exitosamente con el archivo adjunto.');

    } catch (error) {
        console.error("Error al adjuntar el archivo:", error.message, error.stack);
    }
}