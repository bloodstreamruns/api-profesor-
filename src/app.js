const express = require('express');
const morgan = require('morgan');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const db = require('./configuraciones/db'); // Importar la configuración de la base de datos

const rutas = require('./rutas/index');
const port = process.env.PORT || 3001;

const app = express();

app.use(morgan('common')); // Middleware para registrar solicitudes HTTP
// Middleware para analizar el cuerpo de las solicitudes entrantes en formato JSON
app.use(express.json());

// Importar las rutas desde el archivo rutas/index.js
app.use('/api', rutas); // Usar las rutas importadas con el prefijo '/api'

// Iniciar el servidor
app.listen(port, () => {
  console.log(`El servidor está corriendo en http://localhost:${port}`);
});