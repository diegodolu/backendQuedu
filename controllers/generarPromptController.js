function escapeSpecialCharacters(text) {
    return text
        .replace(/\\/g, '\\\\')     
        .replace(/"/g, '\\"')          
        .replace(/\*/g, '\\*')         
        .replace(/\n/g, '\\n');       
}

function generatePrompt(textoDeEntrada, nroPreguntas, nombreQuedu, fechaCreacion) {
    const textoEscapado = escapeSpecialCharacters(textoDeEntrada);

    const prompt = `A partir del siguiente contenido, genera un test de ${nroPreguntas} preguntas. Cada pregunta debe tener 4 alternativas, de las cuales solo una debe ser correcta. Además, proporciona una retroalimentación por cada pregunta para cuando el usuario responda bien o mal, no indiques si es correcto o no. El formato del test debe ser el siguiente JSON:

    {
     "name": "",
     "successPercentaje": 0,
     "attempt": 0,
     "createdAt": "${fechaCreacion}",
     "solved": false,
     "questions": [
       {
         "question": "Texto de la pregunta",
         "feedback": "Retroalimentación para la pregunta",
         "answers": [
           {
             "answer": "Texto de la respuesta 1",
             "correct": false
           },
           {
             "answer": "Texto de la respuesta 2",
             "correct": false
           },
           {
             "answer": "Texto de la respuesta 3",
             "correct": true
           },
           {
             "answer": "Texto de la respuesta 4",
             "correct": false
           }
         ]
       }
     ]
    }

    Usa la información de este documento:

    ${textoEscapado}

    Por favor, devuelve directamente el JSON solicitado sin ninguna introducción o conclusión. Asigna el valor de "name" con esto: "${nombreQuedu}".`;

    console.log(prompt);
    return prompt;
}

module.exports = { generatePrompt };
