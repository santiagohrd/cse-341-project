// Importar el modulo express
const express = require('express');

const mongodb = require('./data/contacts');

// Se crea una instancia de una aplicación Express
// app representa el servidor y es el que se usará para configurar rutas
const app = express()

// Define el puerto en el que correrá el servidor
// El puerto 3000 es el puerto predeterminado para los servidores de desarrollo locales
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.log(err)
    }
    else {
        // inicia el servidor y lo pone a escuchar peticiones en el puerto especificado
        app.listen(port, () => (console.log(`Dabase is listening and node Running on port ${port}`)));
    }
});
