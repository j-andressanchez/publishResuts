# Extensión de Pipeline de Azure DevOps para Publicar Evidencia en un Work Item

![Extension Icon](images/128px.png)

## Precondiciones
- Configurar archivo config.json con la información de conexión a la Storage

## Descripción
Esta extensión de pipeline permite publicar archivos de evidencia en un Work Item de Azure DevOps después de que las pruebas se hayan ejecutado en una tarea anterior. La extensión toma los archivos generados durante la ejecución y los adjunta al Work Item correspondiente.

## Características
- Publicación automatizada de archivos de evidencia en un Work Item.
- Utiliza el Work Item ID para identificar el destino.
- Integración directa con el flujo de trabajo de Azure DevOps.
- Archivos de evidencia históricos para seguimiento y auditoría.

## Instalación y Configuración
1. Agrega una nueva tarea a tu pipeline después de la tarea de ejecución de pruebas.
2. Selecciona la tarea de la extensión desde el catálogo de tareas disponibles.
3. Configura los detalles de la tarea, incluyendo el Work Item ID y la ruta de los archivos de evidencia.
4. Asegúrate de configurar las credenciales de autenticación adecuadas para acceder a la API de Azure DevOps.

## Uso
1. Ejecuta tu pipeline, incluyendo las tareas de ejecución de pruebas y la extensión de publicación de evidencia.
2. La extensión tomará los archivos de evidencia generados por la tarea de pruebas.
3. Los archivos se adjuntarán automáticamente al Work Item especificado.

## Configuración Adicional
- Configura permisos adecuados para acceder y actualizar Work Items en el proyecto de Azure DevOps.
- Asegúrate de que los archivos de evidencia estén disponibles en la ruta especificada durante la ejecución del pipeline.

## Recursos Adicionales
- [Documentación de Tareas de Azure Pipelines](https://learn.microsoft.com/es-es/azure/devops/pipelines/tasks/task?view=azure-devops)
- [Documentación de la API de Azure DevOps](https://learn.microsoft.com/es-es/rest/api/azure/devops/?view=azure-devops-rest-7.1)

## License
This extension is released under the [ISC License](LICENSE).

---