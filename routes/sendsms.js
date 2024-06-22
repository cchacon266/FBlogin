const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

router.post('/sendsms', async (req, res) => {
    const { to, body } = req.body;

    console.log(req.body); // Debug: Verificar los datos recibidos

    if (!to || !body) {
        return res.status(400).send('The "to" and "body" fields are required.');
    }

    try {
        const message = await client.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });

        res.status(200).send(`Message sent: ${message.sid}`);
    } catch (error) {
        res.status(500).send(`Error sending message: ${error.message}`);
    }
});

module.exports = router;
