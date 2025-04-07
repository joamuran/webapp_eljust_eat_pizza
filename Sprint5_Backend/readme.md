# Servei d'impressió de tiquets

Aquesta aplicació es correspon a la part del backend per a la impressió de tiquets (generació de PDFs) per a l'Sprint 5 en l'app de la pizzeria.

Abans d'abordar la funcionalitat concreta, cal dir que es tracta d'una aplicació amb NodeJS i el framework Express, que ens permet generar un servidor web amb nodeJS. Aquests continguts els veurem al mòdul de PSP de 2on curs. Podeu ampliar informació [als apunts sobre aquesta unitat](https://joamuran.net/curs24_25/psp/u5_express/).

Sense aprofundir en massa detalls, veiem l'esquema general del codi principal:

```js
// Ús de llibreries
import express from 'express';          // Llibreria per muntar un servidor web
...

// Definim app com a aplicació express, amb el mètode de factoria express() (Patró de disseny Factory)
const app = express();

// L'app escolta pel port 8000
let defaultPort = 8000;
app.listen(defaultPort, () => {
    console.log('Escoltant pel port ' + defaultPort);
});


app.post('/print', (req, res) => {
    // Codi per atendre la petició
    // ...
    });

});

// Ruta predeterminada, per atendre qualsevol altra petició
// retornant un missatge amb status 400 (Bad Request)
app.all('*name', (req, res) => {
    res.status(400).send("Petició mal formada");
});
```

Com veiem, hem definit `app` com una aplicació Express, i la configurem per a que escolte peticions pel port 8000.

A més, definim diferents *middlewares* o funcions que es llancen quan es reben peticions. En aquest cas, tenim configurats dos middlewares:

* `app.post('/print', (req, res) => {...})`: És a dir, una funció que dóna resposta a peticions de tipus POST en la ruta `/print`. Aquesta ruta s'especifica com a primer argument, mentre que el segon argument és el *middleware* pròpiament dit. Com veiem, és ua funció que rep dos argument: `req` amb la informació de la petició (*request*) i `res`, un objecte que modela la resposta (`response`)-
* `app.all('*name', (req, res) => {...})`: Aquesta ruta es configura per a tots els tipus de petició, i respon a qualsevol patró de ruta (*). Es posa la última, ja que els middlewares es comproven seqüencialment. Si cap middleware emet una resposta, es llança aquest, tornant un error 400 com a resposta.

## El middleware POST /print

Aquesta funció és l'encarregada de processar la petició POST, agafar la informació rebuda, processar-la, i generar el document PDF per enviar-lo al client.

Velem-ho per pasos.

En **primer lloc** generem els noms per als diferents fitxers que anem a utilitzar, assegurant-nos que siga un nom únic, per evitar sobreescriptures en accessos múltiples:

```js
// Generem els noms de fitxers únics, fent ús del timestamp
const timestamp = Date.now();
const xmlPath = path.join(__dirname, `temp_${timestamp}.xml`);  // Fitxer XML que generarem
const pdfPath = path.join(__dirname, `temp_${timestamp}.pdf`);  // Fitxer PDF
const xslPath = path.join(__dirname, 'ticket.xsl');             // Plantilla XSLT-FO
```

En **segon lloc**, generem l'String amb l'XML de la comanda, a partir de les dades (`data`) rebudes en el *body* de la petició (`req.body`), i l'escrivim de manera síncrona al disc amb el mètode `writeFileSync` de la llibreria `fs`.

```js
    // Creem un string XML amb la informació del tiquet
    let xmlString = `<comanda num="${data.num}" hora="${data.hora}" preu="${data.preu}">`;
    data.items.forEach(({ nom, quantitat, preu }) => { // Desestructuració de l'item
        xmlString += `<item nom="${nom}" quantitat="${quantitat}" preu="${preu}"/>`;
    });
    xmlString += '</comanda>';


    // Escrivim l'XML al disc
    fs.writeFileSync(xmlPath, xmlString, 'utf8');
```

En tercer lloc, llancem un nou procés fill, amb el mètode `exec` de la llibreria `child_process`. L'ordre a llançar serà:

```js
// Creem la cadena amb l'ordre a executar
const cmd = `fop -xml ${xmlPath} -xsl ${xslPath} -pdf ${pdfPath}`;
```

Com veieu, és la mateixa que llançariem des de la línia d'ordres. La fuinció `exec` té la següent estructura:

```js
    exec(cmd, (error, stdout, stderr) => {
        ...
    });
```

Com veiem, li proporcionem com a primer argument l'ordre que anem a llançar (paràmetre `cmd`), i com a segon argument, una funció de callback, que s'executarà una vegada s'ha executat l'ordre. Aquesta ens retorna el codi d'error si s'ha produit algun, l'eixida estàndard (`stdout`) i l'eixida d'error (`stderr`).

Dins d'aquest afunció, comprovarem si no hi ha errors, i llegirem el fitxer escrit. Si el fitxer generat és correcte, l'enviem a través de la resposta:

```js
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
```

Aquest servidor conté ja el document `ticket.xsl`, que serà la plantilla XSLT per transformar els documents a XSL-FO.

## Execució

En primer lloc, haurem d'instal·lar les llibreries necessàries amb el gestor de paquets de node npm:

```
npm install
```

I una vegada instal·lats, llancem el servidor amb:

```
npm start
```