const express = require('express');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(require('./routes/index'));

app.listen(3000);

console.log("Servidor en puerto 3000");