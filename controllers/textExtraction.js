const { generatePrompt } = require('./generarPromptController');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const officeParser = require('officeparser'); 

/**
 * Extrae el texto de un archivo dependiendo de su tipo y lo almacena en una variable.
 * @param {Buffer} fileBuffer - El buffer del archivo del que se extraerá el texto.
 * @param {string} fileExtension - La extensión del archivo (pdf, docx, pptx).
 * @returns {Promise<string>} - Retorna una promesa que resuelve con el texto extraído.
 */
async function extractText(fileBuffer, fileExtension) {
    switch (fileExtension.toLowerCase()) {
        case 'pdf':
            return extractTextFromPDF(fileBuffer);
        case 'docx':
            return extractTextFromDocx(fileBuffer);
        case 'pptx':
            return extractTextFromPPTX(fileBuffer);
        default:
            throw new Error('Formato de archivo no soportado');
    }
}

// Función para extraer texto de PDF
async function extractTextFromPDF(fileBuffer) {
    const data = await pdfParse(fileBuffer);  // Usa el buffer directamente
    return data.text;  // Devuelve solo el texto extraído, sin formato ni caracteres especiales.
}

// Función para extraer texto de documentos Word .docx
async function extractTextFromDocx(fileBuffer) {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });  // Usa el buffer
    return data.value;
}

// Función para extraer texto de presentaciones .pptx
async function extractTextFromPPTX(fileBuffer) {
    return new Promise((resolve, reject) => {
        officeParser.parsePptx(fileBuffer, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const text = data.map(slide => slide.text).join('\n');
                resolve(text);
            }
        });
    });
}

// Ejemplo de uso con un buffer cargado desde un archivo
(async () => {
    try {
        const filePath = './uploads/1730994515979.pdf';  // Ruta del archivo PDF en el servidor
        const fileBuffer = fs.readFileSync(filePath);  // Lee el archivo como un buffer

        const fileExtension = 'pdf';  // La extensión del archivo, en este caso 'pdf'

        // Extraer el texto del archivo PDF
        const textoDeEntrada = await extractText(fileBuffer, fileExtension);

        // Aquí se llama a la función generatePrompt con textoDeEntrada y otros parámetros necesarios
        // const nroPreguntas = 5;  // Número de preguntas a generar
        // const nombreQuedu = 'Quedu de Ejemplo';  // Nombre para el quedu

        const prompt = generatePrompt(textoDeEntrada, nroPreguntas, nombreQuedu);
        console.log(prompt);  // Muestra el prompt generado
    } catch (error) {
        console.error('Error al extraer el texto:', error);  // Muestra el error si ocurre
    }
})();

module.exports = { extractText, extractTextFromPDF };
