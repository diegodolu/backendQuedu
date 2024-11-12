const pptx2json = require('pptx2json');

const extractTextFromPptx = async (filePath) => {
    try {
        const pptxData = await pptx2json(filePath);
        const slides = pptxData.slides;
        let extractedText = '';
        
        slides.forEach(slide => {
            slide.shapes.forEach(shape => {
                if (shape.text) {
                    extractedText += shape.text + '\n';
                }
            });
        });

        return extractedText;
    } catch (error) {
        console.error('Error al procesar el archivo PPTX:', error);
        throw error;
    }
};

// Exporta la función para poder usarla en otros archivos
module.exports = {
    extractTextFromPptx
};
