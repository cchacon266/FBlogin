const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // Convertimos la cadena a booleano
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

function sendMail(options) {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            from: 'FB Notification <noreply@htk-id.com>',
            to: options.to,
            subject: options.subject,
            text: options.text
        }, (error, info) => {
            if (error) {
                console.error('Error al enviar correo:', error);
                reject(error);
            } else {
                console.log('Correo enviado:', info.response);
                resolve(info);
            }
        });
    });
}

module.exports = { sendMail };
