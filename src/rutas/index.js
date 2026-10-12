const {Router} = require('express');
const router = Router();
router.use('/alumnos', require('./alumnos/rutasAlumnos')); // Importar las rutas de alumnos
router.use('/carreras', require('./rutasCarreras')); // Importar las rutas de carreras
module.exports = router;