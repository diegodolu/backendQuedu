const fs = require('fs');
const pdfParse = require('pdf-parse');
const { generatePrompt } = require('./generarPromptController');

// Función para extraer texto de PDF
async function extractTextFromPDF(fileBuffer) {
    const data = await pdfParse(fileBuffer);
    return data.text;
}

async function extractText(fileBuffer, fileExtension) {
    switch (fileExtension.toLowerCase()) {
        case 'pdf':
            return extractTextFromPDF(fileBuffer);
        default:
            throw new Error('Formato de archivo no soportado');
    }
}

//// Ejemplo de uso con un buffer cargado desde un archivo
//(async () => {
//    try {
//        const filePath = `./uploads/${nombre}`;  // Ruta del archivo PDF en el servidor
//        const fileBuffer = fs.readFileSync(filePath);  // Lee el archivo como un buffer
//
//        const fileExtension = 'pdf';  // La extensión del archivo, en este caso 'pdf'
//
//        // Extraer el texto del archivo PDF
//        const textoDeEntrada = await extractText(fileBuffer, fileExtension);
//
//        // Aquí se llama a la función generatePrompt con textoDeEntrada y otros parámetros necesarios
//        // const nroPreguntas = 5;  // Número de preguntas a generar
//        // const nombreQuedu = 'Quedu de Ejemplo';  // Nombre para el quedu
//
//        const prompt = generatePrompt(textoDeEntrada, nroPreguntas, nombreQuedu);
//        console.log(prompt);  // Muestra el prompt generado
//    } catch (error) {
//        console.error('Error al extraer el texto:', error);  // Muestra el error si ocurre
//    }
//})();

module.exports = { extractText, extractTextFromPDF };
