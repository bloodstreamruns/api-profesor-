const { validationResult } = require('express-validator');
const Estudiante = require('../modelos/estudiante');
const Carrera = require('../modelos/carrera');

// Controlador para listar todos los estudiantes
const listarEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({ include: Carrera });
    res.json(estudiantes);
  } catch (error) {
    console.error('Error al listar los estudiantes:', error);
    res.status(500).json({ error: 'Error al listar los estudiantes' });
  }
};

// Controlador para obtener un estudiante por su ID
const obtenerEstudiantePorId = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  try {
    const estudiante = await Estudiante.findByPk(id, { include: Carrera });
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(estudiante);
  } catch (error) {
    console.error('Error al obtener el estudiante por ID:', error);
    res.status(500).json({ error: 'Error al obtener el estudiante por ID' });
  }
};

// Controlador para crear un nuevo estudiante
const crearEstudiante = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { identidad, cuenta, primerNombre, segundoNombre= null, primerApellido, segundoApellido = null, correoElectronico, estado = true, carreraId } = req.body;
  try {
    const nuevoEstudiante = await Estudiante.create({ identidad, cuenta, primerNombre, segundoNombre, primerApellido, segundoApellido, correoElectronico, estado, carreraId });
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    console.error('Error al crear el estudiante:', error);
    res.status(500).json({ error: 'Error al crear el estudiante' });
  }
};

// Controlador para actualizar un estudiante existente
const actualizarEstudiante = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  const { identidad, cuenta, primerNombre, segundoNombre= null, primerApellido, segundoApellido = null, correoElectronico, estado, carreraId } = req.body;

  try {
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    await estudiante.update({ identidad, cuenta, primerNombre, segundoNombre, primerApellido, segundoApellido, correoElectronico, estado, carreraId });
    res.json(estudiante);
  } catch (error) {
    console.error('Error al actualizar el estudiante:', error);
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
};

// Controlador para eliminar un estudiante
const eliminarEstudiante = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;
  try {
    const estudiante = await Estudiante.findByPk(id);
    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    await estudiante.destroy();
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error);
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
};

module.exports = {
  listarEstudiantes,
  obtenerEstudiantePorId,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
};