const {Router} = require('express');
const controladorCarreras = require('../controladores/controladorCarreras');
const { body, query } = require('express-validator');
const router = Router();

// Ruta para obtener todas las carreras
router.get('/', controladorCarreras.listarCarreras);

// Ruta para obtener una carrera por su ID
router.get('/buscarid', 
    query('id').notEmpty().withMessage('El ID de la carrera es obligatorio')
    .isInt().withMessage('El ID de la carrera debe ser un número entero'),
    controladorCarreras.obtenerCarreraPorId);

// Ruta para crear una nueva carrera
router.post('/guardar',
  body('nombre').notEmpty().withMessage('El nombre de la carrera es obligatorio')
  .isLength({ min: 3, max: 100 }).withMessage('El nombre de la carrera debe tener entre 3 y 100 caracteres'),
  body('codigo').notEmpty().withMessage('El código de la carrera es obligatorio')
  .isLength({ min: 1, max: 10 }).withMessage('El código de la carrera debe tener entre 1 y 10 caracteres'),
  body('descripcion').optional().isLength({ min: 10, max: 255 }).withMessage('La descripción de la carrera debe ser una cadena de texto con un máximo de 255 caracteres'),
  body('estado').optional().isBoolean().withMessage('El estado de la carrera debe ser un valor booleano'),
  controladorCarreras.crearCarrera
);

// Ruta para actualizar una carrera existente
router.put('/actualizar',
  query('id').notEmpty().withMessage('El ID de la carrera es obligatorio')
  .isInt().withMessage('El ID de la carrera debe ser un número entero'),
  body('nombre').notEmpty().withMessage('El nombre de la carrera es obligatorio')
  .isLength({ min: 3, max: 100 }).withMessage('El nombre de la carrera debe tener entre 3 y 100 caracteres'),
  body('codigo').notEmpty().withMessage('El código de la carrera es obligatorio')
  .isLength({ min: 1, max: 10 }).withMessage('El código de la carrera debe tener entre 1 y 10 caracteres'),
    body('descripcion').optional().isLength({ min: 10, max: 255 }).withMessage('La descripción de la carrera debe ser una cadena de texto con un máximo de 255 caracteres'),
  body('estado').optional().isBoolean().withMessage('El estado de la carrera debe ser un valor booleano'),
  controladorCarreras.actualizarCarrera
);

// Ruta para eliminar una carrera por su ID
router.delete('/eliminar',
  query('id').notEmpty().withMessage('El ID de la carrera es obligatorio')
  .isInt().withMessage('El ID de la carrera debe ser un número entero'),
  controladorCarreras.eliminarCarrera
);

module.exports = router;