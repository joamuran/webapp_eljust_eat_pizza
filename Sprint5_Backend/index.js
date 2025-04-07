// Ús de llibreries
import express from 'express';          // Llibreria per muntar un servidor web
import cors from 'cors';                // Llibreria per acceptar peticions de múltiples origens
import fs from 'fs';                    // Per llegir fitxers
import path from 'path';                // Per accedir al path
import { fileURLToPath } from 'url';    // Per obtenir el __dirname

import { exec } from 'child_process';   // Per tal d'executar processos fills

// Obtenir el directori actual del mòdul
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import bodyParser from 'body-parser';       // Per parsejar les peticions POST
const { urlencoded, json } = bodyParser;

// Definim app com a aplicació express, amb el mètode de factoria express() (Patró de disseny Factory)
const app = express();

// Configuració de l'aplicació per descodificar peticions del client i les passe a JSON
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors()); // Activem CORS

// L'app escolta pel port 8000
let defaultPort = 8000;
app.listen(defaultPort, () => {
    console.log('Escoltant pel port ' + defaultPort);
});


app.post('/print', (req, res) => {
    const { data } = req.body;  // Extraiem les dades del cos de la petició

    // Generem els noms de fitxers únics, fent ús del timestamp
    const timestamp = Date.now();
    const xmlPath = path.join(__dirname, `temp_${timestamp}.xml`);  // Fitxer XML que generarem
    const pdfPath = path.join(__dirname, `temp_${timestamp}.pdf`);  // Fitxer PDF
    const xslPath = path.join(__dirname, 'ticket.xsl');             // Plantilla XSLT-FO


    // Creem un string XML amb la informació del tiquet
    let xmlString = `<comanda num="${data.num}" hora="${data.hora}" preu="${data.preu}">`;
    data.items.forEach(({ nom, quantitat, preu }) => { // Desestructuració de l'item
        xmlString += `<item nom="${nom}" quantitat="${quantitat}" preu="${preu}"/>`;
    });
    xmlString += '</comanda>';


    // Escrivim l'XML al disc
    fs.writeFileSync(xmlPath, xmlString, 'utf8');


    // Creem la cadena amb l'ordre a executar
    const cmd = `fop -xml ${xmlPath} -xsl ${xslPath} -pdf ${pdfPath}`;

    // Fem ús de l'ordre exec de child-process per llançar l'ordre
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error('Error amb FOP:', stderr);
            return res.status(500).send('Error generant el PDF');
        }

        // Llegim el PDF i l'enviem al client
        fs.readFile(pdfPath, (err, pdfBuffer) => {
            if (err) {
                console.error('Error llegint el PDF:', err);
                return res.status(500).send('Error llegint el PDF');
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="tiquet_${data.num}.pdf"`);
            res.status(200).send(pdfBuffer);

            // Eliminar fitxers temporals després
            fs.unlinkSync(xmlPath);
            fs.unlinkSync(pdfPath);
        });
    });

});







// Ruta predeterminada, per atendre qualsevol altra petició
// retornant un missatge amb status 400 (Bad Request)
app.all('*name', (req, res) => {
    res.status(400).send("Petició mal formada");
});


